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
    name: "Volcano Smartwatch",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life.",
    price: 699,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    category: "Wearables",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Band",
    description: "Lightweight band with step tracking, sleep analysis, and notification alerts.",
    price: 399,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    category: "Wearables",
    inStock: true,
  },
  {
    id: "3",
    name: "Wireless Bluetooth Earbuds",
    description: "Premium sound quality with active noise cancellation and 24hr battery.",
    price: 299,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "Audio",
    inStock: true,
  },
  {
    id: "4",
    name: "Portable Mini Speaker",
    description: "Compact speaker with powerful bass, waterproof design, and 12hr playtime.",
    price: 199,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Audio",
    inStock: true,
  },
  {
    id: "5",
    name: "Powerbank 20,000mAh",
    description: "High-capacity portable charger with fast charging and dual USB ports.",
    price: 349,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "6",
    name: "LED Ring Light",
    description: "Professional lighting for content creators with adjustable brightness and colors.",
    price: 250,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: false,
  },
  {
    id: "7",
    name: "Phone Tripod Stand",
    description: "Flexible tripod with universal phone mount and remote shutter control.",
    price: 180,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "8",
    name: "USB-C Fast Charger",
    description: "65W fast charging adapter compatible with laptops, phones, and tablets.",
    price: 120,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
];

export const productCategories = ["All", "Wearables", "Audio", "Accessories"];
