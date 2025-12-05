import { Link } from "react-router-dom";
import {
  Home,
  Flower2,
  Trash2,
  Paintbrush,
  Wrench,
  Monitor,
  Code,
  Globe,
  Settings,
  Car,
  ShoppingBag,
  Clock,
  Package,
  CircleDot,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Flower2,
  Trash2,
  Paintbrush,
  Wrench,
  Monitor,
  Code,
  Globe,
  Settings,
  Car,
  ShoppingBag,
  Clock,
  Package,
  CircleDot,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || CircleDot;

  return (
    <div className="group bg-card rounded-xl p-6 card-hover border border-border/50">
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <IconComponent className="h-6 w-6 text-accent" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
        {service.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {service.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-2xl font-bold">R{service.price}</span>
        <span className="text-sm text-muted-foreground">{service.priceUnit}</span>
      </div>

      {/* CTA */}
      <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all" asChild>
        <Link to={`/contact?service=${encodeURIComponent(service.name)}`}>
          Request Booking
        </Link>
      </Button>
    </div>
  );
}
