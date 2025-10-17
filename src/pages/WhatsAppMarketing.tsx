import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Users,
  TrendingUp,
  Zap,
  Target,
  CheckCircle2,
  Lock,
  Crown,
  ArrowRight,
  Smartphone,
  BarChart3,
  Send,
  ChefHat,
} from "lucide-react";

const WhatsAppMarketing = () => {
  const navigate = useNavigate();
  const [isEnterprise] = useState(false); // This would come from user's subscription

  const features = [
    {
      icon: MessageCircle,
      title: "Automated Campaigns",
      description: "Send personalized messages to customers based on their ordering behavior and preferences",
    },
    {
      icon: Users,
      title: "Customer Segmentation",
      description: "Target specific customer groups with tailored offers and promotions",
    },
    {
      icon: Target,
      title: "Smart Targeting",
      description: "Reach customers at the perfect time with AI-powered send-time optimization",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track open rates, click-through rates, and conversion metrics in real-time",
    },
    {
      icon: Send,
      title: "Bulk Messaging",
      description: "Send thousands of messages instantly while maintaining personalization",
    },
    {
      icon: BarChart3,
      title: "Campaign Performance",
      description: "Measure ROI and optimize campaigns based on detailed performance data",
    },
  ];

  const benefits = [
    { stat: "85%", label: "Average Open Rate" },
    { stat: "42%", label: "Click-Through Rate" },
    { stat: "3.5x", label: "ROI Increase" },
    { stat: "<5min", label: "Campaign Setup" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Mevoo</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent text-white border-0">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-morph" />

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8 animate-slide-up">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-6 py-2 text-sm">
              <Crown className="w-4 h-4 mr-2" />
              Enterprise Exclusive Feature
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05]">
              WhatsApp
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200%' }}>
                Marketing
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your customer engagement with automated WhatsApp campaigns.
              Reach customers where they are, when it matters most.
            </p>

            {!isEnterprise ? (
              <div className="pt-6">
                <Card className="max-w-2xl mx-auto backdrop-blur-xl bg-card/50 border-primary/30 p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Upgrade to Access</h3>
                      <p className="text-muted-foreground">
                        WhatsApp Marketing is available exclusively for Enterprise plan customers.
                        Upgrade now to unlock this powerful feature.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent text-white border-0 h-14 px-8"
                      onClick={() => navigate("/pricing")}
                    >
                      View Enterprise Plan
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8">
                      Contact Sales
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex gap-4 justify-center pt-6">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white border-0 h-14 px-8">
                  Create Campaign
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8">
                  View Analytics
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up stagger-1">
            {benefits.map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-card/50 border-border/50 p-6 text-center hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {item.stat}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-3 h-3 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                engage customers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade marketing tools designed for modern restaurants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-card/50 border-border/50 p-8 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4">Simple Setup</h2>
            <p className="text-xl text-muted-foreground">Get started in three easy steps</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Connect WhatsApp Business",
                description: "Link your WhatsApp Business account in under 2 minutes with our seamless integration",
                icon: Smartphone,
              },
              {
                step: "02",
                title: "Create Your Campaign",
                description: "Use our intuitive builder to craft personalized messages and select your audience",
                icon: MessageCircle,
              },
              {
                step: "03",
                title: "Launch & Track",
                description: "Send your campaign and monitor performance with real-time analytics dashboard",
                icon: BarChart3,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-card/50 border-border/50 p-8 hover:border-primary/50 transition-all duration-500 group animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30 p-12 text-center animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to boost your revenue?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join leading restaurants using WhatsApp Marketing to drive repeat orders and customer loyalty
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white border-0 h-14 px-8"
                onClick={() => navigate("/pricing")}
              >
                Upgrade to Enterprise
                <Crown className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8">
                Schedule Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppMarketing;
