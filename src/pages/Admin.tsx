import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { OrdersManagement } from "@/components/admin/OrdersManagement";
import { QRCodeManagement } from "@/components/admin/QRCodeManagement";
import { Analytics } from "@/components/admin/Analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border glass sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your restaurant operations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
            <TabsTrigger value="menu" className="rounded-xl">
              Menu
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl">
              Orders
            </TabsTrigger>
            <TabsTrigger value="qr" className="rounded-xl">
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6 animate-slide-up">
            <MenuManagement />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 animate-slide-up">
            <OrdersManagement />
          </TabsContent>

          <TabsContent value="qr" className="space-y-6 animate-slide-up">
            <QRCodeManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-slide-up">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
