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

import { ProperAuthProvider } from './auth/ProperAuthProvider';
import { RequireAuth } from './auth/RequireAuth';
import { getDefaultStore } from 'jotai';
import { accessTokenAtom, userAtom } from '@/atoms/userAtom';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import FoodCourtPage from "./pages/FoodCourtPage";

const store = getDefaultStore();
const token = localStorage.getItem('accessToken');
if (token) store.set(accessTokenAtom, token);

const queryClient = new QueryClient();
  
const App = () => (
 <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
  <JotaiProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
    <Toaster
  position="top-right"
  closeButton
  richColors
  expand
  toastOptions={{
    duration: 4000,
    style: {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 0.92)',
      color: '#1a1a1a',
      borderRadius: '20px',
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 0 0 1px rgba(255, 255, 255, 0.4)
      `,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontFamily: '-apple-system, SF Pro, Helvetica Neue, Arial, sans-serif',
      fontSize: '0.95rem',
      fontWeight: 500,
      padding: '16px 20px',
      letterSpacing: '-0.01em',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: 'translateY(0)',
      opacity: 1,
    },
    classNames: {
      title: 'text-gray-900 font-semibold font-[-apple-system,SF_Pro,Helvetica_Neue,Arial,sans-serif]',
      description: 'text-gray-600 text-sm font-medium font-[-apple-system,SF_Pro,Helvetica_Neue,Arial,sans-serif]',
      success: `
        border-l-[6px] border-l-[#10B981] 
        shadow-[0_8px_32px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        bg-gradient-to-r from-white to-[#F0FDF4]
      `,
      error: `
        border-l-[6px] border-l-[#EF4444] 
        shadow-[0_8px_32px_rgba(239,68,68,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        bg-gradient-to-r from-white to-[#FEF2F2]
      `,
      warning: `
        border-l-[6px] border-l-[#F59E0B] 
        shadow-[0_8px_32px_rgba(245,158,11,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        bg-gradient-to-r from-white to-[#FFFBEB]
      `,
      info: `
        border-l-[6px] border-l-[#3B82F6] 
        shadow-[0_8px_32px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        bg-gradient-to-r from-white to-[#EFF6FF]
      `,
      closeButton: `
        bg-transparent hover:bg-gray-100/80 
        border border-transparent hover:border-gray-200/60
        rounded-2xl transition-all duration-300
        backdrop-blur-sm
      `,
      icon: `
        bg-white/80 backdrop-blur-sm 
        border border-gray-200/60
        shadow-sm
      `,
    },
  }}
/>
        <BrowserRouter>
          <ProperAuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order/:tableNumber" element={<Order />} />
                <Route path="/food-court/:id" element={<FoodCourtPage />} />
              <Route path="/admin/*" element={
                <RequireAuth>
                  <Admin />
                </RequireAuth>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/subscription" element={<SubscriptionManagement />} />
              <Route path="/admin/subscription" element={<Navigate to="/subscription" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/whatsapp-marketing" element={<WhatsAppMarketing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProperAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </JotaiProvider>
</GoogleOAuthProvider>

);

export default App;
