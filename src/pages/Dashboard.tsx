import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, MapPin, Calendar, Wallet, ArrowRight, 
  TrendingUp, Clock, Star, MoreVertical 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

// Demo data
const trips = [
  {
    id: 'demo',
    destination: 'Tokyo, Japan',
    dates: 'Mar 15 - Mar 22, 2024',
    days: 7,
    budget: 3500,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    destination: 'Paris, France',
    dates: 'Apr 5 - Apr 12, 2024',
    days: 7,
    budget: 4200,
    status: 'planning',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    destination: 'Bali, Indonesia',
    dates: 'Jan 10 - Jan 17, 2024',
    days: 7,
    budget: 2800,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
  },
];

const stats = [
  { label: 'Trips Planned', value: '12', icon: MapPin, trend: '+2 this month' },
  { label: 'Countries Visited', value: '8', icon: TrendingUp, trend: '+1 this year' },
  { label: 'Days Traveled', value: '64', icon: Calendar, trend: 'Total' },
  { label: 'Budget Saved', value: '$1,240', icon: Wallet, trend: 'vs. average' },
];

const Dashboard = () => {
  return (
    <Layout isAuthenticated>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">
              Welcome back, <span className="gradient-text">Traveler</span>
            </h1>
            <p className="text-muted-foreground">
              Ready to plan your next adventure?
            </p>
          </div>
          <Link to="/planner">
            <Button className="btn-primary group">
              <Plus className="w-5 h-5 mr-2" />
              New Trip
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={stat.label} delay={index * 0.1}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-primary mt-2">{stat.trend}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Trips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Your Trips</h2>
            <Link to="/profile" className="text-primary hover:underline text-sm">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Link to={`/itinerary/${trip.id}`}>
                  <div className="glass rounded-2xl overflow-hidden card-hover group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.destination}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            trip.status === 'upcoming'
                              ? 'bg-primary/90 text-primary-foreground'
                              : trip.status === 'planning'
                              ? 'bg-accent/90 text-accent-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-display font-bold text-white">
                          {trip.destination}
                        </h3>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.dates}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {trip.days} days
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Wallet className="w-4 h-4 text-primary" />
                          <span className="font-semibold">${trip.budget.toLocaleString()}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Add New Trip Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link to="/planner">
                <div className="glass rounded-2xl h-full min-h-[300px] flex flex-col items-center justify-center p-8 card-hover border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">Plan New Trip</h3>
                  <p className="text-muted-foreground text-sm text-center">
                    Start planning your next adventure
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="p-3 rounded-xl bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Popular Destinations</h3>
                <p className="text-sm text-muted-foreground">Explore trending places</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="p-3 rounded-xl bg-accent/10">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Seasonal Guides</h3>
                <p className="text-sm text-muted-foreground">Best times to travel</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-4 cursor-pointer">
              <div className="p-3 rounded-xl bg-success/10">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Budget Tips</h3>
                <p className="text-sm text-muted-foreground">Save on your trips</p>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
