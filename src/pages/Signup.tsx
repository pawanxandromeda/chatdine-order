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
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <Card className="glass w-full max-w-2xl relative z-10 border-border/50 hover-lift">
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
