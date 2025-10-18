import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Crown,
  Sparkles,
  Zap,
  Target,
  Award,
  BarChart3,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export const Dashboard = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredOrder, setHoveredOrder] = useState<number | null>(null);

  const stats = [
    {
      title: "Today's Revenue",
      value: "₹31,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary/5",
      info: "Total revenue generated today including all orders"
    },
    {
      title: "Orders Today",
      value: "127",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500",
      bgGradient: "from-blue-500/10 to-blue-500/5",
      info: "Total number of orders processed today"
    },
    {
      title: "Active Customers",
      value: "1,247",
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
      bgGradient: "from-purple-500/10 to-purple-500/5",
      info: "Customers who placed orders in the last 30 days"
    },
    {
      title: "Avg Order Value",
      value: "₹247",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
      bgGradient: "from-orange-500/10 to-orange-500/5",
      info: "Average amount spent per order"
    },
  ];

  const recentOrders = [
    { id: "#ORD-1234", table: "Table 5", items: 3, amount: "₹850", status: "completed", time: "2 mins ago", customer: "John D." },
    { id: "#ORD-1235", table: "Table 12", items: 2, amount: "₹620", status: "pending", time: "5 mins ago", customer: "Sarah M." },
    { id: "#ORD-1236", table: "Table 3", items: 5, amount: "₹1,250", status: "completed", time: "8 mins ago", customer: "Mike R." },
    { id: "#ORD-1237", table: "Table 8", items: 4, amount: "₹980", status: "pending", time: "12 mins ago", customer: "Emma L." },
    { id: "#ORD-1238", table: "Table 15", items: 2, amount: "₹450", status: "cancelled", time: "15 mins ago", customer: "Alex K." },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-primary/10 text-primary border-primary/20",
      pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status as keyof typeof variants] || "bg-muted text-muted-foreground";
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <Badge variant="secondary" className="premium-gradient text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time insights and performance metrics for your restaurant
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="rounded-2xl gap-2">
                <BarChart3 className="w-4 h-4" />
                View Full Report
              </Button>
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-xl">
              <p>Open detailed analytics and reporting</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up group relative overflow-hidden transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-primary border-primary/20 transition-all duration-300 group-hover:scale-105 cursor-help">
                        {stat.change}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl max-w-xs">
                      <p>{stat.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity Overview */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Recent Orders
                </CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="backdrop-blur-xl">
                    <p>View all orders</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group/order relative"
                    onMouseEnter={() => setHoveredOrder(index)}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/order:opacity-100 rounded-xl transition-opacity duration-300" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-transform duration-300 group-hover/order:scale-110">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{order.id}</p>
                          <Badge className={`text-xs ${getStatusBadge(order.status)} transition-all duration-300 group-hover/order:scale-105`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.table} • {order.items} items • {order.customer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <p className="font-semibold text-primary">{order.amount}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {order.time}
                      </p>
                    </div>

                    {/* Quick Action Button */}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/order:opacity-100 transition-all duration-300 w-8 h-8 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/20" />
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {[
                { label: "Order Completion Rate", value: "94.5%", color: "from-primary to-accent", width: 94.5, info: "Successful orders vs total orders" },
                { label: "Table Occupancy", value: "78%", color: "from-blue-500 to-purple-500", width: 78, info: "Current table utilization rate" },
                { label: "Customer Satisfaction", value: "96.8%", color: "from-green-500 to-primary", width: 96.8, info: "Based on customer feedback and ratings" },
                { label: "Average Prep Time", value: "12 mins", color: "from-orange-500 to-red-500", width: 65, info: "Average time to prepare orders" },
              ].map((metric, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="space-y-3 group/metric cursor-help">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground group-hover/metric:text-foreground transition-colors">
                          {metric.label}
                        </span>
                        <span className="text-sm font-semibold group-hover/metric:scale-110 transition-transform">
                          {metric.value}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out group-hover/metric:scale-y-125 origin-left`}
                          style={{ width: `${metric.width}%` }}
                        />
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover/metric:translate-x-[100%] transition-transform duration-1000" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="backdrop-blur-xl">
                    <p>{metric.info}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Popular Items & System Status */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Selling Items */}
          <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/50 to-primary/20" />
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-500" />
                  Top Selling Items
                </CardTitle>
                <Badge variant="outline" className="text-primary border-primary/20">
                  Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {[
                  { name: "Margherita Pizza", orders: 48, revenue: "₹9,600", trend: "up" },
                  { name: "Chicken Burger", orders: 42, revenue: "₹6,720", trend: "up" },
                  { name: "Caesar Salad", orders: 38, revenue: "₹5,320", trend: "stable" },
                  { name: "Pasta Carbonara", orders: 35, revenue: "₹6,300", trend: "up" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110">
                        {index === 0 ? (
                          <Crown className="w-3 h-3 text-yellow-500" />
                        ) : (
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {item.orders} orders
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{item.revenue}</p>
                      <Badge variant="outline" className="text-xs border-green-500/20 text-green-500">
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-7 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/20" />
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {[
                  { 
                    icon: CheckCircle2, 
                    color: "text-primary", 
                    bg: "bg-primary/5",
                    title: "All Systems Operational", 
                    description: "All services running smoothly",
                    status: "operational"
                  },
                  { 
                    icon: AlertCircle, 
                    color: "text-blue-500", 
                    bg: "bg-blue-500/5",
                    title: "Menu Update Available", 
                    description: "3 items need price updates",
                    status: "warning"
                  },
                  { 
                    icon: Clock, 
                    color: "text-orange-500", 
                    bg: "bg-orange-500/5",
                    title: "Peak Hours Approaching", 
                    description: "Expect high order volume at 7 PM",
                    status: "info"
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${alert.bg} border border-transparent hover:border-${alert.color}/20 transition-all duration-200 group/alert`}
                  >
                    <alert.icon className={`w-5 h-5 ${alert.color} mt-0.5 flex-shrink-0 transition-transform group-hover/alert:scale-110`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs border-${alert.color}/20 text-${alert.color}`}>
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};