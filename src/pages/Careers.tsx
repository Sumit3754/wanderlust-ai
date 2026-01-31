import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const Careers = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Careers</h1>
          <p className="text-muted-foreground mb-8">
            Help us build the next generation of travel planning.
          </p>

          <GlassCard>
            <h2 className="font-display font-semibold text-lg mb-2">Open roles</h2>
            <p className="text-sm text-muted-foreground">
              No roles listed yet. If you’re interested, reach out with your portfolio and what you’d like to build.
            </p>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
