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
  MoreHorizontal,
  ChefHat,
  Package,
  Coffee,
  UtensilsCrossed,
  Circle,
  CheckCircle,
  Timer,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";


import { format } from "date-fns";
import { api } from "@/api/axiosInstance";

interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  notes?: string;
  variations?: {
    name: string;
    price: number;
  }[];
}

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "served" | "cancelled";

export interface IOrder {
  _id: string;
  orderId: string;
  tableNumber: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  status: OrderStatus;
  vendor: string;
  foodCourt?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  parentOrderId?: string;
  notes?: string;
  estimatedTime?: number;
  preparationStartTime?: Date;
  readyAt?: Date;
  servedAt?: Date;
  cancelledAt?: Date;
  cancelledReason?: string;
  paymentMethod?: "cash" | "card" | "wallet";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}


interface DashboardStats {
  orders: IOrder[];
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    served: number;
    cancelled: number;
  };
  revenue: number;
  orderCount: number;
  topItems: Array<{
    _id: string;
    name: string;
    qty: number;
    revenue: number;
  }>;
}

interface OrderFilters {
  status?: OrderStatus | 'all';
  page?: number;
  limit?: number;
  search?: string;
}

interface DashboardProps {
  onOrderClick?: (order: IOrder) => void;
  onNavigateToOrders?: () => void;
}

