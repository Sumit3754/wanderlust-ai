import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Wallet, Clock, 
  Download, Share2, Edit, Check, ChevronDown, ChevronUp,
  Utensils, Camera, Building2, Coffee, Moon, Star
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';

// Demo itinerary data
const demoItinerary = {
  id: 'demo',
  destination: 'Tokyo, Japan',
  dates: 'March 15 - March 22, 2024',
  totalDays: 7,
  totalBudget: 3500,
  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop',
  budgetBreakdown: {
    accommodation: 1200,
    food: 800,
    activities: 600,
    transport: 500,
    misc: 400,
  },
  days: [
    {
      day: 1,
      date: 'March 15',
      title: 'Arrival & Shibuya Exploration',
      activities: [
        { time: '14:00', title: 'Arrive at Narita Airport', type: 'transport', duration: '2 hours' },
        { time: '17:00', title: 'Check in at Hotel', type: 'accommodation', duration: '1 hour' },
        { time: '19:00', title: 'Shibuya Crossing & Dinner', type: 'food', duration: '3 hours' },
      ],
    },
    {
      day: 2,
      date: 'March 16',
      title: 'Traditional Tokyo',
      activities: [
        { time: '08:00', title: 'Tsukiji Fish Market Breakfast', type: 'food', duration: '2 hours' },
        { time: '10:30', title: 'Senso-ji Temple', type: 'culture', duration: '2 hours' },
        { time: '13:00', title: 'Asakusa Lunch', type: 'food', duration: '1.5 hours' },
        { time: '15:00', title: 'Tokyo Skytree', type: 'sightseeing', duration: '2 hours' },
        { time: '19:00', title: 'Izakaya Experience', type: 'food', duration: '3 hours' },
      ],
    },
    {
      day: 3,
      date: 'March 17',
      title: 'Modern Tokyo & Technology',
      activities: [
        { time: '09:00', title: 'teamLab Borderless', type: 'culture', duration: '3 hours' },
        { time: '12:30', title: 'Odaiba Lunch', type: 'food', duration: '1.5 hours' },
        { time: '14:30', title: 'Akihabara Electric Town', type: 'shopping', duration: '3 hours' },
        { time: '18:00', title: 'Shinjuku Golden Gai', type: 'nightlife', duration: '4 hours' },
      ],
    },
    {
      day: 4,
      date: 'March 18',
      title: 'Day Trip to Mount Fuji',
      activities: [
        { time: '07:00', title: 'Depart for Kawaguchiko', type: 'transport', duration: '2 hours' },
        { time: '09:30', title: 'Chureito Pagoda', type: 'sightseeing', duration: '2 hours' },
        { time: '12:00', title: 'Local Lunch', type: 'food', duration: '1 hour' },
        { time: '14:00', title: 'Lake Kawaguchi Cruise', type: 'activity', duration: '1.5 hours' },
        { time: '17:00', title: 'Return to Tokyo', type: 'transport', duration: '2 hours' },
      ],
    },
    {
      day: 5,
      date: 'March 19',
      title: 'Harajuku & Meiji Shrine',
      activities: [
        { time: '09:00', title: 'Meiji Shrine', type: 'culture', duration: '2 hours' },
        { time: '11:30', title: 'Harajuku & Takeshita Street', type: 'shopping', duration: '3 hours' },
        { time: '15:00', title: 'Omotesando Cafes', type: 'food', duration: '2 hours' },
        { time: '18:00', title: 'Robot Restaurant', type: 'entertainment', duration: '2 hours' },
      ],
    },
    {
      day: 6,
      date: 'March 20',
      title: 'Hidden Gems & Local Experience',
      activities: [
        { time: '10:00', title: 'Yanaka Old Town', type: 'culture', duration: '3 hours' },
        { time: '13:30', title: 'Ramen Cooking Class', type: 'food', duration: '2.5 hours' },
        { time: '16:30', title: 'Ueno Park', type: 'sightseeing', duration: '2 hours' },
        { time: '19:00', title: 'Farewell Dinner', type: 'food', duration: '3 hours' },
      ],
    },
    {
      day: 7,
      date: 'March 22',
      title: 'Departure',
      activities: [
        { time: '08:00', title: 'Last-minute Shopping', type: 'shopping', duration: '2 hours' },
        { time: '11:00', title: 'Check out', type: 'accommodation', duration: '1 hour' },
        { time: '14:00', title: 'Depart from Narita', type: 'transport', duration: '2 hours' },
      ],
    },
  ],
};

