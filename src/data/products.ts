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
    name: "Side Steppers",
    description:
      "Double bridge, double confidence. Put these on and walk like the world owes you money.",
    price: 69.99,
    image: glasses1,
    category: "Wearables",
    inStock: true,
  },
  {
    id: "2",
    name: "The Kroon Aviators",
    description:
    "Smooth tint, sharp look. For when you want to look mysterious but still catch the taxi home.",
    price: 70.00,
    image: glasses2,
    category: "Wearables",
    inStock: true,
  },
  {
    id: "3",
    name: "The Glad Square",
    description:
      "Certified drip for the young kings. Wear these and suddenly everyone thinks you’ve got your life together.",
    price: 100.00,
    image: glasses3,
    category: "Wearables",
    inStock: true,
  },
  {
    id: "4",
    name: "Top Laaitie Blokke",
    description:
      "Thick frames. Serious presence. These don’t whisper style — they shout it.",
    price: 80.00,
    image: glasses4,
    category: "Wearables",
    inStock: true,
  },
];

export const productCategories = ["All", "Wearables", "Audio", "Accessories"];
