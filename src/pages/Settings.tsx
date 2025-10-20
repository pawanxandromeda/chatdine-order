// app/settings/page.tsx
"use client";
import { Settings as SettingsIcon, Shield, Key, Bell, Palette, Globe, Database, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";

const Settings = () => {
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="w-20 h-20 rounded-2xl premium-gradient flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            <SettingsIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-lg text-muted-foreground">Manage your restaurant preferences</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Security Settings */}
          <AnimatedCard delay={0.1}>
            <div className="p-6">
              <SectionHeader 
                title="Security & Access" 
                description="Manage your account security and access controls"
              />
              <div className="space-y-4">
                {[
                  {
                    title: "Two-factor Authentication",
                    description: "Add an extra layer of security to your account",
                    icon: Shield,
                    action: <Switch defaultChecked />
                  },
                  {
                    title: "Password Management",
                    description: "Last changed: 3 months ago",
                    icon: Key,
                    action: <Button variant="outline" size="sm">Change</Button>
                  },
                  {
                    title: "Staff Access Control",
                    description: "Manage team member permissions",
                    icon: Users,
                    action: <Button variant="outline" size="sm">Manage</Button>
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {item.action}
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Restaurant Settings */}
          <AnimatedCard delay={0.2}>
            <div className="p-6">
              <SectionHeader 
                title="Restaurant Configuration" 
                description="Configure your restaurant settings and preferences"
              />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Online Orders",
                    description: "Accept orders through website and app",
                    icon: Bell,
                    enabled: true
                  },
                  {
                    title: "Table Reservations",
                    description: "Allow customers to book tables online",
                    icon: Users,
                    enabled: true
                  },
                  {
                    title: "Delivery Service",
                    description: "Enable delivery order processing",
                    icon: Database,
                    enabled: false
                  },
                  {
                    title: "Takeaway",
                    description: "Allow takeaway order preparation",
                    icon: Palette,
                    enabled: true
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Application Settings */}
          <AnimatedCard delay={0.3}>
            <div className="p-6">
              <SectionHeader 
                title="Application Preferences" 
                description="Customize your application experience"
              />
              <div className="space-y-4">
                {[
                  {
                    title: "Analytics & Reporting",
                    description: "Share anonymized data to improve Mevoo",
                    icon: Database
                  },
                  {
                    title: "Auto-update Menu",
                    description: "Automatically sync menu changes",
                    icon: Globe
                  },
                  {
                    title: "Email Notifications",
                    description: "Receive order and reservation alerts",
                    icon: Bell
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={index !== 0} />
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6 border border-red-200 rounded-2xl bg-red-50/50">
              <SectionHeader 
                title="Danger Zone" 
                description="Irreversible and destructive actions"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white">
                  <div>
                    <p className="font-medium text-red-900">Delete Menu Data</p>
                    <p className="text-sm text-red-700">Permanently remove all menu items</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white">
                  <div>
                    <p className="font-medium text-red-900">Close Restaurant</p>
                    <p className="text-sm text-red-700">Temporarily disable all services</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;