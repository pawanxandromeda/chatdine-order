// app/profile/page.tsx
"use client";
import { User, Mail, Calendar, Building, Phone, MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

const Profile = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl premium-gradient flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
              <p className="text-lg text-muted-foreground">restaurant@mevoo.com</p>
              <p className="text-sm text-blue-600 font-medium mt-1">Administrator • Restaurant Owner</p>
            </div>
          </div>
          <Button className="premium-gradient text-white px-6 py-2 rounded-xl flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Restaurant Information */}
          <div className="space-y-6">
            <AnimatedCard delay={0.1}>
              <div className="p-6">
                <SectionHeader title="Restaurant Information" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Building className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Restaurant Name</p>
                      <p className="text-sm text-muted-foreground">La Bella Vista</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">123 Gourmet Street, Food District</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="p-6">
                <SectionHeader title="Business Hours" />
                <div className="space-y-3 text-sm">
                  {['Monday - Friday', 'Saturday', 'Sunday'].map((day, index) => (
                    <div key={day} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <span className="font-medium">{day}</span>
                      <span className="text-muted-foreground">11:00 AM - 10:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Account Information */}
          <div className="space-y-6">
            <AnimatedCard delay={0.3}>
              <div className="p-6">
                <SectionHeader title="Account Details" />
                <div className="grid gap-4">
                  {[
                    { label: "Full Name", value: "Admin", icon: User },
                    { label: "Email", value: "restaurant@mevoo.com", icon: Mail },
                    { label: "Joined", value: "Jan 12, 2024", icon: Calendar },
                    { label: "Last Login", value: "2 hours ago", icon: User }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="p-6">
                <SectionHeader title="Subscription" />
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-blue-900">Premium Plan</p>
                      <p className="text-sm text-blue-700">Renews on Feb 12, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-900">$99/month</p>
                      <p className="text-xs text-blue-600">All features included</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-xl">
                  Manage Subscription
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;