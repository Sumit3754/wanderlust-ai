import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const Company = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Company</h1>
          <p className="text-muted-foreground mb-8">
            Wanderly is building modern travel planning tools that help people turn ideas into actionable itineraries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Mission</h2>
              <p className="text-sm text-muted-foreground">
                Make trip planning effortless with beautiful, structured itineraries and smart recommendations.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Vision</h2>
              <p className="text-sm text-muted-foreground">
                Become the default place where trips are planned, shared, and booked end-to-end.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">What we build</h2>
              <p className="text-sm text-muted-foreground">
                A planner, itinerary viewer, and travel dashboard designed for fast decision-making.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Values</h2>
              <p className="text-sm text-muted-foreground">
                Clarity, speed, craftsmanship, and privacy-first engineering.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Contact</h2>
              <p className="text-sm text-muted-foreground">
                For partnerships and demos, reach out via your preferred contact channel.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
