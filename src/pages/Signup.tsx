  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { UserPlus, Mail, Lock, User, Eye, EyeOff, Building2 } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Checkbox } from "@/components/ui/checkbox";
  
  const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    return (
      <div className="min-h-screen grid md:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-accent via-primary to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10 text-white max-w-lg space-y-8 animate-slide-in-left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="font-bold text-3xl">Mevoo</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Join the restaurant revolution
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Start your 14-day free trial. No credit card required. Cancel anytime.
              </p>
            </div>
  
            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Quick Setup</h3>
                  <p className="text-white/70">Get started in less than 5 minutes.</p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Bank-Grade Security</h3>
                  <p className="text-white/70">Your data is always protected and encrypted.</p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Instant Activation</h3>
                  <p className="text-white/70">Start taking orders immediately after signup.</p>
                </div>
              </div>
            </div>
  
            <div className="pt-8">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <p className="text-lg mb-4 font-semibold">Trusted by restaurants worldwide</p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold">500+ restaurants</p>
                    <p className="text-sm text-white/70">already using Mevoo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-blob-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-blob-float" style={{ animationDelay: '2s' }} />
  
        <Card className="glass w-full max-w-2xl relative z-10 border-border/50 animate-slide-up">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base">
              Start your restaurant's digital transformation
            </CardDescription>
          </CardHeader>
  
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-10 h-12 rounded-2xl"
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="pl-10 h-12 rounded-2xl"
                  />
                </div>
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="restaurant" className="text-sm font-medium">
                Restaurant Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="restaurant"
                  placeholder="Your Restaurant"
                  className="pl-10 h-12 rounded-2xl"
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 h-12 rounded-2xl"
                />
              </div>
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
  
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </label>
            </div>
  
            <Button className="w-full h-12 rounded-2xl premium-gradient text-white font-medium">
              Create Account
            </Button>
  
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Signup;
