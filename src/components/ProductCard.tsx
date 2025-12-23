import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
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
    <div className="group bg-card rounded-xl overflow-hidden card-hover flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-[10px] sm:text-xs">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content - Adjusted padding and font-sizes for mobile spacing */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <h3 className="font-serif text-sm sm:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[12px] sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
          {product.description}
        </p>
        
        <div className="mt-auto flex flex-col gap-2">
          <span className="text-base sm:text-xl font-bold">
            R{product.price.toLocaleString()}
          </span>
          <Button
            variant="accent"
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="w-full gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-10"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}