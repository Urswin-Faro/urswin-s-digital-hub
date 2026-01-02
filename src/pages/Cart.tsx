import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart"; 
import { Separator } from "@/components/ui/separator"; 
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";

// 1. Updated interface to include the image property
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;       // Added for visuals
  description?: string; 
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart() as { 
    cart: CartItem[], 
    removeFromCart: (id: string | number) => void, 
    updateQuantity: (id: string | number, q: number) => void 
  };
  
  const [isInquiryMode, setIsInquiryMode] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="container-custom py-20">
        <div className="text-center py-20 bg-card rounded-xl border border-dashed">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Start adding some services to see them here.</p>
          <Button asChild variant="accent">
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <section className="bg-secondary/30 mb-10">
        <div className="container-custom section-padding pb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Review Project</h1>
          <p className="text-lg text-muted-foreground">You have {cart.length} service(s) in your request.</p>
        </div>
      </section>

      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-card rounded-xl border transition-all hover:border-accent/30 shadow-sm">
                
                {/* 2. Added Service Image Thumbnail */}
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-secondary shrink-0 border">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground bg-muted">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg leading-none mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.description || "Digital Service"}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border rounded-lg p-1 bg-background">
                    <Button 
                      variant="ghost" size="icon" className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span> 
                    <Button 
                      variant="ghost" size="icon" className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <p className="font-bold text-accent">R{(item.price * item.quantity).toLocaleString()}</p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-muted-foreground">R{item.price.toLocaleString()} ea</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" size="icon" 
                      className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary / Form Switcher */}
          <div className="lg:col-span-1">
            {!isInquiryMode ? (
              <div className="p-6 bg-card rounded-xl border sticky top-24 shadow-md">
                <h2 className="font-serif text-2xl font-bold mb-6">Quote Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Selected Services ({cart.length})</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Consultation Fee</span>
                    <span className="text-green-600 font-medium">Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-lg font-bold">Total Estimate</span>
                    <span className="text-2xl font-bold text-accent">R{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-8 h-12 text-lg font-bold" 
                  variant="accent"
                  onClick={() => setIsInquiryMode(true)}
                >
                  Proceed to Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="sticky top-24">
                <ProjectInquiryForm 
                  cart={cart} 
                  total={subtotal} 
                  onBack={() => setIsInquiryMode(false)} 
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}