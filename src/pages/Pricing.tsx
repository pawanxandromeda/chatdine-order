import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Crown, Zap, ArrowLeft, Star, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    name: "Starter",
    price: 499,
    orders: "500",
    features: [
      "Up to 500 orders/month",
      "Basic menu management",
      "QR code ordering",
      "Email support",
      "Basic analytics",
      "2 GB storage",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 799,
    orders: "Unlimited",
    features: [
      "Unlimited orders",
      "Advanced menu management",
      "QR code ordering",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Multi-location support",
      "10 GB storage",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 1999,
    orders: "Unlimited",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solution",
      "API access",
      "Advanced security",
      "24/7 phone support",
      "Custom SLA",
      "Unlimited storage",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"3" | "6" | "12">("12");

  const getDiscount = (cycle: string) => {
    switch (cycle) {
      case "3":
        return 0;
      case "6":
        return 10;
      case "12":
        return 20;
      default:
        return 0;
    }
  };

  const calculatePrice = (basePrice: number) => {
    const discount = getDiscount(billingCycle);
    const months = parseInt(billingCycle);
    const total = basePrice * months;
    const discountedTotal = total * (1 - discount / 100);
    return {
      monthly: basePrice,
      total: discountedTotal,
      discount,
      perMonth: discountedTotal / months,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold text-xl">Mevoo</span>
          </Link>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="premium-gradient text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <Badge className="mb-4 premium-gradient text-white">
              <Crown className="w-3 h-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground">
              Zero commission on orders. Pay only ₹2 when using AI features. 
              <span className="text-primary font-semibold"> That's it!</span>
            </p>
          </div>

          {/* AI Pricing Highlight */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up stagger-1">
            <Card className="glass border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Revolutionary Pricing Model</h3>
                    <p className="text-muted-foreground">
                      Unlike other platforms that charge 15-30% commission, we only charge ₹2 per order 
                      when you use AI suggestions. Regular orders? <span className="text-primary font-semibold">Completely free!</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      0% Commission
                    </Badge>
                    <Badge className="text-lg px-4 py-2 premium-gradient text-white">
                      ₹2/AI Order
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Cycle Selection */}
          <div className="max-w-md mx-auto mb-12 animate-slide-up stagger-2">
            <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-14">
                <TabsTrigger value="3" className="relative">
                  3 Months
                </TabsTrigger>
                <TabsTrigger value="6" className="relative">
                  6 Months
                  <Badge className="absolute -top-2 -right-2 text-xs bg-primary text-white">-10%</Badge>
                </TabsTrigger>
                <TabsTrigger value="12" className="relative">
                  12 Months
                  <Badge className="absolute -top-2 -right-2 text-xs bg-primary text-white">-20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => {
              const pricing = calculatePrice(plan.price);

              return (
                <Card
                  key={plan.name}
                  className={`relative animate-slide-up hover-lift ${
                    plan.popular
                      ? "border-primary shadow-2xl shadow-primary/20 scale-105"
                      : "border-border"
                  }`}
                  style={{ animationDelay: `${0.1 * (index + 3)}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="premium-gradient text-white px-6 py-1 text-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-5xl font-bold">₹{Math.round(pricing.perMonth)}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      {pricing.discount > 0 && (
                        <p className="text-sm text-muted-foreground">
                          <span className="line-through">₹{pricing.monthly}</span>
                          <span className="text-primary ml-2 font-semibold">
                            Save {pricing.discount}%
                          </span>
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-3">
                        Billed ₹{Math.round(pricing.total)} every {billingCycle} months
                      </p>
                    </div>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-sm px-4 py-1">
                        {plan.orders} orders/month
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/signup" className="block">
                      <Button
                        className={`w-full h-12 text-base ${
                          plan.popular ? "premium-gradient text-white" : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass animate-slide-up stagger-6 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Flexible Plans</CardTitle>
                <CardDescription>
                  Upgrade, downgrade, or cancel anytime. No long-term commitments required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass animate-slide-up stagger-7 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Bank-grade security with 99.9% uptime guarantee for your business.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass animate-slide-up stagger-8 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Instant Setup</CardTitle>
                <CardDescription>
                  Start taking orders in minutes with our quick setup process. No technical skills needed.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-slide-up stagger-9">
            <Card className="glass border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Ready to transform your restaurant?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of restaurants already using Mevoo to streamline their operations
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/signup">
                    <Button size="lg" className="premium-gradient text-white">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
