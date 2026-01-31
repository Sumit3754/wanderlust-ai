export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.OPENAI_KEY || process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    console.warn(
      "[api/generate-itinerary] Missing API key. Set OPENAI_KEY (recommended, server-only) or VITE_OPENAI_API_KEY (fallback) in your environment. For Vercel: Project Settings → Environment Variables. For local dev: .env.local"
    );
    return res.status(500).json({
      error: "Server misconfigured: missing API key",
      hint: "Set OPENAI_KEY (recommended) or VITE_OPENAI_API_KEY",
    });
  }

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

    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(userInput) },
        ],
      }),
    });

    if (!openAiRes.ok) {
      const text = await openAiRes.text();
      console.error("[api/generate-itinerary] OpenAI error:", openAiRes.status, text);
      return res.status(502).json({
        error: "AI provider request failed",
        status: openAiRes.status,
      });
    }

    const data = await openAiRes.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error("[api/generate-itinerary] No content in OpenAI response", data);
      return res.status(502).json({ error: "AI provider returned an empty response" });
    }

    let itinerary;
    try {
      itinerary = JSON.parse(content);
    } catch (e) {
      console.error("[api/generate-itinerary] Failed to parse JSON from model", content);
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
