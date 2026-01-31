import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Preferences',
    description: 'Share your destination, budget, travel dates, and interests to help us understand your ideal trip.',
  },
  {
    number: '02',
    title: 'AI Creates Your Itinerary',
    description: 'Our AI analyzes thousands of options to craft a personalized day-by-day travel plan just for you.',
  },
  {
    number: '03',
    title: 'Customize & Save',
    description: 'Fine-tune your itinerary, save it to your account, and share it with your travel companions.',
  },
  {
    number: '04',
    title: 'Explore & Enjoy',
    description: 'Access your itinerary anywhere, get real-time updates, and make the most of your adventure.',
  },
];

const HowItWorks = () => {
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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Four simple steps to your perfect travel experience.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
                    <span className="font-display text-2xl font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
