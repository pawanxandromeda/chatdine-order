import { useState } from "react";
import { Crown, Check, Zap, TrendingUp, Shield, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
    ],
    popular: false,
  },
];

export const SubscriptionManagement = () => {
  const [billingCycle, setBillingCycle] = useState<"3" | "6" | "12">("12");
  const currentPlan = "Professional";
  const ordersUsed = 1247;
  const ordersLimit = "Unlimited";

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
    <div className="space-y-6">
      {/* Current Plan Status */}
      <Card className="glass border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Current Plan: {currentPlan}</CardTitle>
                <CardDescription>Active until Dec 31, 2025</CardDescription>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Orders This Month</p>
              <p className="text-2xl font-bold">{ordersUsed.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">of {ordersLimit}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">AI Suggestions Used</p>
              <p className="text-2xl font-bold">342</p>
              <p className="text-xs text-primary mt-1">₹684 AI costs</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
              <p className="text-2xl font-bold">2.4 GB</p>
              <p className="text-xs text-muted-foreground mt-1">of 10 GB included</p>
              <Progress value={24} className="mt-2" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">AI-Powered Ordering</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Only ₹2 per order when using AI suggestions. Zero commission on regular orders!
                </p>
                <div className="flex gap-2 text-xs">
                  <Badge variant="outline" className="bg-background">
                    0% Commission
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    ₹2/order AI only
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Selection */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <CardDescription>Select billing cycle and upgrade or downgrade anytime</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="3" className="relative">
                3 Months
              </TabsTrigger>
              <TabsTrigger value="6" className="relative">
                6 Months
                <Badge className="absolute -top-2 -right-2 text-xs bg-primary">Save 10%</Badge>
              </TabsTrigger>
              <TabsTrigger value="12" className="relative">
                12 Months
                <Badge className="absolute -top-2 -right-2 text-xs bg-primary">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={billingCycle} className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const pricing = calculatePrice(plan.price);
                  const isCurrentPlan = plan.name === currentPlan;

                  return (
                    <Card
                      key={plan.name}
                      className={`relative ${
                        plan.popular
                          ? "border-primary shadow-lg shadow-primary/20"
                          : "border-border"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="premium-gradient text-white px-4">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">₹{Math.round(pricing.perMonth)}</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                          {pricing.discount > 0 && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <span className="line-through">₹{pricing.monthly}</span>
                              <span className="text-primary ml-2">Save {pricing.discount}%</span>
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Total: ₹{Math.round(pricing.total)} for {billingCycle} months
                          </p>
                        </div>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            {plan.orders} orders/month
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className={`w-full ${
                            plan.popular ? "premium-gradient text-white" : ""
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                          disabled={isCurrentPlan}
                        >
                          {isCurrentPlan ? "Current Plan" : "Upgrade Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl glass border border-border">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Flexible Plans</h4>
              <p className="text-xs text-muted-foreground">
                Upgrade, downgrade, or cancel anytime
              </p>
            </div>
            <div className="p-4 rounded-xl glass border border-border">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Secure Payments</h4>
              <p className="text-xs text-muted-foreground">
                Bank-grade encryption for all transactions
              </p>
            </div>
            <div className="p-4 rounded-xl glass border border-border">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Instant Activation</h4>
              <p className="text-xs text-muted-foreground">
                Start using new features immediately
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
