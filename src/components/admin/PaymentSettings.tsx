import { useState } from "react";
import { CreditCard, DollarSign, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PaymentSettings = () => {
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isPayPalConnected, setIsPayPalConnected] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payment Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Connect and manage your payment providers
          </p>
        </div>

        {!isStripeConnected && !isPayPalConnected && (
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Connect at least one payment provider to start accepting payments
            </AlertDescription>
          </Alert>
        )}

        {/* Stripe Integration */}
        <Card className="glass border-border/50 hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Stripe</CardTitle>
                  <CardDescription>
                    Accept cards, wallets, and bank transfers
                  </CardDescription>
                </div>
              </div>
              {isStripeConnected && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isStripeConnected ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">
                    Publishable Key
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help text-muted-foreground">ⓘ</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Found in your Stripe Dashboard under Developers → API Keys
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="stripe-key"
                    placeholder="pk_live_..."
                    className="rounded-2xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">
                    Secret Key
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-help text-muted-foreground">ⓘ</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Keep this secure! Never share your secret key publicly
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    placeholder="sk_live_..."
                    className="rounded-2xl h-11"
                  />
                </div>
                <Button
                  className="w-full rounded-2xl premium-gradient"
                  onClick={() => setIsStripeConnected(true)}
                >
                  Connect Stripe
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Live Mode</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Account: restaurant@email.com
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-2xl">
                    View Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl text-destructive hover:text-destructive"
                    onClick={() => setIsStripeConnected(false)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PayPal Integration */}
        <Card className="glass border-border/50 hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl">PayPal</CardTitle>
                  <CardDescription>Accept PayPal payments worldwide</CardDescription>
                </div>
              </div>
              {isPayPalConnected && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPayPalConnected ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="paypal-client">Client ID</Label>
                  <Input
                    id="paypal-client"
                    placeholder="AYjQmJZc..."
                    className="rounded-2xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal-secret">Secret</Label>
                  <Input
                    id="paypal-secret"
                    type="password"
                    placeholder="ENt5..."
                    className="rounded-2xl h-11"
                  />
                </div>
                <Button
                  className="w-full rounded-2xl"
                  variant="outline"
                  onClick={() => setIsPayPalConnected(true)}
                >
                  Connect PayPal
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Production Mode</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Account: restaurant@business.com
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-2xl">
                    View Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl text-destructive hover:text-destructive"
                    onClick={() => setIsPayPalConnected(false)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Settings */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-xl">Transaction Settings</CardTitle>
                <CardDescription>Configure payment preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div>
                <p className="font-medium">Automatic Receipts</p>
                <p className="text-xs text-muted-foreground">
                  Email receipts to customers automatically
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div>
                <p className="font-medium">Tips Enabled</p>
                <p className="text-xs text-muted-foreground">
                  Allow customers to add tips
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div>
                <p className="font-medium">Split Payments</p>
                <p className="text-xs text-muted-foreground">
                  Enable splitting bills between customers
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};
