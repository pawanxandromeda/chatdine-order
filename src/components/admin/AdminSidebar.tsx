import { LayoutDashboard, UtensilsCrossed, ShoppingBag, CreditCard, QrCode, BarChart3, Crown, ChevronRight, Sparkles, Zap, ChevronLeft, Utensils, TentIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FoodBankRounded, QrCode2 } from "@mui/icons-material";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin", tab: "dashboard" },
  { icon: ShoppingBag, label: "Orders", path: "/admin", tab: "orders" },
  { icon: BarChart3, label: "Analytics", path: "/admin", tab: "analytics" },
  { icon: UtensilsCrossed, label: "Menu", path: "/admin", tab: "menu" },
  { icon: QrCode2, label: "QR Codes", path: "/admin", tab: "qr" },
  { icon: CreditCard, label: "Payments", path: "/admin", tab: "payments" },
    { icon:HomeIcon, label: "Join Food-court", path: "/admin", tab: "foodcourt" },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const expandedWidth = "w-72 lg:w-64";
  const collapsedWidth = "w-20";

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-50 bg-card/95 backdrop-blur-xl rounded-r-[35px] border-r border-border/50 transition-all duration-500 ease-out overflow-hidden group/sidebar",
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
        {/* Premium Header with Gradient Line */}
        <div className="relative pt-6 pb-4 px-6 z-10">
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              {/* Compact Logo for Collapsed State */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-60 backdrop-blur-sm rounded-2xl" />
                <button
                  onClick={() => setIsCollapsed(false)}
                  aria-label="Expand sidebar"
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg group/toggle relative overflow-hidden border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 scale-0 group-hover/toggle:scale-100 transition-transform duration-500" />
                  <ChevronRight className="w-5 h-5 text-black transition-transform duration-300 group-hover/toggle:scale-125 drop-shadow-sm" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
              
              {/* Mini Logo in Collapsed State */}
              
            </div>
          ) : (
            <div className="flex flex-col gap-4 transition-all duration-500">
              {/* Enhanced Logo Section */}
              <div className="flex items-center justify-between relative">
              
                  
          <img
  src="/logo.svg"
  alt="Logo"
  className="
    h-48 w-48      /* bigger */
    -mt-16          /* move further up */
    transition-all duration-300
  "
/>


                  
               

                {/* Toggle Button */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  aria-expanded={!isCollapsed}
                  aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
                  className="w-8 h-8 rounded-xl border border-border/80 bg-card/80 backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/toggle z-20 shadow-md hover:bg-primary/10 hover:border-primary/30"
                >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground transition-all duration-500 group-hover/toggle:text-primary" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Gradient Line for Header */}
<div className="absolute bottom-6 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>

        {/* Navigation Section */}
        <div className="relative py-4">
          {/* Top Gradient Line for Navigation */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
          
          <nav className="px-4 space-y-2 relative z-10">
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
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl relative overflow-hidden group/nav-item transition-all duration-300 ease-out",
                    isActive
                      ? "premium-gradient text-white shadow-lg scale-[1.02] border border-primary/20"
                      : "hover:bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent hover:border-primary/10"
                  )}
                >
                  {/* Background Effects */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 transition-all duration-500",
                      isItemHovered && !isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
                      isActive && "opacity-0"
                    )}
                  />
                  
                  {/* Icon with Enhanced States */}
                  <div
                    className={cn(
                      "relative z-10 transition-transform duration-300 flex-shrink-0 p-1.5 rounded-lg",
                      isActive && "scale-110 bg-white/10",
                      isItemHovered && !isActive && "scale-105 bg-muted/50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-all duration-300",
                        isActive && "text-white drop-shadow-sm",
                        isItemHovered && !isActive && "text-primary"
                      )}
                    />
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-primary shadow-xs" />
                    )}
                  </div>

                  {/* Label with Smooth Animation */}
                  <div
                    className={cn(
                      "flex items-center justify-between flex-1 overflow-hidden transition-all duration-300",
                      isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    <span
                      className={cn(
                        "font-medium text-sm transition-all duration-300 relative",
                        isActive && "font-semibold"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div
                      role="tooltip"
                      className="absolute left-full ml-2 px-2 py-1.5 bg-foreground/95 backdrop-blur-xl text-background text-xs rounded-lg opacity-0 group-hover/nav-item:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-lg border border-border/50"
                    >
                      <span className="font-medium">{item.label}</span>
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-foreground rotate-45" />
                    </div>
                  )}

                  {/* Hover Indicator */}
                  {isItemHovered && !isActive && !isCollapsed && (
                    <div className="absolute right-2 w-1 h-1 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Gradient Line for Navigation */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>

        {/* Premium Upgrade Card with Gradient Borders */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 z-10",
            isCollapsed ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          {/* Top Gradient Line for Upgrade Section */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="relative p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 overflow-hidden group/upgrade">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover/upgrade:opacity-100 transition-opacity duration-500" />
            
            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover/upgrade:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                <Crown className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Pro Plan
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 relative z-10 leading-relaxed">
              Unlimited orders & premium features
            </p>
            <Link to="/pricing">
              <button className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary text-sm font-medium transition-all duration-300 hover:scale-[1.02] relative z-10 group/btn overflow-hidden border border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 scale-0 group-hover/btn:scale-100 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-1.5 group-hover/btn:gap-2 transition-all duration-300">
                  Upgrade Now
                  <Zap className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
                </span>
              </button>
            </Link>
          </div>

          {/* Bottom Gradient Line for Entire Sidebar */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Enhanced Collapsed Upgrade Hint */}
        {isCollapsed && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <Link to="/pricing">
              <button 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl group/collapsed-upgrade relative overflow-hidden border border-primary/30"
                aria-label="Upgrade to Pro"
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover/collapsed-upgrade:scale-100 transition-transform duration-500" />
                <Crown className="w-4 h-4 text-white relative z-10 transition-transform duration-300 group-hover/collapsed-upgrade:scale-110" />
              </button>
            </Link>
          </div>
        )}

        {/* Interactive Border Glow */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/70 to-primary transition-all duration-1000",
            isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          )}
        />

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
      </aside>

      {/* Spacer for Main Content */}
      <div
        aria-hidden
        className={cn(
          "flex-shrink-0 transition-all duration-500",
          isCollapsed ? collapsedWidth : expandedWidth
        )}
      />
    </>
  );
};