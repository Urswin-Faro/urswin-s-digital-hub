import { Monitor, Code, FileText, Globe, Layout, Smartphone, Search, PenTool } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  category: string;
  icon: string;
  features?: string[]; // Added for the web dev cards
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
    id: "web-development",
    name: "Web Development",
    description: "Custom, high-performance websites built with modern technology",
    icon: "Monitor",
    services: [
      {
        id: "one-page-site",
        name: "One-Page Website",
        description: "A high-converting landing page or portfolio. Perfect for small businesses or personal brands.",
        price: 1500,
        priceUnit: "once-off",
        category: "Web Development",
        icon: "Layout",
      },
      {
        id: "business-website",
        name: "Business Website",
        description: "A professional multi-page website (up to 5 pages) with SEO and mobile optimization.",
        price: 3000,
        priceUnit: "once-off",
        category: "Web Development",
        icon: "Globe",
      },
      {
        id: "ecommerce-store",
        name: "E-commerce Store",
        description: "Full online shop setup with payment gateway (Yoco/PayFast) and product management.",
        price: 2500,
        priceUnit: "once-off",
        category: "Web Development",
        icon: "Smartphone",
      },
      {
        id: "web-maintenance",
        name: "Monthly Maintenance",
        description: "Security updates, backups, and small content changes to keep your site running perfectly.",
        price: 450,
        priceUnit: "per month",
        category: "Web Development",
        icon: "Settings",
      },
    ],
  },
  {
    id: "career-digital",
    name: "Career & Digital Design",
    description: "Professional documents and assets to help you stand out",
    icon: "FileText",
    services: [
      {
        id: "professional-cv",
        name: "Professional CV Design",
        description: "ATS-friendly, modern CV design tailored to your industry to help you land interviews.",
        price: 100,
        priceUnit: "per CV",
        category: "Career & Digital Design",
        icon: "FileText",
      },
      {
        id: "linkedin-optimization",
        name: "LinkedIn Profile Setup",
        description: "Complete optimization of your LinkedIn profile, including banner design and headline strategy.",
        price: 200,
        priceUnit: "once-off",
        category: "Career & Digital Design",
        icon: "User",
      },
      {
        id: "logo-design",
        name: "Logo & Brand Identity",
        description: "Unique logo design and color palette to establish your professional brand.",
        price: 400,
        priceUnit: "once-off",
        category: "Career & Digital Design",
        icon: "PenTool",
      },
      {
        id: "copywriting",
        name: "Technical Writing",
        description: "Professional blog posts, 'About Us' pages, or technical documentation.",
        price: 250,
        priceUnit: "per page",
        category: "Career & Digital Design",
        icon: "Edit3",
      },
    ],
  },
  {
    id: "tech-consulting",
    name: "Tech Consulting",
    description: "Expert technical advice and specialized coding help",
    icon: "Code",
    services: [
      {
        id: "coding-assistance",
        name: "Code Review / Debugging",
        description: "Expert help with programming projects, fixing bugs, and optimizing existing code.",
        price: 200,
        priceUnit: "per hour",
        category: "Tech Consulting",
        icon: "Code",
      },
      {
        id: "seo-audit",
        name: "SEO Audit",
        description: "Analysis of your current website's search engine ranking and a plan to improve it.",
        price: 1000,
        priceUnit: "once-off",
        category: "Tech Consulting",
        icon: "Search",
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap((cat) => cat.services);