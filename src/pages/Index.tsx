import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard, MessageSquare, Mic, ShoppingCart, Clock, Shield, Sparkles, ChefHat, TrendingUp, Zap, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center space-y-8 animate-slide-up max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Next-Gen Restaurant Ordering</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                Order Like You're
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Talking to a Friend
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Revolutionary AI-powered ordering system that transforms how customers order and how restaurants operate. Chat, speak, or type—it just works.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                onClick={() => navigate("/order")}
                className="rounded-2xl h-16 px-10 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <QrCode className="mr-2 h-6 w-6" />
                Try Ordering Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/admin")}
                className="rounded-2xl h-16 px-10 text-lg glass border-border/50 hover:border-primary/50 transition-all"
              >
                <LayoutDashboard className="mr-2 h-6 w-6" />
                View Admin Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>No App Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Zero Training Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Works Instantly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Everything You Need, Nothing You Don't</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for modern restaurants that want to deliver exceptional experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 hover:border-primary/50 transition-all hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
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
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10" />
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready to Revolutionize Your Restaurant?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of restaurant ordering today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/order")}
                className="rounded-2xl h-16 px-10 text-lg shadow-lg shadow-primary/20"
              >
                <QrCode className="mr-2 h-6 w-6" />
                Start Ordering
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/admin")}
                className="rounded-2xl h-16 px-10 text-lg glass border-border/50"
              >
                <LayoutDashboard className="mr-2 h-6 w-6" />
                Explore Admin
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
