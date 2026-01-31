export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn(
      "[api/generate-itinerary] Missing process.env.ANTHROPIC_API_KEY. Set it in Vercel Project Settings → Environment Variables, or in .env.local for local dev."
    );
    return res.status(500).json({
      error: "Server misconfigured: missing ANTHROPIC_API_KEY",
      hint: "Set ANTHROPIC_API_KEY",
    });
  }

  const extractJson = (text: string) => {
    const trimmed = (text || "").trim();

    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (fenced?.[1]) return fenced[1].trim();

    const firstObj = trimmed.match(/\{[\s\S]*\}/);
    if (firstObj?.[0]) return firstObj[0].trim();

    return trimmed;
  };

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const destination = body?.destination;
    const startDate = body?.startDate;
    const endDate = body?.endDate;
    const budget = body?.budget;
    const interests = body?.interests;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        error: "Missing required fields: destination, startDate, endDate",
      });
    }

    const prompt = [
      "You are a helpful travel planner.",
      "Create a concise, practical itinerary in JSON format.",
      "Return ONLY valid JSON (no markdown).",
      "Schema:",
      "{\"destination\":string,\"dates\":string,\"days\":[{\"day\":number,\"title\":string,\"activities\":[{\"time\":string,\"title\":string,\"duration\":string,\"type\":string}]}],\"budgetTips\":[string]}"
    ].join("\n");

    const userInput = {
      destination,
      startDate,
      endDate,
      budget,
      interests,
    };

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1200,
        temperature: 0.4,
        system: prompt,
        messages: [{ role: "user", content: JSON.stringify(userInput) }],
      }),
    });

    if (!anthropicRes.ok) {
      const retryAfter = anthropicRes.headers.get("retry-after");
      if (retryAfter) res.setHeader("Retry-After", retryAfter);

      const raw = await anthropicRes.text();
      let providerMessage: string | undefined;
      let providerType: string | undefined;
      let providerCode: string | undefined;

      try {
        const parsed = JSON.parse(raw);
        providerMessage = parsed?.error?.message;
        providerType = parsed?.error?.type;
        providerCode = parsed?.error?.code;
      } catch {
        // ignore JSON parse errors
      }

      console.error(
        "[api/generate-itinerary] Anthropic error:",
        anthropicRes.status,
        providerMessage || raw
      );

      return res.status(anthropicRes.status).json({
        error: "AI provider request failed",
        status: anthropicRes.status,
        message: providerMessage,
        type: providerType,
        code: providerCode,
      });
    }

    const data = await anthropicRes.json();
    const contentText = Array.isArray(data?.content)
      ? data.content
          .filter((c: any) => c?.type === "text")
          .map((c: any) => c?.text)
          .filter(Boolean)
          .join("\n")
      : undefined;

    if (!contentText) {
      console.error("[api/generate-itinerary] No content in Anthropic response", data);
      return res.status(502).json({ error: "AI provider returned an empty response" });
    }

    let itinerary;
    try {
      const jsonText = extractJson(contentText);
      itinerary = JSON.parse(jsonText);
    } catch (e) {
      console.error("[api/generate-itinerary] Failed to parse JSON from model", contentText);
      return res.status(502).json({
        error: "AI provider returned invalid JSON",
      });
    }

    return res.status(200).json({ itinerary });
  } catch (err) {
    console.error("[api/generate-itinerary] Unexpected error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
