export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  category: string;
  icon: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "house-maintenance",
    name: "House & Maintenance",
    description: "Professional home care and maintenance services",
    icon: "Home",
    services: [
      {
        id: "garden-cleaning",
        name: "Garden Cleaning",
        description: "Complete garden cleanup including weeding, trimming, and debris removal.",
        price: 250,
        priceUnit: "per hour",
        category: "House & Maintenance",
        icon: "Flower2",
      },
      {
        id: "bin-cleaning",
        name: "Bin Cleaning",
        description: "Thorough cleaning and sanitization of your waste bins.",
        price: 80,
        priceUnit: "per bin",
        category: "House & Maintenance",
        icon: "Trash2",
      },
      {
        id: "painting",
        name: "Painting (Interior)",
        description: "Professional interior painting with quality materials.",
        price: 150,
        priceUnit: "per hour",
        category: "House & Maintenance",
        icon: "Paintbrush",
      },
      {
        id: "handywork",
        name: "Minor Fixing / Handywork",
        description: "Small repairs and fixes around the house.",
        price: 120,
        priceUnit: "per hour",
        category: "House & Maintenance",
        icon: "Wrench",
      },
    ],
  },
  {
    id: "tech-services",
    name: "Tech Services",
    description: "Digital solutions and technical assistance",
    icon: "Monitor",
    services: [
      {
        id: "coding-assistance",
        name: "Coding Assistance",
        description: "Help with programming projects, debugging, and code reviews.",
        price: 200,
        priceUnit: "per hour",
        category: "Tech Services",
        icon: "Code",
      },
      {
        id: "website-setup",
        name: "Website Setup",
        description: "Complete website setup including hosting and domain configuration.",
        price: 450,
        priceUnit: "once-off",
        category: "Tech Services",
        icon: "Globe",
      },
      {
        id: "software-troubleshooting",
        name: "Software Troubleshooting",
        description: "Diagnose and fix software issues on your devices.",
        price: 150,
        priceUnit: "per hour",
        category: "Tech Services",
        icon: "Settings",
      },
    ],
  },
  {
    id: "errand-services",
    name: "Errand Services",
    description: "Save time with personal errand running",
    icon: "Car",
    services: [
      {
        id: "grocery-delivery",
        name: "Grocery Pickup & Delivery",
        description: "Shop and deliver groceries directly to your door.",
        price: 70,
        priceUnit: "per trip",
        category: "Errand Services",
        icon: "ShoppingBag",
      },
      {
        id: "queueing-service",
        name: "Queueing Service",
        description: "Stand in line on your behalf at any location.",
        price: 50,
        priceUnit: "per 30 min",
        category: "Errand Services",
        icon: "Clock",
      },
      {
        id: "item-delivery",
        name: "Item Collection / Delivery",
        description: "Collect and deliver items between locations.",
        price: 60,
        priceUnit: "per trip",
        category: "Errand Services",
        icon: "Package",
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap((cat) => cat.services);
