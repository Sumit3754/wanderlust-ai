import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Calendar, Mail, Camera, Edit, 
  Settings, LogOut, Star, Clock, Wallet 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';

const pastTrips = [
  {
    id: '3',
    destination: 'Bali, Indonesia',
    dates: 'Jan 10 - Jan 17, 2024',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
    rating: 5,
  },
  {
    id: '4',
    destination: 'Barcelona, Spain',
    dates: 'Nov 5 - Nov 12, 2023',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    rating: 4,
  },
  {
    id: '5',
    destination: 'New York, USA',
    dates: 'Sep 20 - Sep 27, 2023',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    rating: 5,
  },
];

const upcomingTrips = [
  {
    id: 'demo',
    destination: 'Tokyo, Japan',
    dates: 'Mar 15 - Mar 22, 2024',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    daysUntil: 45,
  },
  {
    id: '2',
    destination: 'Paris, France',
    dates: 'Apr 5 - Apr 12, 2024',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    daysUntil: 66,
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <Layout isAuthenticated>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-16 h-16 text-primary-foreground" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-display font-bold mb-2">John Traveler</h1>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mb-4">
                <Mail className="w-4 h-4" />
                john@example.com
              </p>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-bold">64</p>
                  <p className="text-sm text-muted-foreground">Days</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link to="/settings">
                <Button variant="outline" className="glass">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" className="glass">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Trips Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass mb-6 p-1">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Upcoming Trips
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Past Trips
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/itinerary/${trip.id}`}>
                    <GlassCard className="p-0 overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          In {trip.daysUntil} days
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-display font-bold text-white">{trip.destination}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          {trip.dates}
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/itinerary/${trip.id}`}>
                    <GlassCard className="p-0 overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-display font-bold text-white">{trip.destination}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="w-4 h-4" />
                            {trip.dates}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(trip.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">No saved trips yet</h3>
              <p className="text-muted-foreground mb-4">Start exploring and save your favorite destinations!</p>
              <Link to="/planner">
                <Button className="btn-primary">Plan a Trip</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
