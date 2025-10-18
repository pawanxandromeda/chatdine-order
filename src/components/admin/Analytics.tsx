import { TrendingUp, DollarSign, ShoppingBag, Users, Crown, Sparkles, BarChart3, Target, Calendar, Download, MoreHorizontal, Info, Zap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
    bgGradient: "from-green-500/10 to-green-500/5",
    info: "Total revenue including all orders and services"
  },
  {
    title: "Total Orders",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-blue-500",
    bgGradient: "from-blue-500/10 to-blue-500/5",
    info: "Number of orders processed this period"
  },
  {
    title: "Active Tables",
    value: "18/25",
    change: "72%",
    trend: "stable",
    icon: Users,
    color: "text-purple-500",
    bgGradient: "from-purple-500/10 to-purple-500/5",
    info: "Current table occupancy rate and capacity"
  },
  {
    title: "Popular Item",
    value: "Classic Burger",
    change: "156 orders",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-500",
    bgGradient: "from-orange-500/10 to-orange-500/5",
    info: "Most ordered item with total order count"
  },
];

const chartData = [
  { day: "Mon", revenue: 3200, orders: 45 },
  { day: "Tue", revenue: 4200, orders: 52 },
  { day: "Wed", revenue: 3800, orders: 48 },
  { day: "Thu", revenue: 5100, orders: 61 },
  { day: "Fri", revenue: 6800, orders: 78 },
  { day: "Sat", revenue: 8200, orders: 94 },
  { day: "Sun", revenue: 7400, orders: 86 },
];

export const Analytics = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week");
  const [chartType, setChartType] = useState<"revenue" | "orders">("revenue");

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const maxOrders = Math.max(...chartData.map(d => d.orders));

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
              <Badge variant="secondary" className="premium-gradient text-white border-0">
                <BarChart3 className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced insights and performance analytics for your restaurant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="rounded-2xl gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent className="backdrop-blur-xl">
                <p>Download analytics report as PDF</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="glass p-6 border-border/50 animate-slide-up group relative overflow-hidden transition-all duration-300 hover-lift"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        variant="outline" 
                        className={`text-xs transition-all duration-300 group-hover:scale-105 cursor-help ${
                          stat.trend === "up" ? "text-green-500 border-green-500/20" :
                          stat.trend === "down" ? "text-red-500 border-red-500/20" :
                          "text-blue-500 border-blue-500/20"
                        }`}
                      >
                        {stat.change}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl max-w-xs">
                      <p>{stat.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className={`text-xs flex items-center gap-1 ${
                  stat.trend === "up" ? "text-green-500" :
                  stat.trend === "down" ? "text-red-500" : "text-blue-500"
                }`}>
                  {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <Card className="glass p-6 border-border/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
          
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Chart Type Toggle */}
              <div className="flex bg-muted/50 rounded-xl p-1">
                {[
                  { key: "revenue", label: "Revenue", icon: DollarSign },
                  { key: "orders", label: "Orders", icon: ShoppingBag }
                ].map((type) => (
                  <Tooltip key={type.key}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={chartType === type.key ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setChartType(type.key as any)}
                        className={`rounded-lg gap-2 transition-all duration-200 ${
                          chartType === type.key ? "premium-gradient text-white shadow-lg" : ""
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <p>View {type.label.toLowerCase()} analytics</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Time Range Selector */}
              <div className="flex bg-muted/50 rounded-xl p-1">
                {[
                  { key: "week", label: "Week" },
                  { key: "month", label: "Month" },
                  { key: "quarter", label: "Quarter" }
                ].map((range) => (
                  <Button
                    key={range.key}
                    variant={timeRange === range.key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range.key as any)}
                    className={`rounded-lg transition-all duration-200 ${
                      timeRange === range.key ? "bg-primary text-white shadow-lg" : ""
                    }`}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl w-8 h-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="backdrop-blur-xl">
                  <p>More chart options</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="h-64 flex flex-col">
            {/* Chart Bars */}
            <div className="flex-1 flex items-end justify-between gap-2 pb-8">
              {chartData.map((data, index) => {
                const value = chartType === "revenue" ? data.revenue : data.orders;
                const maxValue = chartType === "revenue" ? maxRevenue : maxOrders;
                const height = (value / maxValue) * 100;
                
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center flex-1 group cursor-pointer">
                        <div className="relative w-full flex justify-center">
                          <div
                            className={`w-3/4 rounded-t-lg transition-all duration-500 ease-out group-hover:scale-110 ${
                              chartType === "revenue" 
                                ? "bg-gradient-to-t from-primary to-accent" 
                                : "bg-gradient-to-t from-blue-500 to-purple-500"
                            }`}
                            style={{ height: `${height}%` }}
                          >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 font-medium">
                          {data.day}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="backdrop-blur-xl">
                      <div className="text-center">
                        <p className="font-semibold">{data.day}</p>
                        <p>{chartType === "revenue" ? `$${data.revenue}` : `${data.orders} orders`}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Chart Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Last 7 days</span>
              </div>
              <Badge variant="outline" className="text-primary border-primary/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2% vs last week
              </Badge>
            </div>
          </div>
        </Card>

        {/* Additional Analytics Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <Card className="glass p-6 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/50 to-primary/20" />
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Top Categories</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: "Burgers", revenue: "$4,280", growth: "+18%", color: "from-orange-500 to-red-500" },
                { name: "Pizza", revenue: "$3,150", growth: "+12%", color: "from-yellow-500 to-orange-500" },
                { name: "Salads", revenue: "$2,430", growth: "+25%", color: "from-green-500 to-emerald-500" },
                { name: "Drinks", revenue: "$1,890", growth: "+8%", color: "from-blue-500 to-cyan-500" },
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.revenue}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/20">
                    {category.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="glass p-6 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/20" />
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
            </div>
            <div className="space-y-4">
              {[
                { metric: "Average Order Value", value: "$36.42", change: "+5.3%", trend: "up" },
                { metric: "Table Turnover Rate", value: "2.8x", change: "+12%", trend: "up" },
                { metric: "Customer Satisfaction", value: "4.8/5", change: "+0.2", trend: "up" },
                { metric: "Peak Hour Efficiency", value: "87%", change: "-3%", trend: "down" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className="text-right">
                    <p className="font-semibold">{item.value}</p>
                    <p className={`text-xs flex items-center gap-1 justify-end ${
                      item.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {item.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};