import { ShoppingCart, Maximize2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden card-hover flex flex-col h-full border">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square overflow-hidden bg-secondary cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-background/90 px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4" /> Quick View
              </div>
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
        </DialogTrigger>

        {/* --- FULL PRODUCT INFO MODAL --- */}
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden gap-0">
          <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
            
            {/* Left Side: Large Image */}
            <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[400px] md:max-h-full w-auto object-contain rounded-lg"
              />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
              <DialogHeader className="text-left mb-4">
                <Badge variant="outline" className="w-fit mb-2">{product.category}</Badge>
                <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  {product.name}
                </DialogTitle>
                <p className="text-2xl font-bold text-accent mt-2">
                  R{product.price.toLocaleString()}
                </p>
              </DialogHeader>

              <div className="flex-1">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description || "No description available for this premium tech item."}
                </p>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-medium">
                    {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t">
                <Button
                  variant="accent"
                  size="lg"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart()}
                  className="w-full gap-3 text-md h-12"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — R{product.price.toLocaleString()}
                </Button>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>

      {/* --- EXTERNAL CARD CONTENT (Visible on Shop Page) --- */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <h3 className="font-serif text-sm sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-col gap-2">
          <span className="text-base sm:text-xl font-bold">
            R{product.price.toLocaleString()}
          </span>
          <Button
            variant="accent"
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="w-full gap-2 text-xs sm:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}