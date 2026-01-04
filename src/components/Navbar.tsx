import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  
  // ==========================================
  // MANUAL AVAILABILITY TOGGLE
  // Set to 'true' for Green/Available
  // Set to 'false' for Red/Fully Booked
  // ==========================================
  const isAvailable = true; 
  // ==========================================

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                <span className="font-serif text-xl font-bold text-accent-foreground">UF</span>
              </div>
              <span className="font-serif text-xl font-semibold hidden lg:block tracking-tight">
                Unfold
              </span>
            </Link>

            {/* Dynamic Status Badge */}
            <div className={cn(
              "hidden md:flex items-center gap-2 px-3 py-1 rounded-full border transition-colors duration-500",
              isAvailable 
                ? "bg-emerald-500/10 border-emerald-500/20" 
                : "bg-red-500/10 border-red-500/20"
            )}>
              <span className="relative flex h-2 w-2">
                {isAvailable && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2 transition-colors duration-500",
                  isAvailable ? "bg-emerald-500" : "bg-red-500"
                )}></span>
              </span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isAvailable ? "text-emerald-600" : "text-red-600"
              )}>
                {isAvailable ? "Available" : "Fully Booked"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? "bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold border-2 border-background animate-in zoom-in">
                    {totalItems} 
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant={isAvailable ? "accent" : "outline"} asChild>
              <Link to="/contact">
                {isAvailable ? "Get in Touch" : "Inquire Now"}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 md:hidden">
             <Link to="/cart" className="relative p-2 text-foreground">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold border border-background">
                    {totalItems}
                  </span>
                )}
             </Link>
             <button
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMenu}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 mt-2 border-t border-border space-y-4">
              <div className="flex items-center gap-3 px-4">
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full", 
                  isAvailable ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"
                )} />
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider", 
                  isAvailable ? "text-emerald-600" : "text-red-600"
                )}>
                  {isAvailable ? "Currently accepting new projects" : "Currently fully booked"}
                </span>
              </div>
              <Button variant={isAvailable ? "accent" : "outline"} className="w-full h-12 shadow-sm" asChild>
                <Link to="/contact" onClick={closeMenu}>
                  {isAvailable ? "Start a Project" : "Send a Message"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}