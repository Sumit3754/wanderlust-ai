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
  const [startDate, setStartDate] = useState('2026-03-20');
  const [endDate, setEndDate] = useState('2026-03-23');
  const [budget, setBudget] = useState([2000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const createOfflineItinerary = () => {
    const normalizedDestination = destination?.trim() || 'Tokyo, Japan';
    const dates = startDate && endDate ? `${startDate} - ${endDate}` : 'March 15 - March 22, 2024';

    const formatDayLabel = (isoDate: string) => {
      const d = new Date(isoDate);
      if (Number.isNaN(d.getTime())) return '';
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
    };

    const dayLabels = (() => {
      const d0 = new Date(startDate);
      if (Number.isNaN(d0.getTime())) return ['', '', ''];
      const d1 = new Date(d0);
      d1.setDate(d1.getDate() + 1);
      const d2 = new Date(d0);
      d2.setDate(d2.getDate() + 2);
      const iso0 = d0.toISOString().slice(0, 10);
      const iso1 = d1.toISOString().slice(0, 10);
      const iso2 = d2.toISOString().slice(0, 10);
      return [formatDayLabel(iso0), formatDayLabel(iso1), formatDayLabel(iso2)];
    })();

    const totalBudget = budget?.[0] ?? 2000;
    const budgetBreakdown = {
      accommodation: Math.round(totalBudget * 0.35),
      food: Math.round(totalBudget * 0.25),
      activities: Math.round(totalBudget * 0.2),
      transport: Math.round(totalBudget * 0.15),
      misc: Math.max(0, totalBudget - (Math.round(totalBudget * 0.35) + Math.round(totalBudget * 0.25) + Math.round(totalBudget * 0.2) + Math.round(totalBudget * 0.15))),
    };

    const images = {
      tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop',
      paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop',
      goa: 'https://images.unsplash.com/photo-1580748141549-71748dbe0d86?w=1200&h=600&fit=crop',
      manali: '/manali.jpg',
      generic: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop',
    };

    const parisDays = [
      {
        day: 1,
        date: dayLabels[0],
        title: 'Arrive & Classic Paris Walk',
        activities: [
          { time: '14:00', title: 'Check in & freshen up', type: 'accommodation', duration: '1.5 hours' },
          { time: '16:00', title: 'Seine riverside stroll', type: 'sightseeing', duration: '2 hours' },
          { time: '19:00', title: 'Bistro dinner', type: 'food', duration: '2.5 hours' },
        ],
      },
      {
        day: 2,
        date: dayLabels[1],
        title: 'Museums & Landmarks',
        activities: [
          { time: '09:00', title: 'Louvre (or Musée d’Orsay)', type: 'culture', duration: '3 hours' },
          { time: '13:00', title: 'Cafe lunch', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Eiffel Tower area + photos', type: 'photography', duration: '2.5 hours' },
          { time: '19:30', title: 'Montmartre evening', type: 'nightlife', duration: '2.5 hours' },
        ],
      },
      {
        day: 3,
        date: dayLabels[2],
        title: 'Neighborhoods & Shopping',
        activities: [
          { time: '10:00', title: 'Le Marais exploration', type: 'sightseeing', duration: '2.5 hours' },
          { time: '13:00', title: 'Pastry + lunch', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Shopping streets / galleries', type: 'shopping', duration: '3 hours' },
        ],
      },
    ];

    const goaDays = [
      {
        day: 1,
        date: dayLabels[0],
        title: 'Beach Time & Sunset',
        activities: [
          { time: '14:00', title: 'Check in & beach walk', type: 'sightseeing', duration: '2 hours' },
          { time: '17:00', title: 'Sunset viewpoint', type: 'photography', duration: '1.5 hours' },
          { time: '19:30', title: 'Seafood dinner', type: 'food', duration: '2.5 hours' },
        ],
      },
      {
        day: 2,
        date: dayLabels[1],
        title: 'Old Goa & Culture',
        activities: [
          { time: '09:00', title: 'Churches / heritage sites', type: 'culture', duration: '2.5 hours' },
          { time: '12:30', title: 'Local Goan lunch', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Fort / panoramic views', type: 'sightseeing', duration: '2 hours' },
          { time: '19:00', title: 'Night market / live music', type: 'nightlife', duration: '2.5 hours' },
        ],
      },
      {
        day: 3,
        date: dayLabels[2],
        title: 'Adventure & Relax',
        activities: [
          { time: '09:30', title: 'Water sports / boat ride', type: 'adventure', duration: '2.5 hours' },
          { time: '13:00', title: 'Beach shacks lunch', type: 'food', duration: '1.5 hours' },
          { time: '16:00', title: 'Cafe hopping', type: 'food', duration: '2 hours' },
        ],
      },
    ];

    const manaliDays = [
      {
        day: 1,
        date: dayLabels[0],
        title: 'Arrive & Riverside Evening',
        activities: [
          { time: '14:00', title: 'Check in & rest', type: 'accommodation', duration: '1.5 hours' },
          { time: '16:30', title: 'Old Manali walk', type: 'sightseeing', duration: '2 hours' },
          { time: '19:30', title: 'Cozy cafe dinner', type: 'food', duration: '2 hours' },
        ],
      },
      {
        day: 2,
        date: dayLabels[1],
        title: 'Mountains & Adventure',
        activities: [
          { time: '09:00', title: 'Scenic viewpoint / valley tour', type: 'sightseeing', duration: '3 hours' },
          { time: '13:00', title: 'Local lunch', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Adventure activity (zipline/trek)', type: 'adventure', duration: '3 hours' },
        ],
      },
      {
        day: 3,
        date: dayLabels[2],
        title: 'Temples & Shopping',
        activities: [
          { time: '10:00', title: 'Temple visit', type: 'culture', duration: '1.5 hours' },
          { time: '12:30', title: 'Lunch + hot chai', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Local market shopping', type: 'shopping', duration: '2.5 hours' },
        ],
      },
    ];

    const tokyoDays = [
      {
        day: 1,
        date: dayLabels[0],
        title: 'Arrival & Shibuya Exploration',
        activities: [
          { time: '14:00', title: 'Arrive & check in', type: 'transport', duration: '2 hours' },
          { time: '17:00', title: 'Neighborhood walk', type: 'sightseeing', duration: '1.5 hours' },
          { time: '19:00', title: 'Local dinner spot', type: 'food', duration: '2.5 hours' },
        ],
      },
      {
        day: 2,
        date: dayLabels[1],
        title: 'Food, Markets & Culture',
        activities: [
          { time: '09:00', title: 'Breakfast & coffee', type: 'food', duration: '1 hour' },
          { time: '10:30', title: 'Local market visit', type: 'shopping', duration: '2 hours' },
          { time: '13:30', title: 'Lunch + scenic walk', type: 'food', duration: '2 hours' },
          { time: '17:00', title: 'Museum / temple / landmark', type: 'culture', duration: '2 hours' },
        ],
      },
      {
        day: 3,
        date: dayLabels[2],
        title: 'Highlights & Photo Spots',
        activities: [
          { time: '09:00', title: 'Top viewpoint / skyline', type: 'sightseeing', duration: '2 hours' },
          { time: '12:00', title: 'Signature local lunch', type: 'food', duration: '1.5 hours' },
          { time: '14:30', title: 'Iconic neighborhood exploration', type: 'photography', duration: '3 hours' },
          { time: '19:00', title: 'Nightlife / dessert crawl', type: 'nightlife', duration: '2.5 hours' },
        ],
      },
    ];

    const genericDays = [
      {
        day: 1,
        date: dayLabels[0],
        title: 'Arrival & City Intro',
        activities: [
          { time: '14:00', title: 'Arrive & check in', type: 'transport', duration: '2 hours' },
          { time: '17:00', title: 'Orientation walk', type: 'sightseeing', duration: '2 hours' },
          { time: '19:30', title: 'Local dinner', type: 'food', duration: '2 hours' },
        ],
      },
      {
        day: 2,
        date: dayLabels[1],
        title: 'Top Attractions',
        activities: [
          { time: '09:00', title: 'Landmark / museum', type: 'culture', duration: '2 hours' },
          { time: '12:00', title: 'Lunch', type: 'food', duration: '1.5 hours' },
          { time: '14:00', title: 'Scenic area / park', type: 'sightseeing', duration: '2 hours' },
          { time: '18:30', title: 'Dinner + evening stroll', type: 'food', duration: '2.5 hours' },
        ],
      },
      {
        day: 3,
        date: dayLabels[2],
        title: 'Shopping & Hidden Gems',
        activities: [
          { time: '10:00', title: 'Local market / shopping street', type: 'shopping', duration: '2.5 hours' },
          { time: '13:00', title: 'Street food / cafe', type: 'food', duration: '1.5 hours' },
          { time: '15:00', title: 'Neighborhood exploration', type: 'photography', duration: '3 hours' },
        ],
      },
    ];

    const q = normalizedDestination.toLowerCase();
    const isTokyo = q.includes('tokyo');
    const isParis = q.includes('paris');
    const isGoa = q.includes('goa');
    const isManali = q.includes('manali');

    const days = isTokyo
      ? tokyoDays
      : isParis
        ? parisDays
        : isGoa
          ? goaDays
          : isManali
            ? manaliDays
            : genericDays;

    const image = isTokyo
      ? images.tokyo
      : isParis
        ? images.paris
        : isGoa
          ? images.goa
          : isManali
            ? images.manali
            : images.generic;

    return {
      destination: normalizedDestination,
      dates,
      image,
      totalBudget,
      budgetBreakdown,
      days,
      budgetTips: [
        'Book high-demand attractions in advance to save time.',
        'Use public transit day passes where available.',
        'Mix premium meals with casual local spots to stay on budget.',
      ],
    };
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const itinerary = createOfflineItinerary();
      sessionStorage.setItem('wanderly_itinerary', JSON.stringify(itinerary));
      toast({ title: 'Itinerary ready', description: 'Your trip plan is ready.' });
      navigate('/itinerary/demo');
    } catch (err) {
      toast({
        title: 'Generation failed',
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
