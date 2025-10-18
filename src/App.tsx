
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from 'jotai';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import WhatsAppMarketing from "./pages/WhatsAppMarketing";
import NotFound from "./pages/NotFound";
import { SubscriptionManagement } from "./components/admin/SubscriptionManagement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
      <JotaiProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
           <Toaster position="top-right" richColors expand /> 
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
           <Route path="/subscription" element={<SubscriptionManagement />} />
          {/* redirect legacy admin subscription route to public subscription page */}
          <Route path="/admin/subscription" element={<Navigate to="/subscription" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/whatsapp-marketing" element={<WhatsAppMarketing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </JotaiProvider>
  </GoogleOAuthProvider>
);

export default App;
