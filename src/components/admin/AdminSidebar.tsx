import { LayoutDashboard, UtensilsCrossed, ShoppingBag, CreditCard, QrCode, BarChart3, Crown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin", tab: "menu" },
  { icon: UtensilsCrossed, label: "Menu", path: "/admin", tab: "menu" },
  { icon: ShoppingBag, label: "Orders", path: "/admin", tab: "orders" },
  { icon: CreditCard, label: "Payments", path: "/admin", tab: "payments" },
  { icon: Crown, label: "Subscription", path: "/admin", tab: "subscription" },
  { icon: QrCode, label: "QR Codes", path: "/admin", tab: "qr" },
  { icon: BarChart3, label: "Analytics", path: "/admin", tab: "analytics" },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border glass sticky top-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="font-bold text-xl">Mevoo</h1>
            <p className="text-xs text-muted-foreground">Restaurant SaaS</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "premium-gradient text-white shadow-lg"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/50">
        <div className="p-4 rounded-xl glass border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Pro Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Unlimited orders & features
          </p>
          <Link to="/pricing">
            <button className="w-full py-2 px-4 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
              Upgrade Plan
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};
