import { motion } from 'framer-motion';
import { Brain, Calendar, Wallet, MapPin, Share2, Shield } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Our AI analyzes your preferences to create personalized itineraries that match your travel style.',
  },
  {
    icon: Calendar,
    title: 'Day-by-Day Schedule',
    description: 'Get detailed daily plans with activities, timings, and recommendations for each day of your trip.',
  },
  {
    icon: Wallet,
    title: 'Smart Budgeting',
    description: 'Track and optimize your travel budget with intelligent cost breakdowns and savings suggestions.',
  },
  {
    icon: MapPin,
    title: 'Interactive Maps',
    description: 'Visualize your journey with interactive maps showing routes, attractions, and local hotspots.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your travel plans with friends and family, or export them for offline access.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your travel data is encrypted and secure. We never share your personal information.',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Everything You Need to
            <span className="gradient-text"> Plan Better</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Powerful features designed to make your travel planning effortless and enjoyable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
