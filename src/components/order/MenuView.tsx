import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/pages/Order";
import burgerImg from "@/assets/menu-burger.jpg";
import pizzaImg from "@/assets/menu-pizza.jpg";
import saladImg from "@/assets/menu-salad.jpg";
import pastaImg from "@/assets/menu-pasta.jpg";
import steakImg from "@/assets/menu-steak.jpg";
import dessertImg from "@/assets/menu-dessert.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface MenuViewProps {
  onAddToCart: (item: Omit<CartItem, "id">) => void;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Premium beef patty with fresh vegetables and special sauce",
    price: 14.99,
    image: burgerImg,
    category: "Main Course",
    popular: true,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil on crispy dough",
    price: 16.99,
    image: pizzaImg,
    category: "Main Course",
    popular: true,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing and croutons",
    price: 10.99,
    image: saladImg,
    category: "Appetizer",
  },
  {
    id: "4",
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and Parmesan cheese",
    price: 15.99,
    image: pastaImg,
    category: "Main Course",
  },
  {
    id: "5",
    name: "Grilled Steak",
    description: "Premium cut steak grilled to perfection with herbs",
    price: 28.99,
    image: steakImg,
    category: "Main Course",
    popular: true,
  },
  {
    id: "6",
    name: "Chocolate Cake",
    description: "Decadent chocolate cake with rich chocolate frosting",
    price: 8.99,
    image: dessertImg,
    category: "Dessert",
  },
];

export const MenuView = ({ onAddToCart }: MenuViewProps) => {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  return (
    <Card className="glass overflow-hidden border-border/50">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Our Menu</h2>
          <p className="text-muted-foreground">
            Browse our delicious selection and add items to your cart
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{category}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover-lift group cursor-pointer border-border/50"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.popular && (
                        <Badge className="absolute top-3 right-3 premium-gradient border-0">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        onClick={() =>
                          onAddToCart({
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image,
                          })
                        }
                        className="w-full rounded-xl group"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1 transition-transform group-hover:rotate-90" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
