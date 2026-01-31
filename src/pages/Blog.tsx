import Layout from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Blog</h1>
          <p className="text-muted-foreground mb-8">
            Updates, product notes, and travel ideas.
          </p>

          <div className="space-y-5">
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-1">Launching Wanderly</h2>
              <p className="text-sm text-muted-foreground">
                A quick look at what we’re building and where we’re heading next.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-1">How to plan a 3-day city trip</h2>
              <p className="text-sm text-muted-foreground">
                A simple structure you can reuse for any destination.
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display font-semibold text-lg mb-1">Packing checklist essentials</h2>
              <p className="text-sm text-muted-foreground">
                Keep it lightweight and avoid last-minute stress.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
