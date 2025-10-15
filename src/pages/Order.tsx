import { useState } from "react";
import { ChatInterface } from "@/components/order/ChatInterface";
import { MenuView } from "@/components/order/MenuView";
import { Cart } from "@/components/order/Cart";
import { PaymentSection } from "@/components/order/PaymentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, UtensilsCrossed } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Order = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (item: Omit<CartItem, "id">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id: Math.random().toString() }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Place Your Order
          </h1>
          <p className="text-muted-foreground">
            Chat or speak to order. Your cart updates in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat Order
                </TabsTrigger>
                <TabsTrigger value="menu" className="gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  Browse Menu
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="mt-0">
                <ChatInterface onAddToCart={addToCart} />
              </TabsContent>
              <TabsContent value="menu" className="mt-0">
                <MenuView onAddToCart={addToCart} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onConfirm={handleConfirmOrder}
              total={totalAmount}
            />

            {showPayment && (
              <PaymentSection
                amount={totalAmount}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPayment(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
