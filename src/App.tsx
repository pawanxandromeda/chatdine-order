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
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  background: 'rgba(25, 25, 27, 0.55)', // translucent dark glass
                  color: '#f5f5f7', // Apple off-white text
                  borderRadius: '14px',
                  boxShadow:
                    '0 4px 24px rgba(0, 0, 0, 0.5), inset 0 0 0.5px rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  padding: '14px 16px',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                },
                classNames: {
                  title: 'text-gray-100 font-medium',
                  description: 'text-gray-400 text-sm',
                  success: 'border-l-[4px] border-l-[#30D158]', // Apple green glow
                  error: 'border-l-[4px] border-l-[#FF453A]',   // Apple red glow
                  warning: 'border-l-[4px] border-l-[#FFD60A]', // Apple yellow glow
                  info: 'border-l-[4px] border-l-[#0A84FF]',    // Apple blue glow
                },
              }}
            />
        <BrowserRouter>
          <ProperAuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order" element={<Order />} />
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
