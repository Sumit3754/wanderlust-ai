import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            This is a lightweight policy page you can expand later for your startup pitch.
          </p>

          <GlassCard>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>We aim to collect the minimum data required to operate the app.</p>
              <p>We do not sell personal data. If analytics are used, they should be privacy-respecting.</p>
              <p>For questions or deletion requests, contact the team.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
