// src/pages/FoodCourtPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  CardMedia, Button, IconButton, Badge, Drawer, List,
  ListItem, ListItemText, Divider, TextField, Chip,
  Paper, InputAdornment, CircularProgress, Alert, Snackbar, 
  Dialog, DialogTitle, DialogContent, DialogActions, Avatar, 
  ListItemAvatar, Rating, FormControl, Select, MenuItem,
  BottomNavigation, BottomNavigationAction, Slide, Grow,
  Tooltip, useTheme, ThemeProvider, createTheme, CssBaseline, GlobalStyles
} from '@mui/material';
import { useMediaQuery } from '@mui/material';

import {
  ShoppingCart as ShoppingCartIcon,
  Restaurant as RestaurantIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  History as HistoryIcon,
  Chat as ChatIcon,
  Receipt as ReceiptIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Recommend as RecommendIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Spa as SpaIcon,
  Verified as VerifiedIcon,
  Bolt as BoltIcon,
  Euro as CurrencyIcon,
  Groups as GroupsIcon,
  AddShoppingCart as AddShoppingCartIcon,
  ChevronRight as ChevronRightIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Ultra Premium Apple-inspired Theme
const appleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d1d1f',
      light: '#424245',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0071e3',
      light: '#42a5f5',
      dark: '#0051a2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fbfbfd',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#86868b',
    },
    success: { main: '#30d158' },
    warning: { main: '#ff9f0a' },
    error: { main: '#ff453a' },
    info: { main: '#0a84ff' },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.025em', lineHeight: 1.1 },
    h2: { fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.015em' },
    h4: { fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.01em' },
    h5: { fontWeight: 600, fontSize: '1rem' },
    h6: { fontWeight: 600, fontSize: '0.875rem' },
    subtitle1: { fontWeight: 500, fontSize: '0.9375rem', letterSpacing: '-0.01em' },
    subtitle2: { fontWeight: 500, fontSize: '0.8125rem', letterSpacing: '-0.005em' },
    body1: { fontSize: '0.9375rem', lineHeight: 1.47, letterSpacing: '-0.01em' },
    body2: { fontSize: '0.8125rem', lineHeight: 1.43, letterSpacing: '-0.005em' },
    caption: { fontSize: '0.6875rem', letterSpacing: '0.01em', fontWeight: 400 },
    button: { fontWeight: 500, textTransform: 'none', fontSize: '0.875rem', letterSpacing: '-0.01em' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '0.5px solid rgba(0,0,0,0.05)',
          transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:active': { transform: 'scale(0.98)' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500, fontSize: '0.75rem', height: 28 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            fontSize: '0.875rem',
            '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.15)' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 },
      },
    },
  },
});

// Styled Components
const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'saturate(180%) blur(20px)',
  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
  border: '0.5px solid rgba(255,255,255,0.6)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 12,
  }
}));

const PremiumButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 500,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: '#fff',
  fontWeight: 500,
  '&:hover': {
    background: theme.palette.secondary.dark,
  },
}));

// Types
interface FoodCourt {
  _id: string;
  name: string;
  city: string;
  outlets: string[];
  address?: string;
  phone?: string;
  email?: string;
  openingHours?: string;
  logo?: string;
  description?: string;
}

interface Outlet {
  _id: string;
  restaurantName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cuisineType?: string;
  rating?: number;
  image?: string;
  description?: string;
  deliveryTime?: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  featured: boolean;
  available: boolean;
  image?: string;
  owner: Outlet | string;
  salesCount: number;
  rating?: number;
  preparationTime?: number;
  ingredients?: string[];
  dietaryInfo?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    spicyLevel?: number;
    calories?: number;
  };
  tags?: string[];
}

interface CartItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  outletName: string;
  image?: string;
  category?: string;
  specialInstructions?: string;
}

