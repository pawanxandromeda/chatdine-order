import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Total Orders",
    value: "342",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "text-blue-500",
  },
  {
    title: "Active Tables",
    value: "18/25",
    change: "72%",
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "Popular Item",
    value: "Classic Burger",
    change: "156 orders",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track your restaurant performance
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="glass p-6 border-border/50 animate-slide-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </Card>
        ))}
      </div>

      <Card className="glass p-6 border-border/50">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <p>Chart visualization will be displayed here</p>
        </div>
      </Card>
    </div>
  );
};
