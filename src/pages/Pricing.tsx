import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const Pricing = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      tagline: 'For trying Wanderly and quick trips.',
      features: [
        'Offline itineraries',
        'Destination-based templates',
        'Budget breakdown preview',
        'Shareable itinerary preview',
      ],
      cta: { label: 'Get Started', href: '/register' },
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$9/mo',
      tagline: 'For frequent travelers who want smarter planning.',
      features: [
        'AI itineraries (when enabled)',
        'Export to PDF / print',
        'Save unlimited trips',
        'Advanced filters (pace, interests)',
      ],
      cta: { label: 'Start Pro', href: '/register' },
      highlight: true,
    },
    {
      name: 'Team',
      price: '$29/mo',
      tagline: 'For groups, couples, and teams planning together.',
      features: [
        'Collaborative planning',
        'Shared budget + voting',
        'Multiple travelers per trip',
        'Priority support',
      ],
      cta: { label: 'Contact Sales', href: '/company' },
      highlight: false,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Pricing</h1>
            <p className="text-muted-foreground">
              Simple plans for every kind of traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <GlassCard
                key={tier.name}
                className={tier.highlight ? 'border border-primary/40' : undefined}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-display font-semibold text-xl">{tier.name}</h2>
                      {tier.highlight && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/15 text-primary">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="text-3xl font-display font-bold">{tier.price}</div>
                      <div className="text-sm text-muted-foreground mt-1">{tier.tagline}</div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-3 text-sm">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Button asChild className={tier.highlight ? 'btn-primary w-full' : 'w-full'} variant={tier.highlight ? 'default' : 'outline'}>
                      <Link to={tier.cta.href}>{tier.cta.label}</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            By using Wanderly, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