export const Dashboard = ({ onOrderClick, onNavigateToOrders }: DashboardProps) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredOrder, setHoveredOrder] = useState<number | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'all',
    page: 1,
    limit: 5,
    search: ''
  });

  const fetchDashboardData = async () => {
    try {
      setStatsLoading(true);
      const response = await api.get('/dashboard/today');
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      setLoadingOrders(true);
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.search) params.append('search', filters.search);
      
      const response = await api.get(`/dashboard/today/orders?${params.toString()}`);
      if (response.data.success) {
        setRecentOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboardData(), fetchRecentOrders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    fetchRecentOrders();
  }, [filters.status, filters.page]);

  const handleOrderClick = (order: IOrder) => {
    if (onOrderClick) {
      onOrderClick(order);
    }
  };

  const handleViewAllOrders = () => {
    if (onNavigateToOrders) {
      onNavigateToOrders();
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "served":
      case "ready":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "preparing":
        return <Timer className="w-4 h-4 text-orange-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      served: "bg-green-500/10 text-green-500 border-green-500/20",
      ready: "bg-green-500/10 text-green-500 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
      confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      preparing: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };
    return variants[status] || "bg-gray-500/10 text-gray-500";
  };

  const getStatusText = (status: OrderStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hour${Math.floor(diffMins / 60) !== 1 ? 's' : ''} ago`;
    return format(date, 'MMM d, h:mm a');
  };

  const getTotalItems = (order: IOrder) => {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCustomerName = (order: IOrder) => {
    return order.customer?.name || `Customer #${order.orderId.slice(-4)}`;
  };

  const calculateMetrics = () => {
    if (!dashboardData) return null;

    const totalOrders = dashboardData.stats.total || 0;
    const completedOrders = dashboardData.stats.served || 0;
    const cancelledOrders = dashboardData.stats.cancelled || 0;
    const activeOrders = totalOrders - cancelledOrders;

    const completionRate = totalOrders > 0 
      ? Math.round((completedOrders / (totalOrders - cancelledOrders)) * 100 * 10) / 10
      : 0;

    const avgOrderValue = dashboardData.orderCount > 0 
      ? Math.round(dashboardData.revenue / dashboardData.orderCount)
      : 0;

    return {
      totalOrders,
      completedOrders,
      cancelledOrders,
      activeOrders,
      completionRate,
      avgOrderValue,
      revenue: dashboardData.revenue,
      topItems: dashboardData.topItems || [],
    };
  };

  const metrics = calculateMetrics();
  const stats = [
    {
      title: "Today's Revenue",
      value: metrics ? formatCurrency(metrics.revenue) : "₹0",
 
      trend: metrics?.revenue > 0 ? "up" : "neutral",
      icon: DollarSign,
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary/5",
      info: "Total revenue generated today including all orders"
    },
    {
      title: "Orders Today",
      value: metrics ? metrics.totalOrders.toString() : "0",
 
      trend: metrics?.totalOrders > 0 ? "up" : "neutral",
      icon: ShoppingCart,
      color: "text-blue-500",
      bgGradient: "from-blue-500/10 to-blue-500/5",
      info: "Total number of orders processed today"
    },
    {
      title: "Active Orders",
      value: metrics ? metrics.activeOrders.toString() : "0",
   
      trend: metrics?.activeOrders > 0 ? "up" : "neutral",
      icon: Users,
      color: "text-purple-500",
      bgGradient: "from-purple-500/10 to-purple-500/5",
      info: "Orders currently being processed (excluding cancelled)"
    },
    {
      title: "Avg Order Value",
      value: metrics ? formatCurrency(metrics.avgOrderValue) : "₹0",
  
      trend: metrics?.avgOrderValue > 0 ? "up" : "neutral",
      icon: TrendingUp,
      color: "text-orange-500",
      bgGradient: "from-orange-500/10 to-orange-500/5",
      info: "Average amount spent per order"
    },
  ];

  const statusFilters = [
    { value: 'all', label: 'All', color: 'bg-gray-500' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-500' },
    { value: 'preparing', label: 'Preparing', color: 'bg-orange-500' },
    { value: 'ready', label: 'Ready', color: 'bg-green-500' },
    { value: 'served', label: 'Served', color: 'bg-green-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-2xl gap-2"
                  onClick={() => {
                    fetchDashboardData();
                    fetchRecentOrders();
                  }}
                  disabled={statsLoading || loadingOrders}
                >
                  {statsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BarChart3 className="w-4 h-4" />
                  )}
                  Refresh Data
                </Button>
              </TooltipTrigger>
              <TooltipContent className="backdrop-blur-xl">
                <p>Refresh dashboard data</p>
              </TooltipContent>
            </Tooltip>
            <Button 
              variant="default" 
              className="rounded-2xl gap-2"
              onClick={handleViewAllOrders}
            >
              <ShoppingCart className="w-4 h-4" />
              View All Orders
            </Button>
          </div>
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
              {statsLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
              
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                   
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
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {statusFilters.map((filter) => (
                      <Tooltip key={filter.value}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setFilters({ ...filters, status: filter.value as any })}
                            className={`w-2 h-2 rounded-full ${filter.color} transition-all ${filters.status === filter.value ? 'ring-2 ring-offset-1 ring-offset-background' : 'opacity-50 hover:opacity-100'}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{filter.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl w-8 h-8"
                        onClick={fetchRecentOrders}
                        disabled={loadingOrders}
                      >
                        {loadingOrders ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="w-4 h-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>Refresh orders</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {loadingOrders ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders today</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group/order relative cursor-pointer"
                      onMouseEnter={() => setHoveredOrder(index)}
                      onMouseLeave={() => setHoveredOrder(null)}
                      onClick={() => handleOrderClick(order)}
                    >
                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/order:opacity-100 rounded-xl transition-opacity duration-300" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-transform duration-300 group-hover/order:scale-110">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">#{order.orderId}</p>
                            <Badge className={`text-xs ${getStatusBadge(order.status)} transition-all duration-300 group-hover/order:scale-105`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.tableNumber} • {getTotalItems(order)} items • {getCustomerName(order)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right relative z-10">
                        <p className="font-semibold text-primary">{formatCurrency(order.total)}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          {formatTime(order.createdAt)}
                        </p>
                      </div>

                      {/* Quick Action Button */}
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/order:opacity-100 transition-all duration-300 w-8 h-8 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderClick(order);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
                { 
                  label: "Order Completion Rate", 
                  value: metrics ? `${metrics.completionRate}%` : "0%", 
                  color: "from-primary to-accent", 
                  width: metrics?.completionRate || 0, 
                  info: "Successful orders vs total orders" 
                },
                { 
                  label: "Active Orders Rate", 
                  value: metrics ? `${Math.round((metrics.activeOrders / Math.max(metrics.totalOrders, 1)) * 100)}%` : "0%", 
                  color: "from-blue-500 to-purple-500", 
                  width: metrics ? Math.round((metrics.activeOrders / Math.max(metrics.totalOrders, 1)) * 100) : 0, 
                  info: "Current active orders percentage" 
                },
                { 
                  label: "Cancellation Rate", 
                  value: metrics ? `${Math.round((metrics.cancelledOrders / Math.max(metrics.totalOrders, 1)) * 100)}%` : "0%", 
                  color: metrics && metrics.cancelledOrders > 0 ? "from-orange-500 to-red-500" : "from-green-500 to-primary", 
                  width: metrics ? Math.round((metrics.cancelledOrders / Math.max(metrics.totalOrders, 1)) * 100) : 0, 
                  info: "Cancelled orders percentage" 
                },
                { 
                  label: "Revenue per Order", 
                  value: metrics ? formatCurrency(metrics.avgOrderValue) : "₹0", 
                  color: "from-green-500 to-primary", 
                  width: metrics ? Math.min((metrics.avgOrderValue / 1000) * 100, 100) : 0, 
                  info: "Average revenue generated per order" 
                },
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
              {metrics?.topItems.length === 0 ? (
                <div className="text-center py-8">
                  <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No items sold today</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {metrics?.topItems.slice(0, 4).map((item, index) => (
                    <div
                      key={item._id}
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
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {item.qty} sold
                            <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{formatCurrency(item.revenue)}</p>
                        <Badge variant="outline" className="text-xs border-green-500/20 text-green-500">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    icon: dashboardData?.orders && dashboardData.orders.length > 0 ? CheckCircle2 : AlertCircle, 
                    color: dashboardData?.orders && dashboardData.orders.length > 0 ? "text-primary" : "text-yellow-500", 
                    bg: dashboardData?.orders && dashboardData.orders.length > 0 ? "bg-primary/5" : "bg-yellow-500/5",
                    title: dashboardData?.orders && dashboardData.orders.length > 0 ? "Orders Processing Normally" : "No Orders Today", 
                    description: dashboardData?.orders && dashboardData.orders.length > 0 ? "All orders are being processed" : "Awaiting first order of the day",
                    status: dashboardData?.orders && dashboardData.orders.length > 0 ? "operational" : "idle"
                  },
                  { 
                    icon: metrics && metrics.completionRate > 90 ? CheckCircle2 : AlertCircle, 
                    color: metrics && metrics.completionRate > 90 ? "text-green-500" : "text-orange-500", 
                    bg: metrics && metrics.completionRate > 90 ? "bg-green-500/5" : "bg-orange-500/5",
                    title: metrics && metrics.completionRate > 90 ? "High Completion Rate" : "Room for Improvement", 
                    description: metrics && metrics.completionRate > 90 ? "Excellent order completion performance" : "Consider improving order processing",
                    status: metrics && metrics.completionRate > 90 ? "excellent" : "needs_attention"
                  },
                  { 
                    icon: metrics && metrics.cancelledOrders > 0 ? AlertCircle : CheckCircle2, 
                    color: metrics && metrics.cancelledOrders > 0 ? "text-orange-500" : "text-green-500", 
                    bg: metrics && metrics.cancelledOrders > 0 ? "bg-orange-500/5" : "bg-green-500/5",
                    title: metrics && metrics.cancelledOrders > 0 ? `${metrics.cancelledOrders} Cancelled Order${metrics.cancelledOrders !== 1 ? 's' : ''}` : "No Cancellations", 
                    description: metrics && metrics.cancelledOrders > 0 ? "Monitor cancellation reasons" : "Perfect cancellation rate today",
                    status: metrics && metrics.cancelledOrders > 0 ? "warning" : "perfect"
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${alert.bg} border border-transparent hover:border-${alert.color.split('-')[1]}/20 transition-all duration-200 group/alert`}
                  >
                    <alert.icon className={`w-5 h-5 ${alert.color} mt-0.5 flex-shrink-0 transition-transform group-hover/alert:scale-110`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs border-${alert.color.split('-')[1]}/20 text-${alert.color.split('-')[1]}`}>
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