// src/components/FoodCourt.tsx
import { useState } from 'react';
import {
  Utensils,
  Store,
  Users,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Zap,
  Crown,
  MapPin,
  Star,
  ArrowRight,
  Building,
  CheckCircle,
  XCircle,
  LogOut,
  Loader2,
  Info,
  Calendar,
  Percent,
  Clock,
  ChefHat,
  DollarSign,
  UserPlus,
  DoorOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useFoodCourts,
  useMyFoodCourt,
  useJoinableFoodCourts,
  useJoinFoodCourt,
  useLeaveFoodCourt,
} from "@/hooks/useFoodCourt";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export const FoodCourt = () => {
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  
  // Hooks for data fetching and mutations
  const { data: foodCourts, isLoading: loadingCourts } = useFoodCourts();
  const { data: myFoodCourt, isLoading: loadingMyCourt } = useMyFoodCourt();
  const { data: joinableData, isLoading: loadingJoinable } = useJoinableFoodCourts();
  const joinMutation = useJoinFoodCourt();
  const leaveMutation = useLeaveFoodCourt();

  const isLoading = loadingCourts || loadingMyCourt || loadingJoinable;

  // Color mapping for food courts
  const colorMap = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-amber-600 to-yellow-500",
    "from-indigo-500 to-purple-600",
  ];

  const bgColorMap = [
    "bg-red-600",
    "bg-blue-600",
    "bg-purple-700",
    "bg-green-600",
    "bg-amber-700",
    "bg-indigo-600",
  ];

  // Handle joining a food court
  const handleJoinFoodCourt = async (foodCourtId: string) => {
    try {
      await joinMutation.mutateAsync(foodCourtId);
      setSelectedCourt(null);
      toast.success("Successfully joined! — You can now start listing your restaurant in this food court");
    } catch (error) {
      console.error('Join failed:', error);
    }
  };

  // Handle leaving food court
  const handleLeaveFoodCourt = async () => {
    try {
      await leaveMutation.mutateAsync();
      setShowLeaveConfirm(false);
      toast("Left food court — You can now join another food court");
    } catch (error) {
      console.error('Leave failed:', error);
    }
  };

  // Get selected court details
  const getSelectedCourt = () => {
    if (!selectedCourt) return null;
    return joinableData?.courts?.find((c: any) => c._id === selectedCourt);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Stats data - dynamic based on user status
  const getStats = () => {
    const baseStats = [
      { 
        label: "Revenue Boost", 
        value: myFoodCourt ? "+28%" : "+35%", 
        icon: TrendingUp, 
        color: "text-green-500",
        description: myFoodCourt ? "Your projected growth" : "Average for new partners"
      },
      { 
        label: "Partner Restaurants", 
        value: myFoodCourt ? `${myFoodCourt.outlets?.length || 0}/200` : "1,200+", 
        icon: Store, 
        color: "text-blue-500",
        description: myFoodCourt ? "Spots in your court" : "Total across all courts"
      },
      { 
        label: "Daily Orders", 
        value: myFoodCourt ? "150+" : "50K+", 
        icon: Users, 
        color: "text-purple-500",
        description: myFoodCourt ? "Average in your court" : "Total across platform"
      },
      { 
        label: "Payout Frequency", 
        value: myFoodCourt ? "Daily" : "Daily", 
        icon: ShieldCheck, 
        color: myFoodCourt ? "text-primary" : "text-orange-500",
        description: "Secure & fast payouts"
      },
    ];

    if (myFoodCourt) {
      baseStats.push(
        { 
          label: "Commission Rate", 
          value: "15%", 
          icon: Percent, 
          color: "text-amber-500",
          description: "Your current rate"
        },
        { 
          label: "Member Since", 
          value: formatDate(myFoodCourt.joinedAt || new Date().toISOString()).split(' ')[0], 
          icon: Calendar, 
          color: "text-emerald-500",
          description: "Joined date"
        }
      );
    }

    return baseStats;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading food court information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header with user's current food court status */}
      <div className="text-center space-y-4 py-8">
        <Badge className="premium-gradient text-white border-0 text-lg px-6 py-2">
          <Utensils className="w-5 h-5 mr-2" />
          Restaurant Partner Dashboard
        </Badge>
        
        {myFoodCourt ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Welcome to {myFoodCourt.name}!
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">
                    {myFoodCourt.city} • Established {myFoodCourt.establishedYear || "2023"}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Active Member
                </Badge>
                <Button
                  variant="destructive"
                  onClick={() => setShowLeaveConfirm(true)}
                  disabled={leaveMutation.isPending}
                  className="gap-2"
                >
                  {leaveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  Leave Food Court
                </Button>
              </div>
            </div>

            {/* Member Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Ranking</p>
                    <p className="text-2xl font-bold">#24</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <Progress value={75} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Top 30% in food court</p>
              </Card>

              <Card className="p-4 bg-green-500/5 border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Orders</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </div>
                  <ChefHat className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </Card>

              <Card className="p-4 bg-purple-500/5 border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue This Month</p>
                    <p className="text-2xl font-bold">$8,450</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <p className="text-xs text-purple-600">+18% from last month</p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Join Singapore's Premier Food Courts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get listed in premium food courts. 
              <span className="font-semibold text-primary"> Zero setup fee</span> • 
              <span className="font-semibold text-primary"> Instant digital orders</span> • 
              <span className="font-semibold text-primary"> Grow with thousands of daily diners</span>.
            </p>
            
            {joinableData?.canJoin === false ? (
              <Card className="max-w-2xl mx-auto mt-6 border-destructive/30 bg-destructive/5">
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-destructive" />
                    <div>
                      <h3 className="text-lg font-semibold text-destructive">
                        Cannot Join Food Court
                      </h3>
                      <p className="text-muted-foreground">
                        {joinableData.message || "You need to complete your restaurant profile first."}
                      </p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" onClick={() => toast('Redirecting — Redirecting to profile setup...')}>
                    Complete Your Profile
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge variant="secondary" className="px-4 py-2 text-base">
                  <Clock className="w-4 h-4 mr-2" />
                  No long-term contracts
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-base">
                  <Percent className="w-4 h-4 mr-2" />
                  Competitive commission
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-base">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Secure payments
                </Badge>
              </div>
            )}
          </>
        )}
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {myFoodCourt ? (
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        ) : (
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Available Courts</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
        )}

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getStats().map((stat, i) => (
              <Card key={i} className="p-4 glass border-border/50 hover-lift">
                <stat.icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </Card>
            ))}
          </div>

          {!myFoodCourt && joinableData?.canJoin && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Available Food Courts</h2>
                <p className="text-muted-foreground">
                  {joinableData.courts?.length || 0} courts available in your region
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinableData.courts?.map((court: any, index: number) => (
                  <Card
                    key={court._id}
                    className="group glass border-border/50 overflow-hidden hover:border-primary/50 transition-all hover-lift"
                  >
                    <div className={`h-2 bg-gradient-to-r ${colorMap[index % colorMap.length]}`} />
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl ${bgColorMap[index % bgColorMap.length]} flex items-center justify-center text-white text-2xl font-bold`}>
                            {court.name.split(" ")[0][0]}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{court.name}</h3>
                            <p className="text-sm text-muted-foreground">{court.city}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="font-semibold">{court.rating || 4.5}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{court.outlets?.length || 0} active outlets</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{court.dailyOrders || "500+"} daily orders</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Percent className="w-4 h-4 text-muted-foreground" />
                          <span>Commission: {court.commission || "1"}%</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          className="w-full premium-gradient group-hover:scale-105 transition"
                          onClick={() => setSelectedCourt(court._id)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Apply to Join
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {myFoodCourt && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Food Court Details</h2>
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Court Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{myFoodCourt.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Outlets:</span>
                        <span className="font-medium">{myFoodCourt.outlets?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your Commission:</span>
                        <span className="font-medium text-green-600">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payout Schedule:</span>
                        <span className="font-medium">Daily</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <FileCheck className="w-4 h-4 mr-2" />
                        View Monthly Report
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Store className="w-4 h-4 mr-2" />
                        Update Menu
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Users className="w-4 h-4 mr-2" />
                        Contact Court Manager
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Other Tabs for Members */}
        {myFoodCourt && (
          <>
            <TabsContent value="performance" className="space-y-6">
              <h2 className="text-2xl font-bold">Performance Analytics</h2>
              <Card className="p-6">
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Performance charts coming soon</p>
                    <p className="text-sm text-muted-foreground">View your sales trends, customer ratings, and more</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <h2 className="text-2xl font-bold">Other Members</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myFoodCourt.outlets?.slice(0, 6).map((outlet: any, index: number) => (
                  <Card key={outlet._id} className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className={bgColorMap[index % bgColorMap.length]}>
                          {outlet.restaurantName?.[0] || outlet.firstName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{outlet.restaurantName || "Restaurant"}</h4>
                        <p className="text-sm text-muted-foreground">
                          {outlet.cuisineType || "Various cuisine"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{outlet.rating || 4.2}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {outlet.status || "Active"}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold">Food Court Settings</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about your food court</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sales Reports</p>
                      <p className="text-sm text-muted-foreground">Weekly sales summaries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => setShowLeaveConfirm(true)}
                    >
                      <DoorOpen className="w-4 h-4 mr-2" />
                      Leave Food Court
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      You can join another food court after leaving this one
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </>
        )}

        {/* Comparison Tab for Non-Members */}
        {!myFoodCourt && (
          <>
            <TabsContent value="comparison" className="space-y-6">
              <h2 className="text-2xl font-bold">Compare Food Courts</h2>
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Food Court</th>
                        <th className="text-left py-3">Commission</th>
                        <th className="text-left py-3">Daily Orders</th>
                        <th className="text-left py-3">Rating</th>
                        <th className="text-left py-3">Outlets</th>
                        <th className="text-left py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {joinableData?.courts?.slice(0, 5).map((court: any, index: number) => (
                        <tr key={court._id} className="border-b hover:bg-muted/50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg ${bgColorMap[index % bgColorMap.length]} flex items-center justify-center text-white`}>
                                {court.name[0]}
                              </div>
                              <div>
                                <p className="font-medium">{court.name}</p>
                                <p className="text-sm text-muted-foreground">{court.city}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="font-medium">{court.commission || "1"}%</span>
                          </td>
                          <td className="py-3">{court.dailyOrders || "500+"}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{court.rating || 4.5}</span>
                            </div>
                          </td>
                          <td className="py-3">{court.outlets?.length || 0}</td>
                          <td className="py-3">
                            <Button 
                              size="sm"
                              onClick={() => setSelectedCourt(court._id)}
                            >
                              Join
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <h2 className="text-2xl font-bold">Benefits of Joining</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Increased Visibility</h3>
                  <p className="text-muted-foreground">
                    Get discovered by thousands of new customers in high-traffic food courts
                  </p>
                </Card>

                <Card className="p-6 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Revenue Growth</h3>
                  <p className="text-muted-foreground">
                    Average 35% revenue increase for new partners in the first 3 months
                  </p>
                </Card>

                <Card className="p-6 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Support & Tools</h3>
                  <p className="text-muted-foreground">
                    Dedicated support team, analytics dashboard, and marketing tools included
                  </p>
                </Card>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

 
     

      {/* Join Confirmation Dialog */}
      <Dialog open={!!selectedCourt} onOpenChange={() => setSelectedCourt(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Food Court</DialogTitle>
            <DialogDescription>
              Confirm your application to join this food court. You can only be a member of one food court at a time.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourt && getSelectedCourt() && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className={`w-16 h-16 rounded-xl ${bgColorMap[joinableData?.courts?.indexOf(getSelectedCourt()) % bgColorMap.length]} flex items-center justify-center text-white text-2xl font-bold`}>
                  {getSelectedCourt()?.name[0]}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{getSelectedCourt()?.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{getSelectedCourt()?.city}</p>
                    <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />
                    <span>{getSelectedCourt()?.rating || 4.5}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold">Terms & Conditions</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No setup fee or hidden charges</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Flexible 30-day notice period for leaving</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Daily payouts directly to your account</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Commission Rate:</span>
                    <span className="font-semibold">{getSelectedCourt()?.commission || "1"}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Minimum Contract:</span>
                    <span className="font-medium">6 months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Setup Fee:</span>
                    <span className="font-medium text-green-600">Waived</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedCourt(null)}
                  disabled={joinMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 premium-gradient"
                  onClick={() => handleJoinFoodCourt(selectedCourt)}
                  disabled={joinMutation.isPending}
                >
                  {joinMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Join
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground pt-2">
                By joining, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Leave Confirmation Dialog */}
      <Dialog open={showLeaveConfirm} onOpenChange={setShowLeaveConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Food Court</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave {myFoodCourt?.name}? This action cannot be undone immediately.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-destructive">Important Notice</p>
                  <ul className="text-sm space-y-1">
                    <li>• Your listings will be removed immediately</li>
                    <li>• Any pending orders will be cancelled</li>
                    <li>• You can join another food court after 24 hours</li>
                    <li>• Final payout will be processed within 7 days</li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLeaveConfirm(false)}
                disabled={leaveMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleLeaveFoodCourt}
                disabled={leaveMutation.isPending}
              >
                {leaveMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Leaving...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Confirm Leave
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final CTA */}
      {!myFoodCourt && joinableData?.canJoin && (
        <div className="text-center py-10">
          <Card className="max-w-3xl mx-auto p-8 glass border-primary/30">
            <h3 className="text-2xl font-semibold mb-3">
              Ready to grow your restaurant?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join over 1,200 successful restaurant partners in Singapore's top food courts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="premium-gradient">
                <Utensils className="w-5 h-5 mr-2" />
                Start Free Application
              </Button>
              <Button size="lg" variant="outline">
                <Info className="w-5 h-5 mr-2" />
                Schedule a Demo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required • Approval within 24 hours
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};