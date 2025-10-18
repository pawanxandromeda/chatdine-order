import { LayoutDashboard, UtensilsCrossed, ShoppingBag, CreditCard, QrCode, BarChart3, Crown, ChevronRight, Sparkles, Zap, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin", tab: "dashboard" },
  { icon: UtensilsCrossed, label: "Menu", path: "/admin", tab: "menu" },
  { icon: ShoppingBag, label: "Orders", path: "/admin", tab: "orders" },
  { icon: CreditCard, label: "Payments", path: "/admin", tab: "payments" },
  { icon: QrCode, label: "QR Codes", path: "/admin", tab: "qr" },
  { icon: BarChart3, label: "Analytics", path: "/admin", tab: "analytics" },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const expandedWidth = "w-72 lg:w-64"; // slightly wider on large screens for better spacing
  const collapsedWidth = "w-20";

  return (
    <>
      <aside
      // Make this sidebar fixed to the viewport so it never scrolls with page content
      className={cn(
        "fixed  left-0 top-0 h-screen z-50 bg-card/95 backdrop-blur-xl rounded-r-[45px] border-r border-border/50 transition-all duration-500 ease-out overflow-hidden group/sidebar",
        // Use transform-based width animation for smoother GPU-accelerated transitions
        isCollapsed ? `translate-x-0 ${collapsedWidth}` : `translate-x-0 ${expandedWidth}`,
        isHovered && !isCollapsed && "shadow-2xl shadow-primary/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveHover(null);
      }}
      aria-label="Admin sidebar"
      role="navigation"
    >
      {/* Header */}
      <div className="p-6 border-b border-border/30 relative z-10">
        {isCollapsed ? (
          <div className="relative flex items-center justify-center">
            {/* Subtle Animated Background for Collapsed State */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-50 group-hover/sidebar:opacity-70 transition-opacity duration-700 backdrop-blur-sm rounded-b-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow" />
            </div>
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className={cn(
                "w-12 h-12 mx-auto rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-xl group/toggle relative overflow-hidden",
                "border border-white/20"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 scale-0 group-hover/toggle:scale-100 transition-transform duration-500" />
              <ChevronRight
                className={cn(
                  "w-6 h-6 text-black transition-transform duration-300 group-hover/toggle:scale-125",
                  "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                )}
              />
              <Sparkles
                className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover/toggle:scale-100 transition-transform duration-500 rounded-2xl" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 transition-all duration-500">
            <div
              className={cn(
                "w-10 h-10 rounded-xl premium-gradient flex items-center justify-center transition-all duration-500 relative overflow-hidden group/logo",
                isHovered && "scale-105 shadow-lg"
              )}
            >
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover/logo:scale-100 transition-transform duration-500" />
              <span className="text-white font-bold text-xl relative z-10">M</span>
              <Sparkles
                className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div
              className={cn(
                "transition-all duration-500 overflow-hidden",
                isCollapsed ? "w-0 opacity-0 scale-95" : "w-auto opacity-100 scale-100"
              )}
            >
              <h1 className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent tracking-tight">
                Mevoo
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Restaurant SaaS</p>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
              className={cn(
                "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 mr-4 rounded-full border border-border/80 bg-card/80 backdrop-blur-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-xl group/toggle z-20 shadow-lg",
                isCollapsed ? "rotate-180 bg-primary/10 border-primary/20" : "hover:bg-primary/10 hover:border-primary/30"
              )}
            >
              <ChevronLeft
                className={cn(
                  "w-4 h-4 transition-all duration-500",
                  isCollapsed ? "text-primary" : "text-muted-foreground group-hover/toggle:text-primary"
                )}
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover/toggle:scale-100 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          const isItemHovered = activeHover === item.tab;

          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              onMouseEnter={() => setActiveHover(item.tab)}
              onMouseLeave={() => setActiveHover(null)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl relative overflow-hidden group/nav-item",
                // prefer transform and opacity changes for fluidity
                "transition-transform duration-300 ease-out",
                isActive
                  ? "premium-gradient text-white shadow-2xl scale-[1.03] border border-primary/20"
                  : "hover:bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent hover:border-primary/10"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 transition-all duration-700",
                  isItemHovered && !isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
                  isActive && "opacity-0"
                )}
              />
              <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover/nav-item:scale-100 transition-transform duration-500 opacity-0 group-hover/nav-item:opacity-100" />
              <div
                className={cn(
                  "relative z-10 transition-transform duration-300 flex-shrink-0",
                  isActive && "scale-110",
                  isItemHovered && !isActive && "scale-105"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-500",
                    isActive && "text-white drop-shadow-lg",
                    isItemHovered && !isActive && "text-primary"
                  )}
                />
                {isActive && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full border border-primary shadow-sm" />
                )}
              </div>
              <div
                className={cn(
                  "flex items-center justify-between flex-1 overflow-hidden",
                  // smoother fade/width animation for the label
                  isCollapsed ? "w-0 opacity-0 scale-95" : "w-auto opacity-100 scale-100 transition-all duration-300"
                )}
              >
                <span
                  className={cn(
                    "font-medium text-sm transition-all duration-500 relative",
                    isActive && "font-semibold"
                  )}
                >
                  {item.label}
                </span>
              </div>
              {isCollapsed && (
                <div
                  role="tooltip"
                  className="absolute left-full ml-3 px-3 py-2 bg-foreground/95 backdrop-blur-xl text-background text-sm rounded-xl opacity-0 group-hover/nav-item:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl border border-border/50"
                >
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              )}
              {isItemHovered && !isActive && !isCollapsed && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Enhanced Upgrade Card */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 border-t border-border/30 bg-card/80 backdrop-blur-xl transition-all duration-500 z-10",
          isCollapsed ? "translate-y-20 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
        )}
      >
        <div className="p-4 rounded-2xl glass border border-primary/30 relative overflow-hidden group/upgrade">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover/upgrade:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="relative">
              <Crown className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Pro Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 relative z-10 leading-relaxed">
            Unlimited orders & premium features
          </p>
          <Link to="/pricing">
            <button className="w-full py-2.5 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all duration-500 hover:scale-[1.02] relative z-10 group/btn overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 scale-0 group-hover/btn:scale-100 transition-transform duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:gap-3 transition-all duration-300">
                Upgrade Plan
                <Zap className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Enhanced Collapsed Upgrade Hint */}
      {isCollapsed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <Link to="/pricing">
            <button className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl group/collapsed-upgrade relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover/collapsed-upgrade:scale-100 transition-transform duration-500" />
              <Crown className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover/collapsed-upgrade:scale-110" />
            </button>
          </Link>
        </div>
      )}

      {/* Enhanced Interactive Border Glow */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary transition-all duration-1000",
          isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        )}
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
    </aside>
      {/* Spacer so content sits to the right of the fixed sidebar */}
      <div
        aria-hidden
        className={cn(
          isCollapsed ? collapsedWidth : expandedWidth,
          // hide on very small screens if you prefer responsive collapsing
          "flex-shrink-0"
        )}
      />
    </>
  );
};