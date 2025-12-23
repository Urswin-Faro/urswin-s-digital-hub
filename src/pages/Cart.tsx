import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart"; 
import { Separator } from "@/components/ui/separator"; 
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";

// Define the interface to fix the "Property description does not exist" error
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  description?: string; // Optional property
}

export default function Cart() {
  // We cast the cart to our CartItem interface to ensure type safety
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
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-card rounded-xl border transition-all hover:border-accent/30">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  {/* The description now works because it is defined in the interface above */}
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.description || "Digital Service"}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
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

                  <div className="text-right flex items-center gap-4">
                    <p className="font-bold text-accent">R{(item.price * item.quantity).toLocaleString()}</p>
                    <Button 
                      variant="ghost" size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary / Inquiry Form Switcher */}
          <div className="lg:col-span-1">
            {!isInquiryMode ? (
              <div className="p-6 bg-card rounded-xl border sticky top-24">
                <h2 className="font-serif text-2xl font-bold mb-6">Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Services ({cart.length})</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Consultation</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-lg font-bold">Total Quote</span>
                    <span className="text-2xl font-bold text-accent">R{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-8 h-12 text-lg shadow-glow" 
                  variant="accent"
                  onClick={() => setIsInquiryMode(true)}
                >
                  Confirm & Next
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