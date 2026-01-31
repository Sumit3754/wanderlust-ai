import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';
import { Link } from 'react-router-dom';

const Legal = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Legal</h1>
          <p className="text-muted-foreground mb-8">
            Important policies for using Wanderly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Privacy Policy</h2>
              <p className="text-sm text-muted-foreground mb-3">How we handle data and privacy.</p>
              <Link to="/privacy" className="text-sm text-primary hover:underline">Read Privacy</Link>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-2">Terms of Service</h2>
              <p className="text-sm text-muted-foreground mb-3">Rules and guidelines for using the product.</p>
              <Link to="/terms" className="text-sm text-primary hover:underline">Read Terms</Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
