import { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Info, Sparkles, Crown, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  featured?: boolean;
}

const mockItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomato, and our signature special sauce",
    price: 12.99,
    category: "Mains",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with aged parmesan, homemade croutons, and classic caesar dressing",
    price: 8.99,
    category: "Salads",
    available: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

export const MenuManagement = () => {
  const [items, setItems] = useState<MenuItem[]>(mockItems);
  const [isAdding, setIsAdding] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleFeatured = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Menu Items</h2>
              <Badge variant="secondary" className="premium-gradient text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                {items.length} Items
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage your restaurant menu and item availability
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsAdding(!isAdding)}
                className="rounded-2xl premium-gradient hover-lift transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add Item
              </Button>
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-xl border-border/50">
              <p>Create a new menu item with images and pricing</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Add Item Form */}
        {isAdding && (
          <Card className="glass p-6 border-border/50 animate-slide-up hover-lift transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Add New Menu Item</h3>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1">
                    Item Name
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help transition-colors hover:text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs backdrop-blur-xl">
                        <p>Choose a descriptive name that appeals to customers</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Classic Burger"
                    className="rounded-2xl h-11 transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium flex items-center gap-1">
                    Price ($)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help transition-colors hover:text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs backdrop-blur-xl">
                        <p>Include tax in your pricing. Customers see this exact amount.</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="12.99"
                    className="rounded-2xl h-11 transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your dish with appealing details and key ingredients..."
                  className="rounded-2xl min-h-[100px] transition-all duration-200 focus:scale-[1.02] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Input
                    id="category"
                    placeholder="e.g., Mains, Appetizers, Desserts"
                    className="rounded-2xl h-11 transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Item Image
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help transition-colors hover:text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs backdrop-blur-xl">
                        <p>High-quality images increase order conversion by up to 30%</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-11 transition-all duration-200 hover:scale-[1.02] group"
                  >
                    <ImageIcon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <Switch id="available" defaultChecked />
                  <Label htmlFor="available" className="cursor-pointer text-sm font-medium">
                    Available for Ordering
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                    className="rounded-2xl transition-all duration-200 hover:scale-105"
                  >
                    Cancel
                  </Button>
                  <Button className="rounded-2xl transition-all duration-200 hover:scale-105 premium-gradient">
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Card
              key={item.id}
              className="glass overflow-hidden border-border/50 animate-slide-up transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="premium-gradient text-white border-0 shadow-lg">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Image with Overlay */}
              {item.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                  </div>
                  <span className="text-lg font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    ${item.price}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                          <Switch 
                            checked={item.available} 
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span className={`text-xs font-medium ${item.available ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {item.available ? "Available" : "Out of stock"}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>Toggle item availability for customers</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-primary/10"
                          onClick={() => toggleFeatured(item.id)}
                        >
                          {item.featured ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>{item.featured ? "Remove from featured" : "Mark as featured"}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-blue-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>Edit item details</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="backdrop-blur-xl">
                        <p>Remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-lg transition-all duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <Card className="glass p-12 text-center border-border/50">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto premium-gradient rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">No menu items yet</h3>
              <p className="text-muted-foreground">
                Start by adding your first menu item to showcase your offerings to customers.
              </p>
              <Button 
                onClick={() => setIsAdding(true)}
                className="premium-gradient rounded-2xl mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};