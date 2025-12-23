// Import the images directly from their folder location
import glasses1 from "./Assets/Glasses1.avif";
import glasses2 from "./Assets/Glasses2.avif";
import glasses3 from "./Assets/Glasses3.avif";
import glasses4 from "./Assets/Glasses4.avif";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "The Top Laaitie",
    description: "Duidelik style for the young kings. Your future is too bright not to wear these.",
    price: 69.99,
    image: glasses1, // Use the imported variable
    category: "Wearables",
    inStock: true,
  },
  {
    id: "2",
    name: "The Kroon Aviators",
    description: "Top-tier double bridge frames. For when you're feeling like the main character.",
    price: 70.00,
    image: glasses2, // Use the imported variable
    category: "Wearables",
    inStock: true,
  },
  {
    id: "3",
    name: "The Glad Square",
    description: "Slick, tinted lenses that keep it smooth. Perfect for a sharp charf.",
    price: 100.00,
    image: glasses3, // Use the imported variable
    category: "Wearables",
    inStock: true,
  },
  {
    id: "4",
    name: "The Dik-Doring Block",
    description: "Thick, heavy-duty frames for that bold, dangerous streetwear look.",
    price: 80.00,
    image: glasses4, // Use the imported variable
    category: "Wearables",
    inStock: true,
  }
];

export const productCategories = ["All", "Wearables", "Audio", "Accessories"];