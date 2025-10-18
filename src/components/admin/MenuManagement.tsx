// src/pages/MenuManagement.tsx
import { useState, useRef } from "react";
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
import { useMenuItems, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem, useToggleFeatured, useToggleAvailable } from "../../hooks/useMenu";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  featured: boolean;
}

const initialFormData = {
  name: '',
  description: '',
  price: 0,
  category: '',
  available: true,
  featured: false,
  image: null as File | null,
};

export const MenuManagement = () => {
  const { data: items = [], isLoading } = useMenuItems();
  const { mutate: createItem, isPending: isCreating } = useCreateMenuItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateMenuItem();
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteMenuItem();
  const { mutate: toggleFeatured } = useToggleFeatured();
  const { mutate: toggleAvailable } = useToggleAvailable();

  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ ...initialFormData });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'price' ? parseFloat(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price.toString());
    data.append('category', formData.category);
    data.append('available', formData.available.toString());
    data.append('featured', formData.featured.toString());
    if (formData.image) data.append('image', formData.image);

    if (editingItem) {
      updateItem({ id: editingItem._id, data }, {
        onSuccess: () => {
          resetForm();
        },
      });
    } else {
      createItem(data, {
        onSuccess: () => {
          resetForm();
          setIsAdding(false);
        },
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
      featured: item.featured,
      image: null,
    });
    setImagePreview(item.image || null);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  const handleToggleAvailable = (id: string, available: boolean) => {
    toggleAvailable({ id, available });
  };

  const handleToggleFeatured = (id: string) => {
    toggleFeatured(id);
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setEditingItem(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (isLoading) {
    return <div>Loading menu items...</div>;
  }

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
                onClick={() => {
                  resetForm();
                  setIsAdding(true);
                }}
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

        {/* Add/Edit Item Form */}
        {isAdding && (
          <Card className="glass p-6 border-border/50 animate-slide-up hover-lift transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    value={formData.price}
                    onChange={handleChange}
                    required
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
                  value={formData.description}
                  onChange={handleChange}
                  required
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
                    value={formData.category}
                    onChange={handleChange}
                    required
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-2xl h-11 transition-all duration-200 hover:scale-[1.02] group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    {formData.image || imagePreview ? 'Change Image' : 'Upload Image'}
                  </Button>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <Switch 
                    id="available" 
                    checked={formData.available} 
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
                  />
                  <Label htmlFor="available" className="cursor-pointer text-sm font-medium">
                    Available for Ordering
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      resetForm();
                    }}
                    className="rounded-2xl transition-all duration-200 hover:scale-105"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="rounded-2xl transition-all duration-200 hover:scale-105 premium-gradient"
                    disabled={isCreating || isUpdating}
                  >
                    {editingItem ? (isUpdating ? 'Updating...' : 'Update Item') : (isCreating ? 'Adding...' : 'Add Item')}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        )}

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item: MenuItem) => (
            <Card
              key={item._id}
              className="glass overflow-hidden border-border/50 animate-slide-up transition-all duration-300 group relative"
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
                    ${item.price.toFixed(2)}
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
                            onCheckedChange={(checked) => handleToggleAvailable(item._id, checked)}
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
                  
                  <div className="flex gap-1 transition-opacity duration-300">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-primary/10"
                          onClick={() => handleToggleFeatured(item._id)}
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
                          onClick={() => handleEdit(item)}
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
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
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