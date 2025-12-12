import { TrendingUp, DollarSign, ShoppingBag, Users, Crown, Sparkles, BarChart3, Target, Calendar, Download, MoreHorizontal, Info, Zap, Award, Clock, XCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect, useMemo } from "react";
import { api } from "@/api/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

// Types based on your API response
interface OverviewData {
  revenue: number;
  orderCount: number;
  paidCount: number;
  cancelled: number;
  avgOrder: number;
  paidRate: number;
  cancelledRate: number;
}

interface TopMenu {
  _id: string;
  name: string;
  qty: number;
  revenue: number;
}

interface RevenueSeries {
  _id: string;
  revenue: number;
  orderCount: number;
}

interface AnalyticsData {
  overview: OverviewData | null;
  topMenus: TopMenu[];
  revenueSeries: RevenueSeries[];
  loading: boolean;
}

const initialAnalyticsData: AnalyticsData = {
  overview: null,
  topMenus: [],
  revenueSeries: [],
  loading: true
};

export const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalyticsData);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "year">("today");
  const [chartType, setChartType] = useState<"revenue" | "orders">("revenue");
  const [menuLimit, setMenuLimit] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  // Fetch analytics data
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, menuLimit]);

  const fetchAnalyticsData = async () => {
    setAnalytics(prev => ({ ...prev, loading: true }));
    setError(null);
    
    try {
      const [overviewRes, topMenusRes, revenueSeriesRes] = await Promise.all([
        api.get(`/analytics/overview?period=${timeRange}`),
        api.get(`/analytics/top-menus?period=month&limit=${menuLimit}`),
        api.get(`/analytics/revenue-series?period=${timeRange === 'today' ? 'week' : timeRange}`)
      ]);

      console.log('API Responses:', {
        overview: overviewRes.data,
        topMenus: topMenusRes.data,
        revenueSeries: revenueSeriesRes.data
      });

      setAnalytics({
        overview: overviewRes.data.data,
        topMenus: topMenusRes.data.data,
        revenueSeries: revenueSeriesRes.data.data,
        loading: false
      });
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      setError(error.response?.data?.error || 'Failed to fetch analytics data');
      setAnalytics(prev => ({ ...prev, loading: false }));
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate percentage change (mock - in real app, you'd compare with previous period)
  const calculatePercentageChange = (current: number, previous: number = current * 0.8) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Prepare stats data from overview
  const getStats = () => {
    if (!analytics.overview || analytics.loading) {
      return Array(4).fill(null).map((_, idx) => ({
        title: ["Total Revenue", "Total Orders", "Paid Orders", "Cancelled Orders"][idx],
        value: "$0",
        change: "+0%",
        trend: "stable",
        icon: [DollarSign, ShoppingBag, CheckCircle, XCircle][idx],
        color: ["text-green-500", "text-blue-500", "text-emerald-500", "text-red-500"][idx],
        bgGradient: [
          "from-green-500/10 to-green-500/5",
          "from-blue-500/10 to-blue-500/5",
          "from-emerald-500/10 to-emerald-500/5",
          "from-red-500/10 to-red-500/5"
        ][idx],
        info: [
          "Total revenue including all orders and services",
          "Number of orders processed this period",
          "Number of successfully paid orders",
          "Number of cancelled orders"
        ][idx]
      }));
    }

    const { revenue, orderCount, paidCount, cancelled } = analytics.overview;
    
    return [
      {
        title: "Total Revenue",
        value: formatCurrency(revenue),
        change: `${revenue > 0 ? '+' : ''}${calculatePercentageChange(revenue).toFixed(1)}%`,
        trend: revenue > 0 ? "up" : "stable",
        icon: DollarSign,
        color: "text-green-500",
        bgGradient: "from-green-500/10 to-green-500/5",
        info: `Total revenue: ${formatCurrency(revenue)}`
      },
      {
        title: "Total Orders",
        value: orderCount.toString(),
        change: `${orderCount > 0 ? '+' : ''}${calculatePercentageChange(orderCount).toFixed(1)}%`,
        trend: orderCount > 0 ? "up" : "stable",
        icon: ShoppingBag,
        color: "text-blue-500",
        bgGradient: "from-blue-500/10 to-blue-500/5",
        info: `Total orders: ${orderCount}`
      },
      {
        title: "Paid Orders",
        value: paidCount.toString(),
        change: `${(analytics.overview.paidRate * 100).toFixed(1)}% rate`,
        trend: "up",
        icon: CheckCircle,
        color: "text-emerald-500",
        bgGradient: "from-emerald-500/10 to-emerald-500/5",
        info: `Paid orders: ${paidCount} (${(analytics.overview.paidRate * 100).toFixed(1)}% success rate)`
      },
      {
        title: "Cancelled Orders",
        value: cancelled.toString(),
        change: `${(analytics.overview.cancelledRate * 100).toFixed(1)}% rate`,
        trend: cancelled > 0 ? "down" : "stable",
        icon: XCircle,
        color: cancelled > 0 ? "text-red-500" : "text-gray-500",
        bgGradient: cancelled > 0 ? "from-red-500/10 to-red-500/5" : "from-gray-500/10 to-gray-500/5",
        info: `Cancelled orders: ${cancelled} (${(analytics.overview.cancelledRate * 100).toFixed(1)}% cancellation rate)`
      }
    ];
  };

  // Prepare chart data from revenue series - using useMemo for optimization
  const chartData = useMemo(() => {
    if (!analytics.revenueSeries || analytics.revenueSeries.length === 0 || analytics.loading) {
      // Return mock data for empty state
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days.map(day => ({
        day,
        revenue: 0,
        orders: 0
      }));
    }

    console.log('Processing revenue series:', analytics.revenueSeries);

    // Ensure data is sorted by date
    const sortedSeries = [...analytics.revenueSeries].sort((a, b) => {
      return new Date(a._id).getTime() - new Date(b._id).getTime();
    });

    return sortedSeries.map((item, idx) => {
      let label = "";
      
      if (timeRange === 'year') {
        // Format: "Jan", "Feb", etc.
        const date = new Date(item._id);
        label = date.toLocaleDateString('en-US', { month: 'short' });
      } else if (timeRange === 'month' || timeRange === 'week') {
        // Format as date or day name
        try {
          const date = new Date(item._id);
          label = date.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
        } catch (e) {
          label = `Day ${idx + 1}`;
        }
      } else {
        // For today or other cases, use simple labels
        label = `Period ${idx + 1}`;
      }

      return {
        day: label,
        revenue: item.revenue || 0,
        orders: item.orderCount || 0,
        rawDate: item._id
      };
    });
  }, [analytics.revenueSeries, analytics.loading, timeRange]);

  // Calculate max values for chart scaling
  const maxValues = useMemo(() => {
    if (chartData.length === 0) {
      return { maxRevenue: 100, maxOrders: 10, maxValue: 100 };
    }

    const maxRevenue = Math.max(...chartData.map(d => d.revenue));
    const maxOrders = Math.max(...chartData.map(d => d.orders));
    const maxValue = chartType === "revenue" ? maxRevenue : maxOrders;

    // Ensure we have a minimum max value for visual representation
    return {
      maxRevenue: maxRevenue > 0 ? maxRevenue : 100,
      maxOrders: maxOrders > 0 ? maxOrders : 10,
      maxValue: maxValue > 0 ? maxValue : (chartType === "revenue" ? 100 : 10)
    };
  }, [chartData, chartType]);

  const stats = getStats();

  // Debug view
  useEffect(() => {
    console.log('Chart data state:', {
      chartData,
      maxValues,
      revenueSeries: analytics.revenueSeries,
      hasData: analytics.revenueSeries.length > 0,
      loading: analytics.loading
    });
  }, [chartData, maxValues, analytics]);

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
                {analytics.loading ? 'Loading...' : 'Live'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced insights and performance analytics for your restaurant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-2xl gap-2"
                  onClick={fetchAnalyticsData}
                  disabled={analytics.loading}
                >
                  {analytics.loading ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {analytics.loading ? "Refreshing..." : "Refresh"}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="backdrop-blur-xl">
                <p>Refresh analytics data</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-500 text-sm">Error: {error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={fetchAnalyticsData}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="p-4 text-xs">
            <details>
              <summary className="cursor-pointer">Debug Info</summary>
              <pre className="mt-2 overflow-auto max-h-40">
                {JSON.stringify({
                  hasRevenueSeries: analytics.revenueSeries.length,
                  revenueSeries: analytics.revenueSeries,
                  chartDataLength: chartData.length,
                  maxValues,
                  timeRange,
                  chartType
                }, null, 2)}
              </pre>
            </details>
          </Card>
        )}

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
              {analytics.loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ) : (
                <>
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
                      {stat.trend === "down" && <TrendingUp className="w-3 h-3 rotate-180" />}
                      {stat.change}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </>
              )}
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
              <h3 className="text-lg font-semibold">
                {chartType === "revenue" ? "Revenue Overview" : "Orders Overview"}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex bg-muted/50 rounded-xl p-1">
                {[
                  { key: "today", label: "Today" },
                  { key: "week", label: "Week" },
                  { key: "month", label: "Month" },
                  { key: "year", label: "Year" }
                ].map((range) => (
                  <Button
                    key={range.key}
                    variant={timeRange === range.key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range.key as any)}
                    className={`rounded-lg transition-all duration-200 ${
                      timeRange === range.key ? "premium-gradient text-white shadow-lg" : ""
                    }`}
                    disabled={analytics.loading}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

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
                        disabled={analytics.loading}
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

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl w-8 h-8"
                    onClick={fetchAnalyticsData}
                    disabled={analytics.loading}
                  >
                    {analytics.loading ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <MoreHorizontal className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="backdrop-blur-xl">
                  <p>Refresh data</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="h-64 flex flex-col">
            {analytics.loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div className="flex items-end justify-between gap-2 h-48">
                    {Array(7).fill(null).map((_, idx) => (
                      <Skeleton key={idx} className="w-1/7 h-32" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Chart Bars */}
                <div className="flex-1 flex items-end justify-between gap-2 pb-8">
                  {chartData.map((data, index) => {
                    const value = chartType === "revenue" ? data.revenue : data.orders;
                    const height = maxValues.maxValue > 0 ? 
                      Math.max((value / maxValues.maxValue) * 80, 4) : 4; // Minimum 4px height for visibility
                    
                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center flex-1 group cursor-pointer h-full">
                            <div className="relative w-full flex justify-center h-full items-end">
                              <div
                                className={`w-3/4 rounded-t-lg transition-all duration-500 ease-out group-hover:scale-110 min-h-[4px] ${
                                  chartType === "revenue" 
                                    ? "bg-gradient-to-t from-primary to-accent" 
                                    : "bg-gradient-to-t from-blue-500 to-purple-500"
                                }`}
                                style={{ 
                                  height: `${height}%`,
                                  minHeight: '4px'
                                }}
                              >
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground mt-2 font-medium truncate max-w-full">
                              {data.day}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="backdrop-blur-xl">
                          <div className="text-center">
                            <p className="font-semibold">{data.day}</p>
                            <p className="text-lg">
                              {chartType === "revenue" ? formatCurrency(data.revenue) : `${data.orders} orders`}
                            </p>
                            {chartType === "revenue" && data.orders > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {data.orders} orders
                              </p>
                            )}
                            {chartType === "orders" && data.revenue > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(data.revenue)} revenue
                              </p>
                            )}
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
                    <span>
                      {timeRange === 'today' ? 'Today' : 
                       timeRange === 'week' ? 'Last 7 days' : 
                       timeRange === 'month' ? 'Last 30 days' : 'Last 12 months'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {chartData.length > 0 && (
                      <Badge variant="outline" className="text-primary border-primary/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {chartData.length} data points
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Empty State */}
                {chartData.every(d => d.revenue === 0 && d.orders === 0) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No data available for this period</p>
                      <p className="text-sm">Try selecting a different time range</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Additional Analytics Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Menus */}
          <Card className="glass p-6 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/50 to-primary/20" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold">Top Performing Menus</h3>
              </div>
              <select 
                value={menuLimit}
                onChange={(e) => setMenuLimit(Number(e.target.value))}
                className="text-sm bg-background border rounded-lg px-2 py-1"
                disabled={analytics.loading}
              >
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
                <option value="15">Top 15</option>
                <option value="20">Top 20</option>
              </select>
            </div>
            {analytics.loading ? (
              <div className="space-y-4">
                {Array(5).fill(null).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : analytics.topMenus.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No menu data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analytics.topMenus.map((menu, index) => (
                  <div key={menu._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${
                        index === 0 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                        index === 1 ? "bg-gradient-to-r from-gray-400 to-gray-300" :
                        index === 2 ? "bg-gradient-to-r from-amber-700 to-amber-600" :
                        "bg-gradient-to-r from-primary/20 to-accent/20"
                      } flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{menu.name}</p>
                        <p className="text-xs text-muted-foreground">{menu.qty} items sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(menu.revenue)}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Performance Metrics */}
          <Card className="glass p-6 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/20" />
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
            </div>
            {analytics.loading ? (
              <div className="space-y-4">
                {Array(4).fill(null).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3">
                    <Skeleton className="h-3 w-32" />
                    <div className="space-y-2 text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                      <Skeleton className="h-2 w-12 ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !analytics.overview ? (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No performance data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { 
                    metric: "Average Order Value", 
                    value: formatCurrency(analytics.overview.avgOrder),
                    change: `${analytics.overview.avgOrder > 0 ? '+' : ''}${calculatePercentageChange(analytics.overview.avgOrder).toFixed(1)}%`,
                    trend: analytics.overview.avgOrder > 0 ? "up" as const : "stable" as const
                  },
                  { 
                    metric: "Payment Success Rate", 
                    value: `${(analytics.overview.paidRate * 100).toFixed(1)}%`,
                    change: analytics.overview.paidRate > 0.8 ? "+Excellent" : analytics.overview.paidRate > 0.6 ? "+Good" : "+Needs improvement",
                    trend: analytics.overview.paidRate > 0.8 ? "up" as const : analytics.overview.paidRate > 0.6 ? "stable" as const : "down" as const
                  },
                  { 
                    metric: "Cancellation Rate", 
                    value: `${(analytics.overview.cancelledRate * 100).toFixed(1)}%`,
                    change: analytics.overview.cancelledRate < 0.1 ? "-Low" : analytics.overview.cancelledRate < 0.2 ? "-Moderate" : "-High",
                    trend: analytics.overview.cancelledRate < 0.1 ? "up" as const : analytics.overview.cancelledRate < 0.2 ? "stable" as const : "down" as const
                  },
                  { 
                    metric: "Revenue Efficiency", 
                    value: analytics.overview.orderCount > 0 ? formatCurrency(analytics.overview.revenue / analytics.overview.orderCount) : "$0",
                    change: `${analytics.overview.orderCount > 0 ? '+' : ''}${calculatePercentageChange(analytics.overview.avgOrder).toFixed(1)}%`,
                    trend: analytics.overview.avgOrder > 0 ? "up" as const : "stable" as const
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="text-right">
                      <p className="font-semibold">{item.value}</p>
                      <p className={`text-xs flex items-center gap-1 justify-end ${
                        item.trend === "up" ? "text-green-500" : 
                        item.trend === "down" ? "text-red-500" : "text-blue-500"
                      }`}>
                        {item.trend === "up" && <TrendingUp className="w-3 h-3" />}
                        {item.trend === "down" && <TrendingUp className="w-3 h-3 rotate-180" />}
                        {item.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};