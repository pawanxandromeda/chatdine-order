import { useState } from "react";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { OrdersManagement } from "@/components/admin/OrdersManagement";
import { QRCodeManagement } from "@/components/admin/QRCodeManagement";
import { Analytics } from "@/components/admin/Analytics";
import { PaymentSettings } from "@/components/admin/PaymentSettings";
import { SubscriptionManagement } from "@/components/admin/SubscriptionManagement";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("menu");

  const getHeaderContent = () => {
    switch (activeTab) {
      case "menu":
        return {
          title: "Menu Management",
          description: "Manage your restaurant menu items and categories",
          stats: [
            { label: "Total Items", value: "48", trend: "+5 this week" },
            { label: "Categories", value: "8", trend: "2 active" },
            { label: "Avg Price", value: "₹250", trend: "+₹20" },
          ],
        };
      case "orders":
        return {
          title: "Orders Management",
          description: "Track and manage customer orders in real-time",
          stats: [
            { label: "Today's Orders", value: "127", trend: "+18%" },
            { label: "Pending", value: "8", trend: "2 urgent" },
            { label: "Revenue", value: "₹31,450", trend: "+12%" },
          ],
        };
      case "payments":
        return {
          title: "Payment Settings",
          description: "Configure payment gateways and view transactions",
          stats: [
            { label: "Total Revenue", value: "₹4.2L", trend: "+24%" },
            { label: "Transactions", value: "1,247", trend: "This month" },
            { label: "Success Rate", value: "99.2%", trend: "+0.5%" },
          ],
        };
      case "subscription":
        return {
          title: "Subscription Management",
          description: "Manage your Mevoo subscription and billing",
          stats: [
            { label: "Current Plan", value: "Pro", trend: "Active" },
            { label: "Orders Used", value: "1,247", trend: "Unlimited" },
            { label: "AI Usage", value: "₹684", trend: "This month" },
          ],
        };
      case "qr":
        return {
          title: "QR Code Management",
          description: "Generate and manage QR codes for tables",
          stats: [
            { label: "Active Codes", value: "24", trend: "12 tables" },
            { label: "Scans Today", value: "89", trend: "+15%" },
            { label: "Avg Time", value: "4.2m", trend: "Per scan" },
          ],
        };
      case "analytics":
        return {
          title: "Analytics & Insights",
          description: "View detailed analytics and performance metrics",
          stats: [
            { label: "Total Orders", value: "5.2K", trend: "+32%" },
            { label: "Revenue", value: "₹12.4L", trend: "+28%" },
            { label: "Avg Order", value: "₹238", trend: "+5%" },
          ],
        };
      default:
        return {
          title: "Dashboard",
          description: "Welcome to your restaurant dashboard",
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-background w-full">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <AdminHeader {...getHeaderContent()} />

        <main className="flex-1 p-6">
          <div className="animate-fade-in">
            {activeTab === "menu" && <MenuManagement />}
            {activeTab === "orders" && <OrdersManagement />}
            {activeTab === "payments" && <PaymentSettings />}
            {activeTab === "subscription" && <SubscriptionManagement />}
            {activeTab === "qr" && <QRCodeManagement />}
            {activeTab === "analytics" && <Analytics />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
