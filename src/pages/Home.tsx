import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Code, Star, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { serviceCategories } from "@/data/services";
import { ProductCard } from "@/components/ProductCard";
import { ServiceCard } from "@/components/ServiceCard";

const features = [
  {
    icon: ShoppingBag,
    title: "Curated Shop",
    description: "Quality lifestyle products and essentials handpicked for you.",
  },
  {
    icon: Code,
    title: "Web Solutions",
    description: "Modern, high-performance websites built to grow your brand.",
  },
  {
    icon: FileText,
    title: "Career Assets",
    description: "Professional CV design and digital documents to help you stand out.",
  },
  {
    icon: Star,
    title: "Trusted Quality",
    description: "Reliable service with a focus on professional excellence.",
  },
];

export default function Home() {
  // Take the first 4 products and services to show on home page
  const featuredProducts = products.slice(0, 4);
  const featuredServices = serviceCategories[0]?.services.slice(0, 4) || [];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Your Hub for <span className="text-accent">Digital Excellence</span> & Quality Products
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up stagger-1">
              From professional web development and career-boosting CVs to a curated 
              selection of lifestyle products. Everything you need in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
              <Button variant="hero" size="xl" asChild>
                <Link to="/services">
                  <Code className="h-5 w-5 mr-2" />
                  Explore Services
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/shop">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Visit Shop
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
      <section className="container-custom section-padding border-b border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-in-up"
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

      {/* Featured Services - Moved up because Web Dev is your high-value offer */}
      <section className="container-custom section-padding">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Professional Services</h2>
            <p className="text-muted-foreground">Expert solutions for your digital and career needs</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/services">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Quality items curated for your lifestyle</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/shop">
                Browse Shop
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          {/* Using grid-cols-2 for consistent mobile view */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Project?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Whether you need a custom website, a professional CV, or have 
              questions about our products, I'm here to help you succeed.
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