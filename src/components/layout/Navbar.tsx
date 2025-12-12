import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/95 border-b border-border/40 shadow-apple-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
<img
  src="/logo.svg"
  alt="Logo"
  className="
    h-32 w-52
    md:h-64 md:w-64
    lg:h-72 lg:w-72
    transition-all duration-300
    mt-4
    relative -left-5
  "
/>




          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 outline-none">
                Features
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 backdrop-blur-xl bg-background/98 border-border/40 shadow-apple-md">
                <DropdownMenuItem onClick={() => navigate("/order")} className="cursor-pointer text-xs">
                  AI Ordering
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/whatsapp-marketing")} className="cursor-pointer text-xs">
                  WhatsApp Marketing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs">
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/pricing" 
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              Pricing
            </Link>

            <Link 
              to="/whatsapp-marketing" 
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              WhatsApp Marketing
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="font-medium text-xs h-8 px-3 hover:bg-muted/50"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-primary to-accent text-white border-0 font-medium text-xs h-8 px-4 shadow-apple-sm hover:shadow-apple-md transition-all duration-200"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 backdrop-blur-xl bg-background/98 absolute left-0 right-0 top-14 shadow-apple-lg animate-slide-up">
            <div className="container mx-auto px-6 space-y-2">
              <Link
                to="/"
                className="block py-2 text-xs font-medium hover:text-primary transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/order"
                className="block py-2 text-xs font-medium hover:text-primary transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Ordering
              </Link>
              <Link
                to="/whatsapp-marketing"
                className="block py-2 text-xs font-medium hover:text-primary transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                WhatsApp Marketing
              </Link>
              <Link
                to="/admin"
                className="block py-2 text-xs font-medium hover:text-primary transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/pricing"
                className="block py-2 text-xs font-medium hover:text-primary transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-3 space-y-2 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full text-xs h-9"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 text-xs h-9"
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
