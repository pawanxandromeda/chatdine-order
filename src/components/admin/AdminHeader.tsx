import { Bell, Search, Settings, LogOut, User, ChevronDown, Sparkles, Crown, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

interface AdminHeaderProps {
  title: string;
  description: string;
}

export const AdminHeader = ({ title, description }: AdminHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tooltip content configuration
  const tooltips = {
    search: "Quick search across your restaurant data • Press '/' to focus",
    bell: "Notifications & alerts • 3 new updates available",
    profile: "Account menu • Manage settings & preferences",
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-[#f9fafb]/95 border-b border-[#9ca3af]/50 backdrop-blur-xl transition-all duration-300 ease-out",
      isScrolled ? "shadow-xl shadow-primary/5 py-3" : "shadow-sm py-4"
    )}>
      <div className="flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
              <Crown className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">PRO</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium tracking-wide">{description}</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Expandable Search Box */}
          <div className={cn(
            "relative transition-all duration-500 ease-out",
            isSearchExpanded ? "w-80" : "w-64"
          )}>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveTooltip('search')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300",
                isSearchExpanded ? "text-primary scale-110" : "text-gray-400",
                hoveredIcon === 'search' && "text-primary scale-110"
              )} />
              <Input
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
                onMouseEnter={() => setHoveredIcon('search')}
                onMouseLeave={() => setHoveredIcon(null)}
                placeholder="Search orders, menu items, analytics..."
                className={cn(
                  "pl-10 h-10 rounded-xl bg-white/80 border border-gray-300/80 backdrop-blur-sm transition-all duration-300",
                  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/30",
                  "shadow-sm hover:shadow-md pr-20",
                  isSearchExpanded && "bg-white border-primary/30 shadow-lg"
                )}
              />
              
              {/* Search shortcut hint */}
              <div className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100/80 text-xs text-gray-500 rounded-lg border border-gray-200/60 transition-all duration-300",
                isSearchExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95",
                "backdrop-blur-sm"
              )}>
                Press ⌘K
              </div>

              {/* Animated border effect */}
              <div className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity duration-300",
                isSearchExpanded && "opacity-100"
              )} />

              {/* Enhanced Tooltip */}
              {activeTooltip === 'search' && (
                <div className="absolute top-full left-0 mt-2 w-80 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-xl text-white p-3 rounded-xl shadow-2xl border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Smart Search</span>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">{tooltips.search}</p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Search orders by ID or customer name</div>
                      <div>• Find menu items by category or price</div>
                      <div>• Quick access to analytics reports</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notification Icon */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('bell')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              onMouseEnter={() => setHoveredIcon('bell')}
              onMouseLeave={() => setHoveredIcon(null)}
              className={cn(
                "relative hover:bg-primary/10 rounded-xl transition-all duration-300 group",
                "border border-transparent hover:border-primary/20",
                hoveredIcon === 'bell' && "bg-primary/10 scale-110"
              )}
            >
              <Bell className={cn(
                "w-5 h-5 transition-all duration-300",
                hoveredIcon === 'bell' ? "text-primary scale-110" : "text-gray-700"
              )} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              {/* Notification count */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg">
                3
              </span>
              {/* Ping animation */}
              <span className={cn(
                "absolute inset-0 rounded-xl bg-primary/20 scale-0 transition-transform duration-500",
                hoveredIcon === 'bell' && "scale-100 animate-ping"
              )} />
            </Button>

            {/* Notification Tooltip */}
            {activeTooltip === 'bell' && (
              <div className="absolute top-full right-0 mt-2 w-72 z-50">
                <div className="bg-gray-900/95 backdrop-blur-xl text-white p-3 rounded-xl shadow-2xl border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Notifications</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-3">{tooltips.bell}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs">New order #2847 received</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="text-xs">Low inventory alert</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Profile Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('profile')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  onMouseEnter={() => setHoveredIcon('profile')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={cn(
                    "hover:bg-primary/10 rounded-xl transition-all duration-300 group",
                    "border border-transparent hover:border-primary/20 px-3 py-2 h-auto"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-xl premium-gradient flex items-center justify-center transition-all duration-300 relative",
                      hoveredIcon === 'profile' && "scale-110 shadow-lg"
                    )}>
                      <User className="w-4 h-4 text-white" />
                      {/* Online status */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-700">Admin</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-500 transition-transform duration-300",
                        hoveredIcon === 'profile' && "text-primary rotate-180"
                      )} />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 border border-gray-200/80 backdrop-blur-xl bg-white/95 shadow-2xl rounded-2xl overflow-hidden"
              >
                {/* Premium Header */}
                <div className="premium-gradient p-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                  <DropdownMenuLabel className="text-white/90 font-semibold text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Administrator Account
                  </DropdownMenuLabel>
                  <p className="text-white/70 text-xs mt-1">restaurant@mevoo.com</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="px-2 py-1 bg-white/20 rounded-full">
                      <span className="text-xs font-medium">PRO PLAN</span>
                    </div>
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  </div>
                </div>
                
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item p-3 text-gray-700">
                    <User className="w-4 h-4 mr-3 text-gray-600 group-hover/item:text-white transition-colors" />
                    <div>
                      <span className="font-medium block group-hover/item:text-white">Profile & Account</span>
                      <span className="text-xs text-gray-500 group-hover/item:text-gray-300">Manage personal settings</span>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item p-3 text-gray-700">
                    <Settings className="w-4 h-4 mr-3 text-gray-600 group-hover/item:text-white transition-colors" />
                    <div>
                      <span className="font-medium block group-hover/item:text-white">Settings</span>
                      <span className="text-xs text-gray-500 group-hover/item:text-gray-300">Preferences & configuration</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary/5 group/item p-3 text-gray-700">
                    <CreditCard className="w-4 h-4 mr-3 text-gray-600 group-hover/item:text-white transition-colors" />
                    <div>
                      <span className="font-medium block group-hover/item:text-white">Billing & Subscription</span>
                      <span className="text-xs text-gray-500 group-hover/item:text-gray-300">Manage payments & plan</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />

                  {/* Premium Sign Out with Red Accent */}
                  <DropdownMenuItem asChild className="p-0 m-2">
                    <Link 
                      to="/login" 
                      className={cn(
                        "w-full cursor-pointer rounded-lg transition-all duration-300 group/signout p-3",
                        "hover:bg-red-500 hover:border hover:border-red-500 hover:shadow-lg",
                        "border border-transparent"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className={cn(
                            "p-2 rounded-lg mr-3 transition-all duration-300 group-hover/signout:scale-110",
                            "bg-red-100 group-hover/signout:bg-white"
                          )}>
                            <LogOut className={cn(
                              "w-4 h-4 transition-all duration-300",
                              "text-red-600 group-hover/signout:text-red-500"
                            )} />
                          </div>
                          <div>
                            <span className="font-semibold text-red-600 group-hover/signout:text-white block">Sign Out</span>
                            <span className="text-xs text-red-500/70 group-hover/signout:text-red-200">End current session</span>
                          </div>
                        </div>
                        <div className={cn(
                          "px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300",
                          "bg-red-100 text-red-600 group-hover/signout:bg-white group-hover/signout:text-red-500"
                        )}>
                          ⌘Q
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Tooltip */}
            {activeTooltip === 'profile' && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <div className="bg-gray-900/95 backdrop-blur-xl text-white p-3 rounded-xl shadow-2xl border border-gray-700/50 w-64">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Account Menu</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-3">{tooltips.profile}</p>
                  <div className="text-xs text-gray-400 space-y-2">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="text-primary font-medium">Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-400 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session:</span>
                      <span className="text-gray-300">2h 15m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Add the cn utility if not already available
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}