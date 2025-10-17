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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Dashboard = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "₹31,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Orders Today",
      value: "127",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      title: "Active Customers",
      value: "1,247",
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Avg Order Value",
      value: "₹247",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  const recentOrders = [
    { id: "#ORD-1234", table: "Table 5", items: 3, amount: "₹850", status: "completed", time: "2 mins ago" },
    { id: "#ORD-1235", table: "Table 12", items: 2, amount: "₹620", status: "pending", time: "5 mins ago" },
    { id: "#ORD-1236", table: "Table 3", items: 5, amount: "₹1,250", status: "completed", time: "8 mins ago" },
    { id: "#ORD-1237", table: "Table 8", items: 4, amount: "₹980", status: "pending", time: "12 mins ago" },
    { id: "#ORD-1238", table: "Table 15", items: 2, amount: "₹450", status: "cancelled", time: "15 mins ago" },
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
      completed: "bg-primary/10 text-primary",
      pending: "bg-orange-500/10 text-orange-500",
      cancelled: "bg-destructive/10 text-destructive",
    };
    return variants[status as keyof typeof variants] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover-lift backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-primary border-primary/20">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{order.id}</p>
                        <Badge className={`text-xs ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.table} • {order.items} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order Completion Rate</span>
                  <span className="text-sm font-semibold">94.5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '94.5%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Table Occupancy</span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                  <span className="text-sm font-semibold">96.8%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full" style={{ width: '96.8%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Prep Time</span>
                  <span className="text-sm font-semibold">12 mins</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Items & Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Popular Items */}
        <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-6">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Margherita Pizza", orders: 48, revenue: "₹9,600" },
                { name: "Chicken Burger", orders: 42, revenue: "₹6,720" },
                { name: "Caesar Salad", orders: 38, revenue: "₹5,320" },
                { name: "Pasta Carbonara", orders: 35, revenue: "₹6,300" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                  <p className="font-semibold text-primary">{item.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="backdrop-blur-xl bg-card/50 border-border/50 animate-slide-up stagger-7">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">All Systems Operational</p>
                  <p className="text-xs text-muted-foreground">All services running smoothly</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Menu Update Available</p>
                  <p className="text-xs text-muted-foreground">3 items need price updates</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Peak Hours Approaching</p>
                  <p className="text-xs text-muted-foreground">Expect high order volume at 7 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
