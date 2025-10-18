import { Clock, CheckCircle, XCircle, Info, Sparkles, Crown, Zap, AlertCircle, ChevronRight, User, MapPin, Power, PauseCircle } from "lucide-react";
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
import { useState, useEffect } from "react";

interface Order {
  id: string;
  table: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "cancelled";
  timestamp: Date;
  customer?: string;
  estimatedTime?: number;
  progress?: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    table: "Table 5",
    customer: "John Smith",
    items: [
      { name: "Classic Burger", quantity: 2, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    status: "pending",
    timestamp: new Date(),
    estimatedTime: 15,
  },
  {
    id: "ORD-002",
    table: "Table 3",
    customer: "Sarah Johnson",
    items: [{ name: "Caesar Salad", quantity: 2, price: 8.99 }],
    total: 17.98,
    status: "confirmed",
    timestamp: new Date(Date.now() - 300000),
    estimatedTime: 10,
    progress: 30,
  },
];

export const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const [autoConfirmTime, setAutoConfirmTime] = useState(30); // seconds

  // Auto-confirm orders after specified time
  useEffect(() => {
    if (!isAcceptingOrders) return;

    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === "pending") {
            const timeDiff = (Date.now() - order.timestamp.getTime()) / 1000;
            if (timeDiff >= autoConfirmTime) {
              return {
                ...order,
                status: "confirmed",
                progress: 0
              };
            }
          }
          return order;
        })
      );
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isAcceptingOrders, autoConfirmTime]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "preparing":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "ready":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "confirmed":
        return <CheckCircle className="h-3 w-3" />;
      case "preparing":
        return <Zap className="h-3 w-3" />;
      case "ready":
        return <Sparkles className="h-3 w-3" />;
      case "cancelled":
        return <XCircle className="h-3 w-3" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            progress: newStatus === "confirmed" ? 0 : newStatus === "preparing" ? 30 : newStatus === "ready" ? 100 : order.progress
          } 
        : order
    ));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "cancelled", progress: 0 }
        : order
    ));
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes === 1) return "1 min ago";
    return `${minutes} mins ago`;
  };

  const getTimeUntilAutoConfirm = (timestamp: Date) => {
    const timeDiff = (Date.now() - timestamp.getTime()) / 1000;
    const remaining = autoConfirmTime - timeDiff;
    return Math.max(0, Math.ceil(remaining));
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
              <Badge variant="secondary" className={isAcceptingOrders ? "premium-gradient text-white border-0" : "bg-gray-500 text-white border-0"}>
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
                ? "Accepting new orders - System auto-confirms after 30s" 
                : "Not accepting new orders - Customers cannot place orders"
              }
            </p>
          </div>
          
          {/* Order Acceptance Toggle */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/50 border border-border cursor-help group">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isAcceptingOrders}
                      onCheckedChange={setIsAcceptingOrders}
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

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: orders.length, color: "text-primary" },
            { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "text-yellow-500" },
            { label: "In Progress", value: orders.filter(o => o.status === "confirmed" || o.status === "preparing").length, color: "text-blue-500" },
            { label: "Completed", value: orders.filter(o => o.status === "ready").length, color: "text-green-500" },
          ].map((stat, index) => (
            <Card key={index} className="glass p-4 border-border/50 text-center group hover-lift transition-all duration-300">
              <div className={`text-2xl font-bold ${stat.color} mb-1 transition-transform group-hover:scale-110`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="glass p-6 border-border/50 animate-slide-up transition-all duration-300 group relative overflow-hidden"
              onMouseEnter={() => setHoveredOrder(order.id)}
              onMouseLeave={() => setHoveredOrder(null)}
            >
              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-0 w-1 h-full ${
                order.status === "pending" ? "bg-yellow-500" :
                order.status === "confirmed" ? "bg-blue-500" :
                order.status === "preparing" ? "bg-orange-500" :
                order.status === "ready" ? "bg-green-500" : "bg-red-500"
              }`} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {order.id}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(order.status)} flex items-center gap-1 transition-all duration-300 group-hover:scale-105`}
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
                            {getTimeUntilAutoConfirm(order.timestamp)}s
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="backdrop-blur-xl">
                          <p>Auto-confirming in {getTimeUntilAutoConfirm(order.timestamp)} seconds</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getTimeAgo(order.timestamp)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {order.table}
                    </span>
                    {order.customer && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {order.customer}
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
                    className="flex items-center justify-between text-sm p-3 rounded-xl bg-muted/30 transition-all duration-200 hover:bg-muted/50 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        ${item.price}
                      </Badge>
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
              {(order.status === "confirmed" || order.status === "preparing") && order.progress !== undefined && (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Preparation Progress</span>
                    <span className="font-medium text-primary">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2 rounded-full" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {order.status === "pending" && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          className="flex-1 rounded-2xl premium-gradient transition-all duration-300 hover:scale-105 group/confirm"
                          onClick={() => updateOrderStatus(order.id, "confirmed")}
                        >
                          <CheckCircle className="h-4 w-4 mr-2 transition-transform group-hover/confirm:scale-110" />
                          Confirm Now
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>Manually confirm order before auto-confirm timer</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 rounded-2xl text-destructive hover:text-destructive transition-all duration-300 hover:scale-105 group/cancel"
                          onClick={() => cancelOrder(order.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2 transition-transform group-hover/cancel:scale-110" />
                          Cancel Order
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>Cancel this order and notify the customer</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
                
                {order.status === "confirmed" && (
                  <Button 
                    className="flex-1 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-105"
                    onClick={() => updateOrderStatus(order.id, "preparing")}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Start Preparing
                  </Button>
                )}
                
                {order.status === "preparing" && (
                  <Button 
                    className="flex-1 rounded-2xl bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105"
                    onClick={() => updateOrderStatus(order.id, "ready")}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Mark as Ready
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="glass p-12 text-center border-border/50">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto premium-gradient rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">No orders yet</h3>
              <p className="text-muted-foreground">
                {isAcceptingOrders 
                  ? "New orders will appear here automatically when customers place them"
                  : "Order acceptance is currently paused. Enable order acceptance to receive new orders."
                }
              </p>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};