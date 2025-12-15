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
  Split,
  QrCode,
  Store,
  Receipt,
  Zap as Lightning,
  ShoppingBag,
  Utensils,
  MapPin,
  Users as Group,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalX: number;
      originalY: number;
      distance: number;
    }> = [];

    const colors = [
      'rgba(59, 130, 246, 0.8)',   // blue-500
      'rgba(139, 92, 246, 0.8)',   // purple-500
      'rgba(16, 185, 129, 0.8)',   // emerald-500
      'rgba(245, 158, 11, 0.8)',   // amber-500
    ];

    // Create particles in grid pattern
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        particles.push({
          x: x + gridSize / 2,
          y: y + gridSize / 2,
          size: Math.random() * 1.5 + 0.5,
          speedX: 0,
          speedY: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          originalX: x + gridSize / 2,
          originalY: y + gridSize / 2,
          distance: 0
        });
      }
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Add subtle floating motion
        const noiseX = Math.sin(time + particle.originalX * 0.01) * 0.5;
        const noiseY = Math.cos(time + particle.originalY * 0.01) * 0.5;
        
        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        particle.distance = distance;
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 20;
          particle.y -= (dy / distance) * force * 20;
        } else {
          // Return to original position with easing
          particle.x += (particle.originalX + noiseX - particle.x) * 0.05;
          particle.y += (particle.originalY + noiseY - particle.y) * 0.05;
        }

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections between nearby particles
        particles.forEach(otherParticle => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 80 && dist > 0) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // Parallax effect on scroll
    const handleParallax = () => {
      const elements = document.querySelectorAll('[data-parallax]');
      const scrollY = window.scrollY;
      
      elements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const features = [
    {
      icon: QrCode,
      title: "One Scan Access",
      description: "Single QR code gives access to all food court outlets instantly"
    },
    {
      icon: Split,
      title: "Auto-Split Orders",
      description: "Intelligent system splits orders and payments automatically to respective outlets"
    },
    {
      icon: ShoppingCart,
      title: "Unified Cart",
      description: "Order from multiple outlets in one transaction, pay once"
    },
    {
      icon: Clock,
      title: "Smart Timing",
      description: "Optimized preparation times across different outlets"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "One secure payment, automatically distributed to outlets"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track performance across all outlets simultaneously"
    }
  ];

  const benefits = [
    {
      title: "Zero Queues",
      description: "Eliminate waiting lines with digital ordering",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Higher Order Value",
      description: "Customers order 40% more when browsing multiple outlets",
      icon: ShoppingBag,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Faster Turnover",
      description: "30% faster table turnover with efficient ordering",
      icon: Lightning,
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Reduced Errors",
      description: "95% fewer order mistakes with AI processing",
      icon: Check,
      color: "from-emerald-500/20 to-green-500/20"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-background overflow-hidden"
      ref={scrollRef}
      style={{
        background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
      }}
    >
      <Navbar />

      {/* Advanced Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden z-10">
        {/* Animated Background Elements */}
        <div 
          className="absolute top-40 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-morph"
          data-parallax
          data-speed="0.3"
        />
        <div 
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-blob-float"
          style={{ animationDelay: '2s' }}
          data-parallax
          data-speed="0.5"
        />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-white/10 rotate-12" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '3s' }}>
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-white/10 -rotate-12" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8">
            <div className="animate-slide-up">
              <Badge 
                variant="outline" 
                className="border-primary/30 px-6 py-2 text-sm font-medium bg-white/5 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
                The Future of Food Court Ordering
              </Badge>
            </div>

            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]">
                <span className="inline-block">
                  Order
                  <span className="relative inline-block mx-3">
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient-shift">
                      Everything
                    </span>
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl rounded-full opacity-50 animate-pulse" />
                  </span>
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%] animate-gradient-shift">
                    Anywhere
                  </span>
                  <div className="absolute -top-4 -right-4 w-8 h-8">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-1 bg-accent rounded-full" />
                  </div>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                One scan. All outlets. Zero queues. Experience the revolution in food court ordering with 
                AI-powered multi-outlet ordering and automatic split payments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white border-0 h-16 px-10 text-lg font-medium hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105"
                  onClick={() => navigate("/signup")}
                  style={{
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group h-16 px-10 text-lg font-medium border-2 hover:border-primary hover:bg-primary/5 transition-all duration-500 backdrop-blur-sm"
                  onClick={() => navigate("/order")}
                >
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    <span>Try Live Demo</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Animated Stats with Hover Effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12">
              {[
                { value: "70%", label: "Faster Ordering", color: "from-blue-500 to-cyan-500" },
                { value: "40%", label: "More Revenue", color: "from-purple-500 to-pink-500" },
                { value: "95%", label: "Less Errors", color: "from-amber-500 to-orange-500" },
                { value: "0", label: "Queues", color: "from-emerald-500 to-green-500" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-primary/30 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20">
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-gradient-shift`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Flow */}
      <section className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern bg-[size:60px_60px]" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <div className="animate-slide-up">
              <Badge variant="outline" className="border-primary/20 mb-6 backdrop-blur-sm">
                <Zap className="w-3 h-3 mr-2 animate-pulse" />
                Seamless Flow
              </Badge>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                From scan to feast in minutes
              </p>
            </div>
          </div>

          {/* Animated Flow Diagram */}
          <div className="relative">
            {/* Animated Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-glow-line" />
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: 1,
                  title: "Scan QR",
                  description: "Scan food court QR code with your phone",
                  icon: QrCode,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: 2,
                  title: "Browse All",
                  description: "Access all outlets menu in one place",
                  icon: Store,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: 3,
                  title: "Order Multi",
                  description: "Add items from different outlets to cart",
                  icon: ShoppingCart,
                  color: "from-amber-500 to-orange-500"
                },
                {
                  step: 4,
                  title: "Auto-Split",
                  description: "System automatically splits order & payment",
                  icon: Split,
                  color: "from-emerald-500 to-green-500"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Orbital Rings */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/5 group-hover:border-primary/20 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-4 rounded-2xl border border-white/5 group-hover:border-accent/20 transition-all duration-1000 group-hover:scale-105" />
                  
                  <Card 
                    className="relative backdrop-blur-xl bg-white/5 border-white/10 p-8 text-center transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        <span className="relative">{item.step}</span>
                      </div>
                    </div>
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color}/20 mx-auto mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <item.icon className="w-10 h-10 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 relative z-10">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
                      {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-background via-black/20 to-background relative overflow-hidden z-10">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <div className="animate-slide-up">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Transform Your Food Court
              </h2>
              <p className="text-xl text-muted-foreground">
                Benefits for customers, outlets, and management
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Floating Animation Container */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Card
                  className={`relative backdrop-blur-xl bg-gradient-to-br ${benefit.color} border-white/10 p-8 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden`}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                  
                  <div className="relative w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <benefit.icon className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <h3 className="relative text-xl font-semibold text-white mb-3 text-center">
                    {benefit.title}
                  </h3>
                  <p className="relative text-white/80 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
                    {benefit.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>

          {/* Animated Comparison */}
          <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="animate-slide-up">
                <h3 className="text-4xl font-bold mb-6">
                  Before & After
                </h3>
                <div className="space-y-6">
                  {[
                    { before: "Long queues at each outlet", after: "Zero queues with digital ordering", improvement: "100%" },
                    { before: "Multiple payments", after: "One-click unified payment", improvement: "80%" },
                    { before: "Manual order splitting", after: "Automatic order distribution", improvement: "95%" },
                    { before: "Limited cross-selling", after: "40% more cross-outlet orders", improvement: "40%" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <div className="relative flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white/60 line-through">{item.before}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-white font-medium">{item.after}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                            +{item.improvement}
                          </span>
                          <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                <Card className="relative backdrop-blur-xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border-white/20 p-8 overflow-hidden">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary via-accent to-primary opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative text-center">
                    <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-shift">
                      5x
                    </div>
                    <h4 className="text-2xl font-semibold text-white mb-3">
                      Faster Order Processing
                    </h4>
                    <p className="text-white/80">
                      Reduce customer wait time from 15 minutes to just 3 minutes
                    </p>
                  </div>
                  <div className="relative mt-8 flex justify-center">
                    <div className="w-full max-w-md">
                      <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-progress"
                          style={{ 
                            width: '90%',
                            backgroundSize: '200% 100%',
                            animation: 'progress 2s ease-in-out infinite alternate'
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-4 text-sm text-white/60">
                        <span className="animate-fade-in">Before: 15min</span>
                        <span className="animate-fade-in" style={{ animationDelay: '1s' }}>After: 3min</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <div className="animate-slide-up">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Smart Features
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything for modern food court management
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Effect Container */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <Card
                  className="relative backdrop-blur-xl bg-white/5 border-white/10 p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <feature.icon className="w-7 h-7 text-white relative z-10" />
                  </div>
                  <h3 className="relative text-xl font-semibold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="relative animate-slide-up">
            <Card className="relative backdrop-blur-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-white/20 p-12 md:p-16 text-center overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern bg-[size:50px_50px]" />
              
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-blob-float" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full translate-x-1/2 translate-y-1/2 animate-blob-float" style={{ animationDelay: '2s' }} />
              
              {/* Floating Particles */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}

              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Revolutionize Your Food Court?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join the future of food court ordering. Setup in 24 hours. No upfront costs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white border-0 h-16 px-10 text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105"
                    onClick={() => navigate("/signup")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center gap-2">
                      <Sparkles className="w-5 h-5 animate-spin-slow" />
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group h-16 px-10 text-lg hover:border-primary hover:bg-primary/5 transition-all duration-500 backdrop-blur-sm"
                    onClick={() => navigate("/demo")}
                  >
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 transition-transform group-hover:rotate-12" />
                      Schedule Demo
                    </div>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-white/20">
                  {[
                    "No setup fees",
                    "24-hour onboarding",
                    "Cancel anytime",
                    "24/7 support"
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 group cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-t from-black/50 via-background to-background border-t border-white/10 relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-grid-pattern bg-[size:100px_100px]" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent animate-pulse" />
                  <div className="absolute inset-2 bg-black/20 rounded-lg backdrop-blur-sm" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FoodCourtPro
                </span>
              </div>
              <p className="text-white/60 leading-relaxed">
                AI-powered unified ordering platform for modern food courts
              </p>
            </div>

            {['Platform', 'Resources', 'Legal'].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{section}</h4>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <a 
                      key={i}
                      href="#"
                      className="group block text-white/60 hover:text-white transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {section} Link {i + 1}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2025 FoodCourtPro. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['twitter', 'github', 'linkedin'].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                    {/* Social icons remain the same */}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style >{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow-line {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes progress {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        @keyframes blob-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-glow-line {
          animation: glow-line 2s linear infinite;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          background-size: 200% 100%;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
        
        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }
        
        .animate-blob-float {
          animation: blob-float 10s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--primary), var(--accent));
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, var(--accent), var(--primary));
        }
      `}</style>
    </div>
  );
};

export default Index;