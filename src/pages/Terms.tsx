import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            This is a lightweight terms page you can expand later for your startup pitch.
          </p>

          <GlassCard>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>Use the app responsibly and comply with applicable laws.</p>
              <p>Itineraries are suggestions and may not be accurate or up to date.</p>
              <p>We may update features and policies over time.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
