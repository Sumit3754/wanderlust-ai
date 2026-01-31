import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Wallet, Sparkles, ArrowRight, 
  Mountain, Utensils, Building2, Camera, Music, ShoppingBag,
  Loader2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import GlassCard from '@/components/ui/GlassCard';
import { toast } from '@/components/ui/use-toast';

const interests = [
  { id: 'adventure', icon: Mountain, label: 'Adventure' },
  { id: 'food', icon: Utensils, label: 'Food & Dining' },
  { id: 'culture', icon: Building2, label: 'Culture & History' },
  { id: 'photography', icon: Camera, label: 'Photography' },
  { id: 'nightlife', icon: Music, label: 'Nightlife' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping' },
];

const Planner = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState([2000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          budget: budget[0],
          interests: selectedInterests,
        }),
      });

      if (!res.ok) {
        const raw = await res.text().catch(() => '');
        let msg = raw;
        try {
          const parsed = raw ? JSON.parse(raw) : null;
          msg = parsed?.message || parsed?.error || raw;
          if (res.status === 429) {
            msg = msg || 'You are being rate-limited or your quota is exhausted. Please try again in a moment.';
          }
        } catch {
          if (res.status === 429 && !msg) {
            msg = 'You are being rate-limited or your quota is exhausted. Please try again in a moment.';
          }
        }

        toast({
          title: 'AI generation failed',
          description: msg || 'Failed to generate itinerary. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      const data = await res.json();
      if (!data?.itinerary) {
        toast({
          title: 'AI generation failed',
          description: 'The server returned an empty itinerary. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      sessionStorage.setItem('wanderly_itinerary', JSON.stringify(data.itinerary));
      toast({ title: 'Itinerary ready', description: 'Your personalized trip plan is ready.' });
      navigate('/itinerary/demo');
    } catch (err) {
      toast({
        title: 'AI generation failed',
        description: 'Failed to generate itinerary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Trip Planner</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Plan Your <span className="gradient-text">Perfect Trip</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your dream vacation, and our AI will create a personalized itinerary just for you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Destination */}
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <Label className="text-lg font-display font-semibold">Where do you want to go?</Label>
              </div>
              <Input
                type="text"
                placeholder="e.g., Tokyo, Japan or Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-field text-lg"
                required
              />
            </div>
          </GlassCard>

          {/* Dates */}
          <GlassCard delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <Label className="text-lg font-display font-semibold">When are you traveling?</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-sm text-muted-foreground">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-sm text-muted-foreground">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Budget */}
          <GlassCard delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  <Label className="text-lg font-display font-semibold">What's your budget?</Label>
                </div>
                <span className="text-2xl font-display font-bold text-primary">${budget[0].toLocaleString()}</span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={10000}
                min={500}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$500</span>
                <span>$10,000+</span>
              </div>
            </div>
          </GlassCard>

          {/* Interests */}
          <GlassCard delay={0.3}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <Label className="text-lg font-display font-semibold">What are you interested in?</Label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                      selectedInterests.includes(interest.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <interest.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{interest.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Button
              type="submit"
              className="btn-primary text-lg px-12 py-6 group"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating your itinerary...
                </span>
              ) : (
                <>
                  Generate Itinerary
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Powered by AI • Takes about 10 seconds
            </p>
          </motion.div>
        </motion.form>
      </div>
    </Layout>
  );
};

export default Planner;
