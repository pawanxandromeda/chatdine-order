import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
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
  Clock,
  Check,
  ArrowRight,
  Users,
  CreditCard,
  Globe,
  Star,
  MessageCircle,
  Smartphone,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description: "Natural conversation ordering that understands context and preferences"
    },
    {
      icon: Mic,
      title: "Voice Ordering",
      description: "Speak naturally with advanced voice recognition technology"
    },
    {
      icon: ShoppingCart,
      title: "Real-time Updates",
      description: "Live order tracking with instant price calculations"
    },
    {
      icon: Clock,
      title: "Smart Timing",
      description: "Accurate prep times and intelligent order management"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-grade security with multiple payment options"
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Real-time insights to grow your business"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - White */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-blob-float" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8 animate-slide-up">
            <Badge variant="outline" className="border-primary/20 px-6 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              The Future of Restaurant Ordering
            </Badge>

            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.05]">
              Order with
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200%' }}>
                Your Voice
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your restaurant experience with AI-powered ordering.
              Natural conversations, instant processing, zero wait times.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white border-0 h-14 px-8 text-base font-medium hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-medium"
                onClick={() => navigate("/order")}
              >
                Try Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Restaurants</div>
              </div>
              <div className="text-center border-x border-border/50">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Daily Orders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Black Section */}
      <section className="black-section py-24 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Built for Excellence
            </h2>
            <p className="text-xl text-black-section-muted max-w-2xl mx-auto">
              Everything you need to run a modern restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - White */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 animate-slide-up">
            <Badge variant="outline" className="border-primary/20 mb-6">
              <Zap className="w-3 h-3 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Three Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              From scan to payment in seconds
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Scan QR Code",
                description: "Customer scans the table QR code with their phone camera. No app download required.",
                icon: Smartphone,
              },
              {
                step: "02",
                title: "Order Naturally",
                description: "Chat or speak the order in plain language. AI understands context and preferences.",
                icon: MessageCircle,
              },
              {
                step: "03",
                title: "Instant Payment",
                description: "Secure checkout with multiple payment options. Order confirmed in seconds.",
                icon: CreditCard,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-card/50 border-border/50 p-10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-8">
                  <div className="text-7xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-3xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Black Section */}
      <section className="black-section py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Trusted Worldwide
            </h2>
            <p className="text-xl text-black-section-muted">
              Join hundreds of successful restaurants
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, stat: "500+", label: "Restaurants" },
              { icon: ShoppingCart, stat: "50K+", label: "Daily Orders" },
              { icon: Star, stat: "4.9/5", label: "Rating" },
              { icon: Globe, stat: "12", label: "Countries" },
            ].map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {item.stat}
                </div>
                <div className="text-white/60">{item.label}</div>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Boost Revenue", desc: "25% average increase in order value" },
              { icon: Clock, title: "Save Time", desc: "30% faster table turnover" },
              { icon: Shield, title: "Reduce Errors", desc: "95% reduction in order mistakes" },
            ].map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <item.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - White */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 p-12 md:p-16 text-center animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Start your free trial today. No credit card required. Setup in 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white border-0 h-14 px-10 text-base"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-base"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 pt-10 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Cancel anytime</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer - Black Section */}
      <footer className="black-section py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
<img
  src="/logo.svg"
  alt="Logo"
  className="-mt-2 -ml-2 h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 transition-all duration-300"
/>



              </div>
              <p className="text-white/60 leading-relaxed">
                AI-powered ordering platform for modern restaurants
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-3">
                <a href="/order" className="block text-white/60 hover:text-white transition-colors">AI Ordering</a>
                <a href="/whatsapp-marketing" className="block text-white/60 hover:text-white transition-colors">WhatsApp Marketing</a>
                <a href="/pricing" className="block text-white/60 hover:text-white transition-colors">Pricing</a>
                <a href="/admin" className="block text-white/60 hover:text-white transition-colors">Dashboard</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/60 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Terms</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2025 Mevoo. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
