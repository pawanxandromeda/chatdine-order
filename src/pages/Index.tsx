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
      <section className="relative overflow-hidden pt-20 min-h-screen flex items-center">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob-float" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-float" />
        </div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 animate-slide-in-left backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  #1 Restaurant AI Platform
                </span>
                <Sparkles className="h-4 w-4 text-primary animate-bounce-subtle" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] animate-slide-in-left stagger-1">
                Transform{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-lg animate-gradient" style={{ backgroundSize: '200% 200%' }}>
                    Dining
                  </span>
                  <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200% 200%' }}>
                    Dining
                  </span>
                </span>
                <br />
                Experience
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl animate-slide-in-left stagger-2">
                AI-powered ordering that speaks your language. Voice commands, smart recommendations, and lightning-fast service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-in-left stagger-3">
                <Button 
                  size="lg" 
                  className="text-lg px-10 h-16 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 premium-gradient border-0 group relative overflow-hidden"
                  onClick={() => navigate("/signup")}
                >
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-10 h-16 rounded-2xl glass border-2 border-primary/30 hover:border-primary transition-all duration-300 group"
                  onClick={() => navigate("/order")}
                >
                  Try Demo
                  <MessageSquare className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8 animate-slide-in-left stagger-4">
                <div className="text-center group cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-sm text-muted-foreground">Restaurants</div>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                <div className="text-center group cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">50K+</div>
                  <div className="text-sm text-muted-foreground">Daily Orders</div>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                <div className="text-center group cursor-pointer">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl animate-scale-pulse rounded-3xl" />
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl animate-rotate-slow" style={{ transformOrigin: 'center' }} />
                <img
                  src={heroImage}
                  alt="Premium restaurant interior showcasing Mevoo platform"
                  className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full h-auto border border-primary/20"
                />
                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border border-primary/30 animate-bounce-subtle backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-morph" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-primary animate-pulse-soft" />
              <span className="text-sm font-semibold">Powerful Features</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Built for{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent blur-sm">
                  Excellence
                </span>
                <span className="relative bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Excellence
                </span>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every feature designed to elevate your restaurant to new heights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`glass p-8 cursor-pointer group border-primary/20 hover:border-primary/50 transition-all duration-500 relative overflow-hidden animate-slide-up stagger-${(index % 6) + 1}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-primary/25">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </Card>
            ))}
          </div>

          {/* Additional Premium Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
            {[
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Live insights into your business performance" },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and data protection" },
              { icon: Globe, title: "Multi-Location", desc: "Manage unlimited locations effortlessly" }
            ].map((item, index) => (
              <Card key={index} className="glass p-8 text-center border-primary/20 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob-float" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/30 backdrop-blur-xl">
              <ChefHat className="h-5 w-5 text-primary animate-bounce-subtle" />
              <span className="text-sm font-semibold">Simple & Powerful</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seamless
              </span>{" "}
              Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Three elegant steps to revolutionize your restaurant experience
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Scan QR Code", desc: "Customer scans table QR code with their phone camera", icon: "📱" },
              { step: "02", title: "Order Naturally", desc: "Chat or speak their order in plain language", icon: "💬" },
              { step: "03", title: "Pay & Enjoy", desc: "Secure payment and order confirmation in seconds", icon: "✨" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <Card className="glass p-10 border-primary/20 hover:border-primary/50 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-8xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                        {item.step}
                      </div>
                      <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {item.icon}
                      </div>
                    </div>
                    
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-500" />
                    
                    <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 z-10">
                      <div className="h-12 w-12 rounded-full glass border-2 border-primary/30 flex items-center justify-center backdrop-blur-xl">
                        <div className="text-primary text-xl animate-pulse-soft">→</div>
                      </div>
                    </div>
                  )}
                </Card>
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
