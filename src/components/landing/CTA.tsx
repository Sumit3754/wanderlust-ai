import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden glass-card p-12 md:p-16 text-center"
        >
          {/* Background Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Start Free Today</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to Plan Your
              <br />
              <span className="gradient-text">Next Adventure?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of travelers who've discovered the smarter way to plan their trips. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="btn-primary text-lg px-8 py-6 group">
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/planner">
                <Button variant="ghost" className="btn-secondary text-lg px-8 py-6">
                  Try Without Account
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
