import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const About = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/background_about.MP4"
          controls
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">About</h1>
            <p className="text-muted-foreground mb-8">
              Wanderly helps you plan trips faster with structured itineraries and a clean, modern experience.
            </p>

          <div className="space-y-6">
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Vision</h2>
              <p className="text-sm text-muted-foreground">
                A world where anyone can plan a trip confidently in minutes and share it instantly.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Mission</h2>
              <p className="text-sm text-muted-foreground">
                Turn travel intent into a practical, personalized day-by-day itinerary with minimal effort.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Why Wanderly</h2>
              <p className="text-sm text-muted-foreground">
                Planning should feel exciting, not overwhelming. We focus on clarity and practical day-by-day structure.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Who it’s for</h2>
              <p className="text-sm text-muted-foreground">
                Solo travelers, couples, friends, and anyone who wants a simple plan they can actually follow.
              </p>
            </GlassCard>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