interface Order {
  _id: string;
  tableNumber: string;
  items: Array<{
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderNumber: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: MenuItem[];
}

interface FoodCourtStats {
  foodCourt: { id: string; name: string; city: string };
  outletCount: number;
  totalMenus: number;
  availableMenus: number;
  featuredCount: number;
  categories: string[];
  totalSales?: number;
  popularItems?: MenuItem[];
  trendingItems?: MenuItem[];
}

// Tab Panel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

const FoodCourtPage: React.FC = () => {
  const { id: foodCourtId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [foodCourt, setFoodCourt] = useState<FoodCourt | null>(null);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<{ items: CartItem[]; tableNumber: string }>({
    items: [],
    tableNumber: localStorage.getItem('tableNumber') || '1'
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<FoodCourtStats | null>(null);
  const [loading, setLoading] = useState({ page: true, menus: false, checkout: false });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableNumber, setTableNumber] = useState<string>(localStorage.getItem('tableNumber') || '1');
  
  // UI State
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [orderSuccessDialogOpen, setOrderSuccessDialogOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Hi! I'm your food assistant. What would you like today?", isUser: false, timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api/checkout';

  // Calculations
  const calculateCartTotal = useCallback(() => cart.items.reduce((t, i) => t + i.price * i.quantity, 0), [cart.items]);
  const calculateTax = useCallback(() => calculateCartTotal() * 0.18, [calculateCartTotal]);
  const calculateGrandTotal = useCallback(() => calculateCartTotal() + calculateTax(), [calculateCartTotal, calculateTax]);

 const filterMenusByOutlets = async (
  outletIds: string[],
  category: string = "all"
) => {
  try {
    setLoading(prev => ({ ...prev, menus: true }));

    const params = new URLSearchParams();

    // If no outlets selected → DON'T pass outletIds (backend will return all)
    if (outletIds.length > 0) {
      params.append("outletIds", outletIds.join(","));
    }

    if (category !== "all") {
      params.append("category", category);
    }

    const response = await axios.get(
      `${API_BASE}/foodcourts/${foodCourtId}/menus/filter?${params.toString()}`
    );

    if (response.data.success) {
      setFilteredMenus(response.data.data);
      showSnackbar("Filter applied", "success");
    }
  } catch (error) {
    // Fallback to client-side filtering
    applyClientSideFilters(outletIds, category);
  } finally {
    setLoading(prev => ({ ...prev, menus: false }));
  }
};

  const applyClientSideFilters = (outletIds: string[], category: string) => {
  let filtered = [...menus];

  // Apply outlet filter ONLY when outlets are selected
  if (outletIds.length > 0) {
    filtered = filtered.filter(menu => {
      const ownerId =
        typeof menu.owner === "string" ? menu.owner : menu.owner?._id;
      return outletIds.includes(ownerId);
    });
  }

  // Apply category filter
  if (category !== "all") {
    filtered = filtered.filter(menu => menu.category === category);
  }

  setFilteredMenus(filtered);
};

// Replace the useEffect that handles filtering with this:
useEffect(() => {
  const timer = setTimeout(() => {
    // If we have no filters selected, show all menus
    if (selectedOutlets.length === 0 && selectedCategory === 'all') {
      setFilteredMenus(menus);
    } 
    // If we have a search query, use the search function
    else if (searchQuery.trim().length >= 2) {
      searchMenus(searchQuery);
    }
    // Otherwise apply filters
    else {
      if (selectedOutlets.length > 0) {
        filterMenusByOutlets(selectedOutlets, selectedCategory);
      } else {
        applyClientSideFilters(selectedOutlets, selectedCategory);
      }
    }
  }, 300);
  
  return () => clearTimeout(timer);
}, [selectedOutlets, selectedCategory, searchQuery, menus]);

// Also update the initial data fetching to set filteredMenus properly:
useEffect(() => {
  if (!foodCourtId) return;
  const fetchInitialData = async () => {
    try {
      setLoading(prev => ({ ...prev, page: true }));
      const [foodCourtRes, outletsRes, menusRes, categoriesRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/foodcourts`),
        axios.get(`${API_BASE}/foodcourts/${foodCourtId}/outlets`),
        axios.get(`${API_BASE}/foodcourts/${foodCourtId}/menus`),
        axios.get(`${API_BASE}/foodcourts/${foodCourtId}/categories`),
        axios.get(`${API_BASE}/foodcourts/${foodCourtId}/stats`)
      ]);
      const currentCourt = foodCourtRes.data.data.find((fc: FoodCourt) => fc._id === foodCourtId);
      setFoodCourt(currentCourt);
      setOutlets(outletsRes.data.data);
      
      // Set menus and filteredMenus to the same data initially
      const initialMenus = menusRes.data.data;
      setMenus(initialMenus);
      setFilteredMenus(initialMenus); // This is key!
      
      setCategories(['all', ...categoriesRes.data.data]);
      setStats(statsRes.data.data);
      const savedCart = localStorage.getItem(`cart_${foodCourtId}_${tableNumber}`);
      if (savedCart) setCart(JSON.parse(savedCart));
      await fetchOrderHistory();
      setLoading(prev => ({ ...prev, page: false }));
    } catch (error) {
      showSnackbar('Error loading data', 'error');
      setLoading(prev => ({ ...prev, page: false }));
    }
  };
  fetchInitialData();
}, [foodCourtId, tableNumber]);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({ open: true, message, severity });
  };

  const searchMenus = async (query: string) => {
    if (query.trim().length < 2) {
      if (selectedOutlets.length > 0 || selectedCategory !== 'all') {
        filterMenusByOutlets(selectedOutlets, selectedCategory);
      } else {
        setFilteredMenus(menus);
      }
      return;
    }
    try {
      setLoading(prev => ({ ...prev, menus: true }));
      const params = new URLSearchParams();
      params.append('q', query);
      if (selectedOutlets.length > 0) params.append('outletIds', selectedOutlets.join(','));
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      const response = await axios.get(`${API_BASE}/foodcourts/${foodCourtId}/search?${params.toString()}`);
      setFilteredMenus(response.data.data);
    } catch (error) {
      const queryLower = query.toLowerCase();
      let filtered = [...menus];
      if (selectedOutlets.length > 0) filtered = filtered.filter(menu => typeof menu.owner !== 'string' && selectedOutlets.includes(menu.owner._id));
      if (selectedCategory !== 'all') filtered = filtered.filter(menu => menu.category === selectedCategory);
      filtered = filtered.filter(menu => menu.name.toLowerCase().includes(queryLower) || menu.description.toLowerCase().includes(queryLower));
      setFilteredMenus(filtered);
    } finally {
      setLoading(prev => ({ ...prev, menus: false }));
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE}/foodcourts/${foodCourtId}/table/${tableNumber}/orders`);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Cart Operations
  const addToCart = async (menuItem: MenuItem) => {
    try {
      const outletName = typeof menuItem.owner !== 'string' ? menuItem.owner.restaurantName : 'Unknown';
      const response = await axios.post(`${API_BASE}/foodcourts/${foodCourtId}/cart/${tableNumber}/add`, { menuId: menuItem._id, quantity: 1 });
      if (response.data.success) {
        setCart(response.data.data);
        localStorage.setItem(`cart_${foodCourtId}_${tableNumber}`, JSON.stringify(response.data.data));
        showSnackbar(`Added ${menuItem.name}`, 'success');
        setMenus(prev => prev.map(item => item._id === menuItem._id ? { ...item, salesCount: item.salesCount + 1 } : item));
      }
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || 'Error adding to cart', 'error');
    }
  };

  const updateCartItemQuantity = async (menuId: string, newQuantity: number) => {
    if (newQuantity < 1) { removeFromCart(menuId); return; }
    try {
      const response = await axios.patch(`${API_BASE}/foodcourts/${foodCourtId}/cart/${tableNumber}/update/${menuId}`, { quantity: newQuantity });
      if (response.data.success) {
        setCart(response.data.data);
        localStorage.setItem(`cart_${foodCourtId}_${tableNumber}`, JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (menuId: string) => {
    try {
      const response = await axios.delete(`${API_BASE}/foodcourts/${foodCourtId}/cart/${tableNumber}/remove/${menuId}`);
      if (response.data.success) {
        setCart(response.data.data);
        localStorage.setItem(`cart_${foodCourtId}_${tableNumber}`, JSON.stringify(response.data.data));
        showSnackbar('Item removed', 'info');
      }
    } catch (error) {
      console.error('Error removing:', error);
    }
  };

  const clearCart = () => {
    setCart({ items: [], tableNumber });
    localStorage.removeItem(`cart_${foodCourtId}_${tableNumber}`);
    showSnackbar('Cart cleared', 'info');
  };

const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Already loaded
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("Razorpay SDK loaded");
      resolve(true);
    };

    script.onerror = () => {
      console.error("Razorpay SDK failed to load");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};


const openRazorpay = (razorpayOrder: any) => {
  // 🛑 Safety check
  if (!(window as any).Razorpay) {
    showSnackbar("Razorpay SDK not loaded", "error");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // test/live key_id
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency || "INR",
    name: "Food Court",
    description: "Order Payment",
    order_id: razorpayOrder.id,

    handler: async (response: any) => {
      try {
        await finalizeCheckout(response);
        showSnackbar("Payment successful", "success");
      } catch (err) {
        showSnackbar("Payment captured but order failed", "error");
      }
    },

    modal: {
      ondismiss: () => {
        showSnackbar("Payment cancelled", "info");
      }
    },

    prefill: {
      name: "Guest",
      email: "guest@foodcourt.com",
      contact: "9999999999"
    },

    theme: {
      color: "#1d1d1f"
    }
  };

  // ✅ THIS WAS MISSING
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

const finalizeCheckout = async (razorpayResponse: any) => {
  try {
    const response = await axios.post(
      `${API_BASE}/foodcourts/${foodCourtId}/cart/${tableNumber}/checkout`,
      {
        paymentCaptured: true,
        razorpay: {
          payment_id: razorpayResponse.razorpay_payment_id,
          order_id: razorpayResponse.razorpay_order_id,
          signature: razorpayResponse.razorpay_signature
        },
        paymentMethod: "online",
        specialInstructions: cart.items
          .map(item => `${item.name}: ${item.specialInstructions || "None"}`)
          .join("; ")
      }
    );

    if (response.data.success) {
      setCart({ items: [], tableNumber });
      localStorage.removeItem(`cart_${foodCourtId}_${tableNumber}`);
      setCheckoutDialogOpen(false);
      setOrderSuccessDialogOpen(true);
      await fetchOrderHistory();
      showSnackbar("Order placed successfully", "success");
    }

  } catch (error: any) {
    showSnackbar("Payment done but order failed. Contact support.", "error");
  }
};

  // Checkout
const handleCheckout = async () => {
  try {
    setLoading(prev => ({ ...prev, checkout: true }));
    
     const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      showSnackbar("Razorpay SDK failed to load", "error");
      return;
    }

    // 1️⃣ Ask backend to create Razorpay order
    
const { data } = await axios.post(
  `http://localhost:5000/api/checkout/foodcourts/693956e9d5a96682b3991475/cart/4/initiate`,
  {
    amount: calculateGrandTotal(), // in rupees
    foodCourtId,
    tableNumber,
  }
);
console.log("ORDER API RESPONSE:", data);
    // 2️⃣ Open Razorpay modal
    openRazorpay(data.razorpayOrder);

  } catch (error: any) {
    showSnackbar("Unable to initiate payment", "error");
  } finally {
    setLoading(prev => ({ ...prev, checkout: false }));
  }
};


  // Chat
  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMessage = chatInput.trim();
    const newUserMessage: ChatMessage = { id: Date.now().toString(), text: userMessage, isUser: true, timestamp: new Date() };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsChatLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/foodcourts/${foodCourtId}/cart/${tableNumber}/chat`, { message: userMessage });
      if (response.data.success) {
        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: response.data.response, isUser: false, timestamp: new Date() };
        setChatMessages(prev => [...prev, aiMessage]);
        if (response.data.cart) {
          setCart(response.data.cart);
          localStorage.setItem(`cart_${foodCourtId}_${tableNumber}`, JSON.stringify(response.data.cart));
        }
      }
    } catch (error) {
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: 'Sorry, please try again.', isUser: false, timestamp: new Date() };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Menu Item Card Component
  const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const outlet = typeof item.owner !== 'string' ? item.owner : null;
    const cartItem = cart.items.find(ci => ci.menuId === item._id);
    
    return (
      <GlassCard sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
        p: 0
      }}>
        <Box sx={{ position: 'relative', pt: isMobile ? '56%' : '65%' }}>
          <CardMedia
            component="img"
            image={item.image || '/api/placeholder/400/260'}
            alt={item.name}
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          {item.featured && (
            <Box sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'rgba(255,255,255,0.95)',
              borderRadius: 2,
              px: 1,
              py: 0.25,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backdropFilter: 'blur(10px)'
            }}>
              <StarIcon sx={{ fontSize: 12, color: '#ff9f0a' }} />
              <Typography sx={{ fontSize: '0.625rem', fontWeight: 600 }}>Featured</Typography>
            </Box>
          )}
          {!item.available && (
            <Box sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>Sold Out</Typography>
            </Box>
          )}
        </Box>
        
          <CardContent sx={{ flexGrow: 1, p: 2, pb: 1.5, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.3, pr: 1, flex: 1 }}>
              {item.name}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: 'text.primary', whiteSpace: 'nowrap' }}>
              ₹{item.price}
            </Typography>
          </Box>
          
          <Typography sx={{ 
            fontSize: '0.75rem', 
            color: 'text.secondary', 
            mb: 1.5,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {item.description}
          </Typography>
          
          {item.dietaryInfo && (
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
              {item.dietaryInfo.vegetarian && (
                <Chip icon={<SpaIcon sx={{ fontSize: '12px !important' }} />} label="Veg" size="small" 
                  sx={{ height: 22, fontSize: '0.625rem', bgcolor: 'rgba(48,209,88,0.1)', '& .MuiChip-icon': { ml: 0.5 } }} />
              )}
              {item.dietaryInfo.vegan && (
                <Chip icon={<VerifiedIcon sx={{ fontSize: '12px !important' }} />} label="Vegan" size="small" 
                  sx={{ height: 22, fontSize: '0.625rem', bgcolor: 'rgba(48,209,88,0.1)' }} />
              )}
              {item.dietaryInfo.spicyLevel && item.dietaryInfo.spicyLevel > 0 && (
                <Chip icon={<BoltIcon sx={{ fontSize: '12px !important' }} />} label={`${item.dietaryInfo.spicyLevel}/5`} size="small" 
                  sx={{ height: 22, fontSize: '0.625rem', bgcolor: 'rgba(255,159,10,0.1)' }} />
              )}
            </Box>
          )}
          
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>
                {outlet?.restaurantName || 'Restaurant'}
              </Typography>
              {item.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 0.25 }}>
                  <Rating value={item.rating} size="small" readOnly sx={{ fontSize: '0.75rem' }} />
                  <Typography sx={{ fontSize: '0.625rem', color: 'text.secondary' }}>{item.rating.toFixed(1)}</Typography>
                </Box>
              )}
            </Box>
            
            {cartItem ? (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5, 
                bgcolor: 'rgba(0,0,0,0.04)', 
                borderRadius: 3, 
                p: 0.25
              }}>
                <IconButton size="small" onClick={() => updateCartItemQuantity(item._id, cartItem.quantity - 1)} sx={{ p: 0.5, width: 28, height: 28 }}>
                  <RemoveIcon sx={{ fontSize: 14 }} />
                </IconButton>
                <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600, fontSize: '0.8125rem' }}>
                  {cartItem.quantity}
                </Typography>
                <IconButton size="small" onClick={() => updateCartItemQuantity(item._id, cartItem.quantity + 1)} sx={{ p: 0.5, width: 28, height: 28 }}>
                  <AddIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ) : (
              <SecondaryButton
                size="small"
                onClick={() => addToCart(item)}
                disabled={!item.available}
                startIcon={<AddShoppingCartIcon sx={{ fontSize: '14px !important' }} />}
                sx={{ 
                  borderRadius: 3, 
                  py: isMobile ? 1 : 0.75,
                  width: isMobile ? '100%' : 'auto',
                  px: 1.5, 
                  minWidth: 'auto',
                  fontSize: '0.75rem'
                }}
              >
                Add
              </SecondaryButton>
            )}
          </Box>
        </CardContent>
      </GlassCard>
    );
  };

  // Loading State
  if (loading.page) {
    return (
      <ThemeProvider theme={appleTheme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
          bgcolor: '#fbfbfd',
          gap: 3
        }}>
          <CircularProgress size={32} thickness={4} sx={{ color: '#1d1d1f' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>Loading</Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Please wait...</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (!foodCourt) {
    return (
      <ThemeProvider theme={appleTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#fbfbfd', p: 3 }}>
          <GlassCard sx={{ p: 4, maxWidth: 340, textAlign: 'center' }}>
            <Alert severity="error" sx={{ borderRadius: 3, mb: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>Not Found</Typography>
              <Typography sx={{ fontSize: '0.8125rem', mt: 0.5 }}>Please scan the QR code again.</Typography>
            </Alert>
            <PremiumButton fullWidth onClick={() => navigate('/')} startIcon={<ArrowBackIcon />}>
              Go Back
            </PremiumButton>
          </GlassCard>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={appleTheme}>
      <CssBaseline />
      <GlobalStyles styles={{
        '*': { WebkitTapHighlightColor: 'transparent' },
        'body': { overscrollBehavior: 'none' }
      }} />
      
      <Box sx={{ bgcolor: '#fbfbfd', minHeight: '100vh', pb: isMobile ? 10 : 3 }}>
        {/* Compact Header */}
        <Box sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 100,
          bgcolor: 'rgba(251,251,253,0.72)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '0.5px solid rgba(0,0,0,0.1)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: isMobile ? 1.25 : 2,
            py: isMobile ? 1 : 1.5,
            maxWidth: 'lg',
            mx: 'auto'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton onClick={() => navigate('/')} sx={{ p: 0.5, mr: 0.5 }} size="small">
                <ArrowBackIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.2 }}>
                  {foodCourt.name}
                </Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 10 }} />
                  {foodCourt.city} • Table {tableNumber}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={() => setChatOpen(true)} sx={{ p: isMobile ? 1.25 : 1 }}>
                <ChatIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => setCartOpen(true)} sx={{ p: isMobile ? 1.25 : 1 }}>
                <Badge badgeContent={cart.items.length} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.625rem', minWidth: 16, height: 16 } }}>
                  <ShoppingCartIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ pt: 2 }}>
          {/* Table Selection */}
          <GlassCard sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>Your Table</Typography>
              <GroupsIcon sx={{ fontSize: 16, opacity: 0.5 }} />
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={tableNumber}
                onChange={(e) => {
                  setTableNumber(e.target.value);
                  localStorage.setItem('tableNumber', e.target.value);
                }}
                sx={{ 
                  borderRadius: 3, 
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.08)' }
                }}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <MenuItem key={i + 1} value={(i + 1).toString()} sx={{ fontSize: '0.875rem' }}>
                    Table {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GlassCard>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim().length >= 2) searchMenus(e.target.value);
            }}
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>,
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => { setSearchQuery(''); setFilteredMenus(menus); }}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { bgcolor: '#fff', fontSize: '0.875rem' }
            }}
            sx={{ mb: 2 }}
          />

          {/* Quick Filters */}
          <Box sx={{ mb: 2.5, px: isMobile ? 1 : 0 }}>

            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0, px: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
               <IconButton onClick={() => setFilterDrawerOpen(true)} sx={{ borderRadius: 2, border: '1px solid rgba(0,0,0,0.12)', p: 1 }}>
                <FilterIcon sx={{ fontSize: 16 }} />
              </IconButton>

              <Chip icon={<StarIcon sx={{ fontSize: '12px !important' }} />} label="Featured" onClick={() => { setFilteredMenus(menus.filter(i => i.featured)); setActiveTab(0); }}
                variant="outlined" sx={{ borderRadius: 2, fontSize: '0.75rem' }} />
              <Chip icon={<TrendingUpIcon sx={{ fontSize: '12px !important' }} />} label="Trending" onClick={() => { setFilteredMenus([...menus].sort((a, b) => b.salesCount - a.salesCount).slice(0, 10)); }}
                variant="outlined" sx={{ borderRadius: 2, fontSize: '0.75rem' }} />
              <Chip icon={<RecommendIcon sx={{ fontSize: '12px !important' }} />} label="For You" onClick={() => setChatOpen(true)}
                variant="outlined" sx={{ borderRadius: 2, fontSize: '0.75rem' }} />
              <Chip icon={<SpaIcon sx={{ fontSize: '12px !important' }} />} label="Veg" onClick={() => { setFilteredMenus(menus.filter(i => i.dietaryInfo?.vegetarian)); }}
                variant="outlined" sx={{ borderRadius: 2, fontSize: '0.75rem' }} />
             
            </Box>
          </Box>

        
       

          {/* Menu Tab */}
          <TabPanel value={activeTab} index={0}>
            {loading.menus ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress size={28} sx={{ color: '#1d1d1f' }} />
              </Box>
            ) : filteredMenus.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>No items found</Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Try different filters</Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {filteredMenus.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} key={item._id}>
                    <Grow in timeout={index * 50}>
                      <div><MenuItemCard item={item} /></div>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Outlets Tab */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              {outlets.map((outlet) => (
                <Grid item xs={12} sm={6} md={4} key={outlet._id}>
                  <GlassCard sx={{ overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative', pt: '50%' }}>
                      <CardMedia
                        component="img"
                        image={outlet.image || '/api/placeholder/400/200'}
                        alt={outlet.restaurantName}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Avatar src={outlet.image} sx={{ width: 44, height: 44, border: '2px solid #fff', boxShadow: 1 }}>
                          <RestaurantIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', mb: 0.25 }}>{outlet.restaurantName}</Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{outlet.cuisineType || 'Multi-cuisine'}</Typography>
                        </Box>
                        <Chip
                          label={selectedOutlets.includes(outlet._id) ? 'Selected' : 'Select'}
                          onClick={() => {
                            if (selectedOutlets.includes(outlet._id)) {
                              setSelectedOutlets(prev => prev.filter(id => id !== outlet._id));
                            } else {
                              setSelectedOutlets(prev => [...prev, outlet._id]);
                            }
                          }}
                          size="small"
                          sx={{
                            borderRadius: 2,
                            fontSize: '0.6875rem',
                            height: 24,
                            bgcolor: selectedOutlets.includes(outlet._id) ? '#1d1d1f' : 'transparent',
                            color: selectedOutlets.includes(outlet._id) ? '#fff' : 'text.secondary',
                            border: '1px solid',
                            borderColor: selectedOutlets.includes(outlet._id) ? '#1d1d1f' : 'rgba(0,0,0,0.12)'
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Rating value={outlet.rating || 4.5} size="small" readOnly sx={{ fontSize: '0.875rem' }} />
                          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{outlet.rating || 4.5}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>{outlet.deliveryTime || '15-25 min'}</Typography>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Orders Tab */}
          <TabPanel value={activeTab} index={2}>
            {orders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ReceiptIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>No orders yet</Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Your orders will appear here</Typography>
              </Box>
            ) : (
              <List disablePadding>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <ListItem sx={{ px: 0, py: 2, gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.04)', color: 'text.primary', width: 44, height: 44 }}>
                        <ReceiptIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <ListItemText
                        primary={<Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>#{order.orderNumber}</Typography>}
                        secondary={
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
<Typography sx={{ fontSize: '0.8125rem' }}>
  ₹{Number(order.totalAmount || 0).toFixed(2)} • {order.items.length} items
</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip
                                label={order.status}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.625rem',
                                  fontWeight: 600,
                                  bgcolor:
                                    order.status === 'delivered' ? 'rgba(48,209,88,0.15)' :
                                    order.status === 'preparing' ? 'rgba(255,159,10,0.15)' :
                                    order.status === 'pending' ? 'rgba(10,132,255,0.15)' : 'rgba(255,69,58,0.15)',
                                  color:
                                    order.status === 'delivered' ? '#248a3d' :
                                    order.status === 'preparing' ? '#c93400' :
                                    order.status === 'pending' ? '#0051a2' : '#d70015'
                                }}
                              />
                              <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </TabPanel>

          {/* Info Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <GlassCard sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Info sx={{ fontSize: 18 }} />
                    About
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                    {foodCourt.description || 'Premium dining destination with curated culinary experiences.'}
                  </Typography>
                  {stats && (
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {stats.categories.map(cat => (
                        <Chip key={cat} label={cat} size="small" sx={{ fontSize: '0.6875rem', height: 24 }} />
                      ))}
                    </Box>
                  )}
                </GlassCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <GlassCard sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18 }} />
                    Contact
                  </Typography>
                  <List dense disablePadding>
                    {foodCourt.address && (
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar><Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(0,0,0,0.04)' }}><LocationOnIcon sx={{ fontSize: 16 }} /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Address</Typography>}
                          secondary={<Typography sx={{ fontSize: '0.8125rem' }}>{foodCourt.address}</Typography>} />
                      </ListItem>
                    )}
                    {foodCourt.phone && (
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar><Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(0,0,0,0.04)' }}><PhoneIcon sx={{ fontSize: 16 }} /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Phone</Typography>}
                          secondary={<Typography sx={{ fontSize: '0.8125rem' }}>{foodCourt.phone}</Typography>} />
                      </ListItem>
                    )}
                    {foodCourt.email && (
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar><Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(0,0,0,0.04)' }}><EmailIcon sx={{ fontSize: 16 }} /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Email</Typography>}
                          secondary={<Typography sx={{ fontSize: '0.8125rem' }}>{foodCourt.email}</Typography>} />
                      </ListItem>
                    )}
                    {foodCourt.openingHours && (
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar><Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(0,0,0,0.04)' }}><AccessTimeIcon sx={{ fontSize: 16 }} /></Avatar></ListItemAvatar>
                        <ListItemText primary={<Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Hours</Typography>}
                          secondary={<Typography sx={{ fontSize: '0.8125rem' }}>{foodCourt.openingHours}</Typography>} />
                      </ListItem>
                    )}
                  </List>
                </GlassCard>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>

        {/* Mobile Bottom Nav */}
        {isMobile && (
          <Paper sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            borderTop: '0.5px solid rgba(0,0,0,0.1)',
            borderRadius: 0,
            bgcolor: 'rgba(251,251,253,0.72)',
            backdropFilter: 'saturate(180%) blur(20px)'
          }} elevation={0}>
            <BottomNavigation value={activeTab} onChange={(_, v) => setActiveTab(v)} showLabels sx={{ bgcolor: 'transparent', height: 60 }}>
              <BottomNavigationAction label="Menu" icon={<MenuBookIcon sx={{ fontSize: 22 }} />} sx={{ minWidth: 60, py: 1, '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem', mt: 0.5 } }} />
              <BottomNavigationAction label="Outlets" icon={<RestaurantIcon sx={{ fontSize: 22 }} />} sx={{ minWidth: 60, py: 1, '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem', mt: 0.5 } }} />
              <BottomNavigationAction label="Orders" icon={<HistoryIcon sx={{ fontSize: 22 }} />} sx={{ minWidth: 60, py: 1, '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem', mt: 0.5 } }} />
              <BottomNavigationAction label="Info" icon={<Info sx={{ fontSize: 22 }} />} sx={{ minWidth: 60, py: 1, '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem', mt: 0.5 } }} />
            </BottomNavigation>
          </Paper>
        )}

        {/* Cart Drawer */}
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          PaperProps={{ sx: { width: isMobile ? '100%' : 400, bgcolor: '#fbfbfd', display: 'flex', flexDirection: 'column', backdropFilter: 'saturate(180%) blur(12px)' } }}
        >
          <Box sx={{ p: 2.5, flexGrow: 1, overflow: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Your Cart</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Clear"><IconButton onClick={clearCart} disabled={!cart.items.length} size="small"><DeleteIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
                <IconButton onClick={() => setCartOpen(false)} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RestaurantIcon sx={{ fontSize: 14 }} /> Table {tableNumber}
            </Typography>
            {cart.items.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>Empty Cart</Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Add items to get started</Typography>
              </Box>
            ) : (
              <List disablePadding>
                {cart.items.map((item, i) => (
                  <ListItem key={`${item.menuId}-${i}`} sx={{ py: 2, px: 0, borderBottom: '0.5px solid rgba(0,0,0,0.06)', gap: 2 }}>
                    <Avatar src={item.image} variant="rounded" sx={{ width: 56, height: 56, borderRadius: 2 }}><RestaurantIcon /></Avatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</Typography>}
                      secondary={
                        <Box>
                          <Typography sx={{ fontSize: '0.8125rem', mb: 0.25 }}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</Typography>
                          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>{item.outletName}</Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => updateCartItemQuantity(item.menuId, item.quantity - 1)} sx={{ border: '0.5px solid rgba(0,0,0,0.1)', width: 28, height: 28 }}>
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600, fontSize: '0.8125rem' }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateCartItemQuantity(item.menuId, item.quantity + 1)} sx={{ border: '0.5px solid rgba(0,0,0,0.1)', width: 28, height: 28 }}>
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          {cart.items.length > 0 && (
            <GlassCard sx={{ p: 2.5, borderRadius: 0, borderTop: '0.5px solid rgba(0,0,0,0.1)' }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>₹{calculateCartTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Tax (18%)</Typography>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>₹{calculateTax().toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Total</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>₹{calculateGrandTotal().toFixed(2)}</Typography>
                </Box>
              </Box>
              <SecondaryButton fullWidth onClick={() => { setCartOpen(false); setCheckoutDialogOpen(true); }} sx={{ py: 1.5 }}>
                Proceed to Checkout
              </SecondaryButton>
            </GlassCard>
          )}
        </Drawer>

        {/* Chat Drawer */}
        <Drawer
          anchor="right"
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          PaperProps={{ sx: { width: isMobile ? '100%' : 400, bgcolor: '#fbfbfd', display: 'flex', flexDirection: 'column', backdropFilter: 'saturate(180%) blur(12px)' } }}
        >
          <Box sx={{ p: 2.5, borderBottom: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#1d1d1f' }}><ChatIcon sx={{ fontSize: 18 }} /></Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>Food Assistant</Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Ask me anything</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setChatOpen(false)} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {chatMessages.map(msg => (
              <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start', mb: 1.5 }}>
                <Box sx={{
                  maxWidth: '85%',
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: msg.isUser ? '#1d1d1f' : 'rgba(0,0,0,0.04)',
                  color: msg.isUser ? '#fff' : 'text.primary'
                }}>
                  <Typography sx={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>{msg.text}</Typography>
                  <Typography sx={{ fontSize: '0.625rem', mt: 0.5, opacity: 0.6 }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
            ))}
            {isChatLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(0,0,0,0.04)' }}>
                  <CircularProgress size={16} sx={{ color: '#1d1d1f' }} />
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ p: 2, borderTop: '0.5px solid rgba(0,0,0,0.1)' }}>
            <form onSubmit={(e) => { e.preventDefault(); sendChatMessage(); }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={sendChatMessage} disabled={!chatInput.trim() || isChatLoading} size="small">
                        <SendIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { bgcolor: '#fff', fontSize: '0.875rem' }
                }}
              />
            </form>
          </Box>
        </Drawer>

        {/* Filter Drawer */}
        <Drawer
          anchor="bottom"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          PaperProps={{ sx: { height: '70vh', borderTopLeftRadius: 20, borderTopRightRadius: 20, bgcolor: '#fbfbfd', backdropFilter: 'saturate(180%) blur(12px)' } }}
        >
          <Box sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>Filters</Typography>
              <IconButton onClick={() => setFilterDrawerOpen(false)} size="small"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, mb: 1 }}>Category</Typography>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} sx={{ borderRadius: 3, fontSize: '0.875rem' }}>
                  {categories.map(cat => <MenuItem key={cat} value={cat} sx={{ fontSize: '0.875rem' }}>{cat === 'all' ? 'All' : cat}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, mb: 1.5 }}>Outlets</Typography>
              <Grid container spacing={1}>
                {outlets.map(outlet => (
                  <Grid item xs={6} key={outlet._id}>
                    <Card
                      onClick={() => {
                        if (selectedOutlets.includes(outlet._id)) {
                          setSelectedOutlets(prev => prev.filter(id => id !== outlet._id));
                        } else {
                          setSelectedOutlets(prev => [...prev, outlet._id]);
                        }
                      }}
                      sx={{
                        cursor: 'pointer',
                        border: selectedOutlets.includes(outlet._id) ? '2px solid #1d1d1f' : '1px solid rgba(0,0,0,0.08)',
                        position: 'relative',
                        bgcolor: selectedOutlets.includes(outlet._id) ? 'rgba(0,0,0,0.02)' : '#fff'
                      }}
                    >
                      <CardContent sx={{ p: 1.5, textAlign: 'center' }}>
                        <Avatar src={outlet.image} sx={{ width: 40, height: 40, mx: 'auto', mb: 1 }}><RestaurantIcon sx={{ fontSize: 18 }} /></Avatar>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{outlet.restaurantName}</Typography>
                        {selectedOutlets.includes(outlet._id) && (
                          <Box sx={{ position: 'absolute', top: 6, right: 6, bgcolor: '#1d1d1f', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckIcon sx={{ fontSize: 12, color: '#fff' }} />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, pt: 2, borderTop: '0.5px solid rgba(0,0,0,0.1)' }}>
              <Button fullWidth variant="outlined" onClick={() => { setSelectedOutlets([]); setSelectedCategory('all'); setFilteredMenus(menus); setFilterDrawerOpen(false); }}
                sx={{ borderRadius: 3, borderColor: 'rgba(0,0,0,0.15)', color: 'text.primary' }}>Clear</Button>
              <SecondaryButton fullWidth onClick={() => { filterMenusByOutlets(selectedOutlets, selectedCategory); setFilterDrawerOpen(false); }}>Apply</SecondaryButton>
            </Box>
          </Box>
        </Drawer>

        {/* Checkout Dialog */}
        <Dialog open={checkoutDialogOpen} onClose={() => setCheckoutDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, fontSize: '1.125rem', pb: 1 }}>Confirm Order</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <ReceiptIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5 }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', mb: 0.5 }}>Table {tableNumber}</Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', mb: 2 }}>{cart.items.length} items • ₹{calculateGrandTotal().toFixed(2)}</Typography>
              <List dense disablePadding>
                {cart.items.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.75, px: 0 }}>
                    <ListItemText primary={<Typography sx={{ fontSize: '0.8125rem' }}>{item.quantity} × {item.name}</Typography>} secondary={item.outletName} secondaryTypographyProps={{ sx: { fontSize: '0.6875rem' } }} />
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>₹{item.price * item.quantity}</Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Subtotal</Typography>
                <Typography sx={{ fontSize: '0.8125rem' }}>₹{calculateCartTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Tax</Typography>
                <Typography sx={{ fontSize: '0.8125rem' }}>₹{calculateTax().toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Total</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>₹{calculateGrandTotal().toFixed(2)}</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
            <Button onClick={() => setCheckoutDialogOpen(false)} sx={{ borderRadius: 3 }}>Cancel</Button>
            <SecondaryButton onClick={handleCheckout} disabled={loading.checkout} startIcon={loading.checkout ? <CircularProgress size={16} /> : <CheckCircleIcon sx={{ fontSize: 18 }} />} sx={{ borderRadius: 3 }}>
              {loading.checkout ? 'Processing...' : 'Confirm'}
            </SecondaryButton>
          </DialogActions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={orderSuccessDialogOpen} onClose={() => setOrderSuccessDialogOpen(false)}>
          <DialogContent sx={{ textAlign: 'center', py: 5, px: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: '#30d158', mb: 2 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Order Confirmed!</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 3 }}>Your order is being prepared.</Typography>
            <SecondaryButton onClick={() => { setOrderSuccessDialogOpen(false); setActiveTab(2); }} sx={{ borderRadius: 3 }}>
              View Orders
            </SecondaryButton>
          </DialogContent>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={Slide}>
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(p => ({ ...p, open: false }))} sx={{ borderRadius: 3, fontSize: '0.8125rem' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

// Fix for Info icon
const Info = InfoIcon;

export default FoodCourtPage;
