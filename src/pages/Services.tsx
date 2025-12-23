import { Home, Monitor, Car, LucideIcon } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";

const categoryIcons: Record<string, LucideIcon> = {
  "Home": Home,
  "Monitor": Monitor,
  "Car": Car,
};

export default function Services() {
  return (
    <main>
      {/* Header */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding pb-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional services tailored to your needs — from home maintenance 
              to tech support and errands.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="container-custom py-10">
        {serviceCategories.map((category, categoryIndex) => {
          const IconComponent = categoryIcons[category.icon] || Home;
          
          return (
            <div
              key={category.id}
              id={category.id}
              className={`${categoryIndex > 0 ? "mt-16 pt-16 border-t border-border" : ""}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <IconComponent className="h-6 w-6 md:h-7 md:h-7 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-xl md:text-3xl font-bold">
                    {category.name}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Services Grid - CHANGED: grid-cols-2 for mobile, adjusted gap */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {category.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Need a Custom Service?
            </h2>
            <p className="text-muted-foreground mb-6">
              Don't see exactly what you need? Get in touch and we can discuss 
              custom solutions for your specific requirements.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-accent-foreground font-medium shadow-glow hover:bg-accent/90 transition-all"
            >
              Request Custom Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}