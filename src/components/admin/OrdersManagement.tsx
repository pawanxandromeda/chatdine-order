import { Clock, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Order {
  id: string;
  table: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  timestamp: Date;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    table: "Table 5",
    items: [
      { name: "Classic Burger", quantity: 2 },
      { name: "Caesar Salad", quantity: 1 },
    ],
    total: 34.97,
    status: "pending",
    timestamp: new Date(),
  },
  {
    id: "ORD-002",
    table: "Table 3",
    items: [{ name: "Caesar Salad", quantity: 2 }],
    total: 17.98,
    status: "confirmed",
    timestamp: new Date(Date.now() - 300000),
  },
];

export const OrdersManagement = () => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time order tracking and management
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Orders update in real-time as customers place them</p>
            </TooltipContent>
          </Tooltip>
        </div>

      <div className="grid gap-4">
        {mockOrders.map((order) => (
          <Card
            key={order.id}
            className="glass p-6 border-border/50 animate-slide-up hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{order.id}</h3>
                  <Badge
                    variant="outline"
                    className={getStatusColor(order.status)}
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {order.timestamp.toLocaleTimeString()}
                  </span>
                  <span>{order.table}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm p-3 rounded-xl bg-muted/30"
                >
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">x{item.quantity}</span>
                </div>
              ))}
            </div>

            {order.status === "pending" && (
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="flex-1 rounded-2xl premium-gradient">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Accept and start preparing this order</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-2xl text-destructive hover:text-destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reject this order</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </Card>
        ))}
      </div>
      </div>
    </TooltipProvider>
  );
};
