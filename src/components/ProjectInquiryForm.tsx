import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, User, Phone } from "lucide-react";

// Define the interface to replace 'any'
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface InquiryFormProps {
  cart: CartItem[]; // Specified the type here
  total: number;
  onBack: () => void;
}

export function ProjectInquiryForm({ cart, total, onBack }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the cart items for the message
    const cartList = cart
      .map((item) => `• ${item.name} (x${item.quantity}) - R${(item.price * item.quantity).toFixed(2)}`)
      .join("%0A");

    // Construct the WhatsApp URL
    const message = 
      `🚀 *NEW PROJECT INQUIRY*%0A%0A` +
      `*Client Details:*%0A` +
      `👤 Name: ${formData.name}%0A` +
      `📧 Email: ${formData.email}%0A` +
      `📞 Phone: ${formData.phone}%0A%0A` +
      `*Requested Services:*%0A${cartList}%0A%0A` +
      `*Estimated Total:* R${total.toFixed(2)}%0A%0A` +
      `*Project Brief:*%0A${formData.details}`;

    // Replace with your actual number (e.g., 27821234567)
    const myNumber = "27791013083"; 
    window.open(`https://wa.me/${myNumber}?text=${message}`, "_blank");
  };

  return (
    <Card className="border-accent/20 shadow-glow">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Project Details</CardTitle>
        <CardDescription>
          Fill this in to help me understand your goals before we chat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="WhatsApp / Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <Textarea
            placeholder="Describe your project (e.g. 'I need a portfolio for my photography business...')"
            className="min-h-[120px] bg-secondary/10"
            required
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          />

          <div className="pt-2 space-y-2">
            <Button type="submit" variant="accent" size="lg" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send to WhatsApp
            </Button>
            <Button type="button" variant="ghost" className="w-full text-xs" onClick={onBack}>
              ← Back to Summary
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}