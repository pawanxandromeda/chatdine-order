import { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
}

const mockItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomato, and special sauce",
    price: 12.99,
    category: "Mains",
    available: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: 8.99,
    category: "Salads",
    available: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

export const MenuManagement = () => {
  const [items, setItems] = useState<MenuItem[]>(mockItems);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your restaurant menu
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-2xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {isAdding && (
        <Card className="glass p-6 border-border/50 animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Classic Burger"
                  className="mt-1.5 rounded-2xl h-11"
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="12.99"
                  className="mt-1.5 rounded-2xl h-11"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your dish..."
                className="mt-1.5 rounded-2xl min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Mains"
                  className="mt-1.5 rounded-2xl h-11"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl h-11"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Switch id="available" defaultChecked />
                <Label htmlFor="available" className="cursor-pointer">
                  Available
                </Label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="rounded-2xl"
                >
                  Cancel
                </Button>
                <Button className="rounded-2xl">Add Item</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="glass overflow-hidden border-border/50 animate-slide-up"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <span className="text-lg font-bold text-primary">
                  ${item.price}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={item.available} />
                  <span className="text-xs text-muted-foreground">
                    {item.available ? "Available" : "Out of stock"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
