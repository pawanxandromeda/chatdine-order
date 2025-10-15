import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Mic,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
  ChefHat,
  BarChart3,
  Shield,
  Users,
  CreditCard,
  Globe,
  Clock,
  Check,
} from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description: "Natural conversation ordering that understands your cravings"
    },
    {
      icon: Mic,
      title: "Voice Ordering",
      description: "Speak your order hands-free with advanced voice recognition"
    },
    {
      icon: ShoppingCart,
      title: "Live Cart Updates",
      description: "See your order build in real-time with instant price calculations"
    },
    {
      icon: Clock,
      title: "Smart Timing",
      description: "Accurate prep times and order tracking from kitchen to table"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe, encrypted transactions with multiple payment options"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Real-time insights to optimize menu and boost revenue"
    }
  ];

  const benefits = [
    "Reduce order errors by 95% with AI validation",
    "Increase table turnover by 30% with faster ordering",
    "Boost average order value by 25% with smart suggestions",
    "Zero training required for staff or customers"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl premium-gradient flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Mevoo</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="rounded-xl"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="rounded-xl premium-gradient border-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 premium-gradient opacity-5 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
                <span className="text-sm font-medium text-primary">
                  World-Class Restaurant Platform
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                The Future of{" "}
                <span className="premium-gradient bg-clip-text text-transparent animate-gradient">
                  Restaurant Ordering
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Empower your restaurant with Mevoo's AI-powered platform. Voice ordering, real-time analytics, and seamless payments - all in one elegant solution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 h-14 rounded-2xl shadow-xl hover:shadow-2xl hover-lift premium-gradient border-0"
                  onClick={() => navigate("/signup")}
                >
                  Start Free Trial
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 h-14 rounded-2xl hover-lift"
                  onClick={() => navigate("/order")}
                >
                  Try Demo
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Restaurants</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Daily Orders</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 premium-gradient opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Premium restaurant interior showcasing Mevoo platform"
                className="relative rounded-3xl shadow-2xl hover-lift w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="text-primary">Dominate</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Enterprise-grade features that scale with your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass p-8 hover-lift cursor-pointer group border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-2xl premium-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Additional Premium Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <Card className="glass p-6 text-center hover-lift border-border/50">
              <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Real-Time Analytics</h4>
              <p className="text-sm text-muted-foreground">Live insights into your business performance</p>
            </Card>
            <Card className="glass p-6 text-center hover-lift border-border/50">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Enterprise Security</h4>
              <p className="text-sm text-muted-foreground">Bank-level encryption and data protection</p>
            </Card>
            <Card className="glass p-6 text-center hover-lift border-border/50">
              <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Multi-Location</h4>
              <p className="text-sm text-muted-foreground">Manage unlimited locations effortlessly</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <ChefHat className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your restaurant operations
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Scan QR Code", desc: "Customer scans table QR code with their phone camera" },
              { step: "02", title: "Order Naturally", desc: "Chat or speak their order in plain language" },
              { step: "03", title: "Pay & Enjoy", desc: "Secure payment and order confirmation in seconds" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="relative">
                  <div className="text-7xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto glass rounded-3xl p-12 md:p-16 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Proven Results</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Transform Your Restaurant's Performance
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join innovative restaurants already using AI to deliver exceptional experiences and maximize revenue.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/admin")}
                  className="rounded-2xl h-14 px-8 text-lg"
                >
                  See Dashboard Demo
                </Button>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient opacity-5 animate-gradient" />
        <div className="container mx-auto px-4 relative">
          <Card className="glass max-w-4xl mx-auto p-12 md:p-16 text-center space-y-8 border-border/50 hover-lift">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
              <span className="text-sm font-medium text-primary">Limited Time Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 500+ restaurants already using Mevoo to increase revenue by 40% and create unforgettable dining experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg"
                className="text-lg px-8 h-14 rounded-2xl shadow-xl hover:shadow-2xl premium-gradient border-0 hover-lift"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14 rounded-2xl hover-lift"
                onClick={() => navigate("/admin")}
              >
                View Dashboard
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No credit card required • Free 14-day trial • Cancel anytime</p>
          </Card>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl premium-gradient flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Mevoo</span>
              </div>
              <p className="text-muted-foreground">
                The world's most advanced restaurant management platform. Trusted by industry leaders.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Mevoo. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <CreditCard className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Shield className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