const activityIcons: Record<string, typeof MapPin> = {
  transport: MapPin,
  food: Utensils,
  culture: Building2,
  sightseeing: Camera,
  shopping: Star,
  accommodation: Moon,
  nightlife: Moon,
  activity: Star,
  entertainment: Star,
};

const Itinerary = () => {
  const { id } = useParams();
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  let stored: any = null;
  try {
    const raw = sessionStorage.getItem('wanderly_itinerary');
    stored = raw ? JSON.parse(raw) : null;
  } catch {
    stored = null;
  }

  const itinerary = stored
    ? {
        ...demoItinerary,
        destination: stored?.destination || demoItinerary.destination,
        dates: stored?.dates || demoItinerary.dates,
        totalDays: Array.isArray(stored?.days) ? stored.days.length : demoItinerary.totalDays,
        days: Array.isArray(stored?.days)
          ? stored.days.map((d: any, idx: number) => ({
              day: typeof d?.day === 'number' ? d.day : idx + 1,
              date: d?.date || demoItinerary.days?.[idx]?.date || '',
              title: d?.title || demoItinerary.days?.[idx]?.title || `Day ${idx + 1}`,
              activities: Array.isArray(d?.activities) ? d.activities : [],
            }))
          : demoItinerary.days,
      }
    : demoItinerary;

  const totalSpent = Object.values(itinerary.budgetBreakdown).reduce((a, b) => a + b, 0);
  const budgetPercentage = (totalSpent / itinerary.totalBudget) * 100;

  return (
    <Layout isAuthenticated showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          <img
            src={itinerary.image}
            alt={itinerary.destination}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {itinerary.destination}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {itinerary.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {itinerary.totalDays} days
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-4 h-4" />
                    ${itinerary.totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="glass">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="glass">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button className="btn-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Day-by-Day Itinerary */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-display font-bold mb-4">Day-by-Day Itinerary</h2>
            {itinerary.days.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <GlassCard className="p-0 overflow-hidden" hover={false}>
                  {/* Day Header */}
                  <button
                    onClick={() => toggleDay(day.day)}
                    className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-xl font-display font-bold text-primary-foreground">
                          {day.day}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                        <h3 className="font-display font-semibold text-lg">{day.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm hidden md:block">{day.activities.length} activities</span>
                      {expandedDays.includes(day.day) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Activities */}
                  {expandedDays.includes(day.day) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border"
                    >
                      <div className="p-4 md:p-6 space-y-4">
                        {day.activities.map((activity, actIndex) => {
                          const Icon = activityIcons[activity.type] || MapPin;
                          return (
                            <div
                              key={actIndex}
                              className="flex items-start gap-4 p-3 rounded-xl bg-secondary/30"
                            >
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{activity.title}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {activity.time}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Duration: {activity.duration}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Breakdown */}
            <GlassCard>
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Budget Breakdown
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Total Estimated</span>
                    <span className="font-semibold">${totalSpent.toLocaleString()}</span>
                  </div>
                  <Progress value={budgetPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {budgetPercentage.toFixed(0)}% of ${itinerary.totalBudget.toLocaleString()} budget
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-border">
                  {Object.entries(itinerary.budgetBreakdown).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="capitalize text-muted-foreground">{category}</span>
                      <span className="font-medium">${amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Quick Tips */}
            <GlassCard>
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Travel Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Get a JR Pass for unlimited train travel</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Carry cash - many places don't accept cards</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Download Google Maps offline for the area</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Book teamLab tickets in advance</span>
                </li>
              </ul>
            </GlassCard>

            {/* Map Placeholder */}
            <GlassCard>
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Route Overview
              </h3>
              <div className="aspect-video rounded-xl bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Google Maps integration</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Itinerary;
