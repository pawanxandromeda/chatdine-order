import { useState } from "react";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { OrdersManagement } from "@/components/admin/OrdersManagement";
import { QRCodeManagement } from "@/components/admin/QRCodeManagement";
import { Analytics } from "@/components/admin/Analytics";
import { PaymentSettings } from "@/components/admin/PaymentSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 animate-slide-up flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Restaurant Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your restaurant operations in one place
            </p>
          </div>
          <Link to="/login">
            <Button variant="outline" className="rounded-2xl">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-2xl p-1 h-auto glass">
            <TabsTrigger
              value="menu"
              className="rounded-xl data-[state=active]:premium-gradient data-[state=active]:text-white py-3"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-xl data-[state=active]:premium-gradient data-[state=active]:text-white py-3"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="rounded-xl data-[state=active]:premium-gradient data-[state=active]:text-white py-3"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="qr"
              className="rounded-xl data-[state=active]:premium-gradient data-[state=active]:text-white py-3"
            >
              QR Codes
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl data-[state=active]:premium-gradient data-[state=active]:text-white py-3"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="animate-fade-in">
            <MenuManagement />
          </TabsContent>

          <TabsContent value="orders" className="animate-fade-in">
            <OrdersManagement />
          </TabsContent>

          <TabsContent value="payments" className="animate-fade-in">
            <PaymentSettings />
          </TabsContent>

          <TabsContent value="qr" className="animate-fade-in">
            <QRCodeManagement />
          </TabsContent>

          <TabsContent value="analytics" className="animate-fade-in">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
