// components/orders/orders-management.tsx
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Info, 
  Sparkles, 
  Zap, 
  Power, 
  PauseCircle,
  User,
  MapPin,
  AlertCircle,
  RefreshCw,
  Bell,
  Filter,
  Search,
  Settings,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useCallback } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  getVendorOrders, 
  updateOrderStatusApi, 
  cancelOrderApi, 
  updateVendorSettings, 
  getVendorSettings,
  getOrderStatisticsApi,
  getRevenueStatsApi 
} from "@/api/ordersApi";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';

export default function OrdersManagement() {
  interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    menuId?: string;
    notes?: string;
  }

  interface Order {
    _id: string;
    id: string;
    tableNumber: string;
    items: OrderItem[];
    total: number;
    status: "pending" | "confirmed" | "preparing" | "ready" | "served" | "cancelled";
    createdAt: string;
    updatedAt: string;
    vendor: string;
    foodCourt: string;
    customer?: {
      name?: string;
      phone?: string;
      email?: string;
    };
    estimatedTime?: number;
    progress?: number;
    notes?: string;
    parentOrderId?: string;
    orderId?: string;
  }

  interface VendorStats {
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    served: number;
    cancelled: number;
  }


  interface VendorSettings {
    isAcceptingOrders: boolean;
    autoConfirmTime: number;
  }

  interface RevenueStats {
    revenue: number;
    orderCount: number;
    averageOrderValue: number;
  }

  type OrderStatus = Order["status"];
  type FilterStatus = OrderStatus | "all";

  const [orders, setOrders] = useState<Order[]>([]);
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const [autoConfirmTime, setAutoConfirmTime] = useState(30); // seconds
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [tempAutoConfirmTime, setTempAutoConfirmTime] = useState(30);
  const [stats, setStats] = useState<VendorStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    served: 0,
    cancelled: 0,
  });
  const [revenueStats, setRevenueStats] = useState<RevenueStats>({
    revenue: 0,
    orderCount: 0,
    averageOrderValue: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("orders"); // Track active tab

  const [user] = useAtom(userAtom);

  // Fetch orders from API
  const fetchOrders = useCallback(async () => {
    if (!user?._id) return;
    
    try {
      setRefreshing(true);
      const response = await getVendorOrders(user._id, {
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined,
        page: 1,
        limit: 100,
      });
      
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch orders:", error);
      toast.error(error.response?.data?.error || "Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?._id, statusFilter, searchQuery]);

  // Fetch vendor settings
  const fetchSettings = useCallback(async () => {
    if (!user?._id) return;
    
    try {
      const response = await getVendorSettings();
      if (response.success) {
        setIsAcceptingOrders(response.data.isAcceptingOrders);
        setAutoConfirmTime(response.data.autoConfirmTime);
        setTempAutoConfirmTime(response.data.autoConfirmTime);
      }
    } catch (error: any) {
      console.error("Failed to fetch settings:", error);
      toast.error("Failed to load vendor settings");
    }
  }, [user?._id]);

  // Fetch vendor statistics
  const fetchStats = useCallback(async () => {
    if (!user?._id) return;
    
    try {
      const response = await getOrderStatisticsApi();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch stats:", error);
    }
  }, [user?._id]);

  // Fetch revenue statistics
  const fetchRevenueStats = useCallback(async (period: string = 'today') => {
    if (!user?._id) return;
    
    try {
      const response = await getRevenueStatsApi(period);
      if (response.success) {
        setRevenueStats(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch revenue stats:", error);
    }
  }, [user?._id]);

  // Initial fetch on component mount
  useEffect(() => {
    if (user?._id) {
      fetchOrders();
      fetchSettings();
      fetchStats();
      fetchRevenueStats('today');
    }
  }, [user?._id, fetchOrders, fetchSettings, fetchStats, fetchRevenueStats]);

  // Auto-confirm orders after specified time
  useEffect(() => {
    if (!isAcceptingOrders) return;

    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === "pending") {
            const timeDiff = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
            if (timeDiff >= autoConfirmTime) {
              handleUpdateStatus(order._id, "confirmed");
            }
          }
          return order;
        })
      );
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isAcceptingOrders, autoConfirmTime]);

  const handleToggleAcceptingOrders = async (checked: boolean) => {
    try {
      const response = await updateVendorSettings({ isAcceptingOrders: checked });
      if (response.success) {
        setIsAcceptingOrders(checked);
        toast.success(`Settings Updated — Order acceptance ${checked ? 'enabled' : 'paused'}`);
      }
    } catch (error: any) {
      console.error("Failed to update settings:", error);
      toast.error(error.response?.data?.error || "Failed to update settings");
    }
  };

  const handleAutoConfirmTimeChange = async (value: number) => {
    try {
      const response = await updateVendorSettings({ autoConfirmTime: value });
      if (response.success) {
        setAutoConfirmTime(value);
        toast.success('Auto confirm time updated');
        setShowSettingsDialog(false);
      }
    } catch (error: any) {
      console.error("Failed to update settings:", error);
      toast.error(error.response?.data?.error || "Failed to update auto-confirm time");
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "preparing":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "ready":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "served":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "confirmed":
        return <CheckCircle className="h-3 w-3" />;
      case "preparing":
        return <Zap className="h-3 w-3" />;
      case "ready":
        return <Sparkles className="h-3 w-3" />;
      case "served":
        return <CheckCircle className="h-3 w-3" />;
      case "cancelled":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await updateOrderStatusApi(orderId, newStatus);
      
      if (response.success) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { 
                  ...order, 
                  status: newStatus,
                  progress: newStatus === "confirmed" ? 0 : 
                           newStatus === "preparing" ? 30 : 
                           newStatus === "ready" ? 70 : 
                           newStatus === "served" ? 100 : order.progress
                } 
              : order
          )
        );

        // Refresh stats after status update
        fetchStats();
        fetchRevenueStats('today');

        toast.success(`Status Updated — Order status changed to ${newStatus}`);
      }
    } catch (error: any) {
      console.error("Failed to update status:", error);
      toast.error(error.response?.data?.error || "Failed to update order status");
    }
  };

  const handleCancelOrder = async (orderId: string, reason?: string) => {
    try {
      const response = await cancelOrderApi(orderId, reason);
      
      if (response.success) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: "cancelled", progress: 0 }
              : order
          )
        );

        // Refresh stats after cancellation
        fetchStats();
        fetchRevenueStats('today');

        toast.success("Order Cancelled — The order has been cancelled successfully");
      }
    } catch (error: any) {
      console.error("Failed to cancel order:", error);
      toast.error(error.response?.data?.error || "Failed to cancel order");
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const getTimeUntilAutoConfirm = (timestamp: string) => {
    const timeDiff = (Date.now() - new Date(timestamp).getTime()) / 1000;
    const remaining = autoConfirmTime - timeDiff;
    return Math.max(0, Math.ceil(remaining));
  };

  const calculateProgress = (order: Order) => {
    if (order.progress !== undefined) return order.progress;
    
    switch (order.status) {
      case "confirmed":
        return 0;
      case "preparing":
        return 30;
      case "ready":
        return 70;
      case "served":
        return 100;
      default:
        return 0;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = 
      searchQuery === "" ||
      (order.orderId || order.id || order._id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleRefreshAll = async () => {
    await Promise.all([
      fetchOrders(),
      fetchSettings(),
      fetchStats(),
      fetchRevenueStats('today')
    ]);
  };

  const handlePeriodChange = (period: string) => {
    fetchRevenueStats(period);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
        
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
              <Badge variant="secondary" className={isAcceptingOrders ? "bg-green-500 text-white border-0" : "bg-gray-500 text-white border-0"}>
                {isAcceptingOrders ? (
                  <>
                    <Power className="w-3 h-3 mr-1" />
                    Active
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-3 h-3 mr-1" />
                    Paused
                  </>
                )}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isAcceptingOrders 
                ? `Accepting new orders - System auto-confirms after ${autoConfirmTime}s` 
                : "Not accepting new orders - Customers cannot place orders"
              }
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshAll}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/50 border border-border cursor-help group">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAcceptingOrders}
                      onCheckedChange={handleToggleAcceptingOrders}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <span className={`text-sm font-medium ${isAcceptingOrders ? 'text-green-600' : 'text-muted-foreground'}`}>
                      Accepting Orders
                    </span>
                  </div>
                  <Info className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="backdrop-blur-xl border-border/50 max-w-xs">
                <p>Toggle to allow or prevent customers from placing new orders</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID, table, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value: FilterStatus) => setStatusFilter(value)}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="served">Served</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for switching between views */}
        <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content - Only shown when Overview tab is active */}
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-6 gap-4">
                {[
                  { label: "Total", value: stats.total, color: "text-primary" },
                  { label: "Pending", value: stats.pending, color: "text-yellow-500" },
                  { label: "Confirmed", value: stats.confirmed, color: "text-blue-500" },
                  { label: "Preparing", value: stats.preparing, color: "text-orange-500" },
                  { label: "Ready", value: stats.ready, color: "text-green-500" },
                  { label: "Served", value: stats.served, color: "text-emerald-500" },
                  { label: "Cancelled", value: stats.cancelled, color: "text-red-500" },
                ].map((stat, index) => (
                  <Card key={index} className="p-4 border-border/50 text-center group hover:shadow-md transition-all duration-300">
                    <div className={`text-2xl font-bold ${stat.color} mb-1 transition-transform group-hover:scale-110`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Revenue Statistics */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Revenue Statistics</h4>
                  <div className="flex gap-2">
                    {['today', 'week', 'month'].map((period) => (
                      <Button
                        key={period}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePeriodChange(period)}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">${revenueStats.revenue.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{revenueStats.orderCount}</div>
                    <div className="text-sm text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">${revenueStats.averageOrderValue.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Orders Tab Content - Default view */}
          <TabsContent value="orders" className="mt-4">
            {/* Orders Grid */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order._id}
                  className="p-6 border-border/50 group relative overflow-hidden hover:shadow-md transition-shadow duration-300"
                  onMouseEnter={() => setHoveredOrder(order._id)}
                  onMouseLeave={() => setHoveredOrder(null)}
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    order.status === "pending" ? "bg-yellow-500" :
                    order.status === "confirmed" ? "bg-blue-500" :
                    order.status === "preparing" ? "bg-orange-500" :
                    order.status === "ready" ? "bg-green-500" :
                    order.status === "served" ? "bg-emerald-500" : "bg-red-500"
                  }`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          Order #{order.orderId || order.id || order._id.substring(0, 8)}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(order.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        
                        {/* Auto-confirm Timer for Pending Orders */}
                        {order.status === "pending" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                <Clock className="h-3 w-3 mr-1" />
                                {getTimeUntilAutoConfirm(order.createdAt)}s
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Auto-confirming in {getTimeUntilAutoConfirm(order.createdAt)} seconds</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getTimeAgo(order.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Table {order.tableNumber}
                        </span>
                        {order.customer?.name && (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {order.customer.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            ${item.price.toFixed(2)}
                          </Badge>
                          {item.notes && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{item.notes}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">x{item.quantity}</span>
                          <span className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar for In-Progress Orders */}
                  {(order.status === "confirmed" || order.status === "preparing" || order.status === "ready") && (
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Preparation Progress</span>
                        <span className="font-medium text-primary">{calculateProgress(order)}%</span>
                      </div>
                      <Progress value={calculateProgress(order)} className="h-2" />
                    </div>
                  )}

                  {/* Order Notes */}
                  {order.notes && (
                    <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <p className="text-sm text-yellow-800 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span><strong>Customer Note:</strong> {order.notes}</span>
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              className="flex-1"
                              onClick={() => handleUpdateStatus(order._id, "confirmed")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm Now
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Manually confirm order before auto-confirm timer</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 text-destructive hover:text-destructive"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this order? This action cannot be undone.
                                The customer will be notified of the cancellation.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleCancelOrder(order._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Yes, Cancel Order
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                    
                    {order.status === "confirmed" && (
                      <Button 
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleUpdateStatus(order._id, "preparing")}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Start Preparing
                      </Button>
                    )}
                    
                    {order.status === "preparing" && (
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleUpdateStatus(order._id, "ready")}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Mark as Ready
                      </Button>
                    )}
                    
                    {order.status === "ready" && (
                      <Button 
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => handleUpdateStatus(order._id, "served")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Served
                      </Button>
                    )}
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View order details</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <Card className="p-12 text-center border-border/50">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No orders found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== "all"
                      ? "No orders match your current filters. Try adjusting your search criteria."
                      : isAcceptingOrders 
                      ? "New orders will appear here automatically when customers place them"
                      : "Order acceptance is currently paused. Enable order acceptance to receive new orders."
                    }
                  </p>
                  {(searchQuery || statusFilter !== "all") && (
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                  <DialogDescription>
                    Complete information for order #{selectedOrder.orderId || selectedOrder.id || selectedOrder._id.substring(0, 8)}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Order Information</h4>
                      <div className="space-y-1">
                        <p><span className="font-medium">Order ID:</span> {selectedOrder.orderId || selectedOrder.id || selectedOrder._id.substring(0, 8)}</p>
                        <p><span className="font-medium">Table:</span> {selectedOrder.tableNumber}</p>
                        <p><span className="font-medium">Status:</span> 
                          <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </Badge>
                        </p>
                        <p><span className="font-medium">Created:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        <p><span className="font-medium">Last Updated:</span> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Customer Information</h4>
                      {selectedOrder.customer ? (
                        <div className="space-y-1">
                          <p><span className="font-medium">Name:</span> {selectedOrder.customer.name || "Not provided"}</p>
                          <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone || "Not provided"}</p>
                          <p><span className="font-medium">Email:</span> {selectedOrder.customer.email || "Not provided"}</p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No customer information available</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.notes && (
                              <p className="text-sm text-muted-foreground mt-1">Note: {item.notes}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.price.toFixed(2)} x {item.quantity}</p>
                            <p className="text-primary font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-bold">Total Amount</span>
                        <span className="text-2xl font-bold text-primary">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.notes && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Order Notes</h4>
                      <p className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vendor Settings</DialogTitle>
              <DialogDescription>
                Configure your order management preferences
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="accepting-orders">Accepting Orders</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to place new orders
                    </p>
                  </div>
                  <Switch
                    id="accepting-orders"
                    checked={isAcceptingOrders}
                    onCheckedChange={handleToggleAcceptingOrders}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-confirm-time">Auto-Confirm Time</Label>
                      <p className="text-sm text-muted-foreground">
                        Time before pending orders are automatically confirmed (seconds)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">{tempAutoConfirmTime}s</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Slider
                      value={[tempAutoConfirmTime]}
                      onValueChange={(value) => setTempAutoConfirmTime(value[0])}
                      min={10}
                      max={300}
                      step={5}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>10s</span>
                      <span>5 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAutoConfirmTimeChange(tempAutoConfirmTime)}>
                Save Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}