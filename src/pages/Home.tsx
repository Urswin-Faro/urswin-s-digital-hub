import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Wrench, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { serviceCategories } from "@/data/services";
import { ProductCard } from "@/components/ProductCard";
import { ServiceCard } from "@/components/ServiceCard";

const features = [
  {
    icon: ShoppingBag,
    title: "Quality Products",
    description: "Handpicked tech accessories and gadgets at competitive prices.",
  },
  {
    icon: Wrench,
    title: "Expert Services",
    description: "Professional home maintenance, tech support, and errand running.",
  },
  {
    icon: Star,
    title: "Trusted Quality",
    description: "Reliable service with satisfaction guaranteed on every order.",
  },
  {
    icon: CheckCircle2,
    title: "Easy Booking",
    description: "Simple online booking system for all services and products.",
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const featuredServices = serviceCategories[0].services.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up opacity-0">
              Your One-Stop Store for{" "}
              <span className="text-accent">Products</span> &{" "}
              <span className="text-accent">Personal Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up opacity-0 stagger-1">
              Quality tech products and professional services tailored to your needs.
              From smart gadgets to home maintenance — I've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 stagger-2">
              <Button variant="hero" size="xl" asChild>
                <Link to="/shop">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Products
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/services">
                  View Services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      </section>

      {/* Features Section */}
      <section className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Popular tech gadgets and accessories</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/shop">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="container-custom section-padding">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Popular Services</h2>
            <p className="text-muted-foreground">Professional assistance for your everyday needs</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/services">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Whether you need a new gadget or professional help with a task,
              I'm here to assist. Let's work together!
            </p>
            <Button variant="accent" size="xl" asChild>
              <Link to="/contact">
                Contact Me Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
