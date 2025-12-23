import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import {

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue,

} from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";

import { allServices } from "@/data/services";



const contactInfo = [

  {

    icon: Mail,

    label: "Email",

    value: "Urswinf@gmail.com",

    href: "mailto:Urswinf@gmail.com",

  },

  {

    icon: Phone,

    label: "Phone",

    value: "+27 791013083 ",

    href: "tel:+27791013083",

  },

  {

    icon: MapPin,

    label: "Location",

    value: "Cape Town, South Africa",

    href: null,

  },

  {

    icon: Clock,

    label: "Business Hours",

    value: "Mon - Fri: 8AM - 6PM",

    href: null,

  },

];



export default function Contact() {

  const [searchParams] = useSearchParams();

  const preselectedService = searchParams.get("service");

  const preselectedDate = searchParams.get("date");



  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    service: preselectedService || "",

    message: "",

    preferredDate: preselectedDate || "",

  });



  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {

    if (preselectedService) {

      setFormData((prev) => ({ ...prev, service: preselectedService }));

    }

    if (preselectedDate) {

      setFormData((prev) => ({ ...prev, preferredDate: preselectedDate }));

    }

  }, [preselectedService, preselectedDate]);



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsSubmitting(true);



try {

    // Change the endpoint URL to include the server's origin (localhost:5000)

    const response = await fetch("http://localhost:5000/api/contact", {

      method: "POST",

        headers: {

          "Content-Type": "application/json",

        }, // 2. Send the current form data state as a JSON string

        body: JSON.stringify(formData),

      });



      if (!response.ok) {

        // If the server responds with an error status (e.g., 400 or 500)

        throw new Error("Failed to send message. Please try again.");

      } // 3. Handle successful submission (status 200/201)



      toast({

        title: "Message sent! 🚀",

        description: "Thank you for your message. I'll get back to you soon.",

      }); // 4. Reset form



      setFormData({

        name: "",

        email: "",

        phone: "",

        service: "",

        message: "",

        preferredDate: "",

      });

    } catch (error: unknown) {

      // Handle network errors or server-side failures

      console.error("Submission error:", error);



      // Type Guard: Check if the error is an object with a 'message' property

      let errorMessage = "Something went wrong. Please check your connection.";

      if (error instanceof Error) {

        errorMessage = error.message;

      }



      toast({

        title: "Submission Failed ❌",

        description: errorMessage, // Use the extracted or default message

        variant: "destructive",

      });

    } finally {

      setIsSubmitting(false);

    }

  };



  const handleChange = (

    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

  };



  return (

    <main>

      {/* Header */}

      <section className="bg-secondary/30">

        <div className="container-custom section-padding pb-10">

          <div className="max-w-2xl">

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">

              Get in Touch

            </h1>

            <p className="text-lg text-muted-foreground">

              Have a question or want to request a service? Fill out the form

              below and I'll get back to you as soon as possible.

            </p>

          </div>

        </div>

      </section>



      {/* Contact Form & Info */}

      <section className="container-custom py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}

          <div className="lg:col-span-2 bg-card rounded-xl p-6 md:p-8 card-hover border border-border/50">

            <h2 className="font-serif text-2xl font-bold mb-6">

              Send a Message

            </h2>



            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">

                  <Label htmlFor="name">Full Name *</Label>

                  <Input

                    id="name"

                    name="name"

                    placeholder="John Doe"

                    value={formData.name}

                    onChange={handleChange}

                    required

                  />

                </div>

                <div className="space-y-2">

                  <Label htmlFor="email">Email Address *</Label>

                  <Input

                    id="email"

                    name="email"

                    type="email"

                    placeholder="john@example.com"

                    value={formData.email}

                    onChange={handleChange}

                    required

                  />

                </div>

              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">

                  <Label htmlFor="phone">Phone Number</Label>

                  <Input

                    id="phone"

                    name="phone"

                    type="tel"

                    placeholder="+27 12 345 6789"

                    value={formData.phone}

                    onChange={handleChange}

                  />

                </div>

                <div className="space-y-2">

                  <Label htmlFor="service">Service Needed</Label>

                  <Select

                    value={formData.service}

                    onValueChange={(value) =>

                      setFormData((prev) => ({ ...prev, service: value }))

                    }

                  >

                    <SelectTrigger>

                      <SelectValue placeholder="Select a service" />

                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="general">General Inquiry</SelectItem>

                      <SelectItem value="product">Product Question</SelectItem>

                      {allServices.map((service) => (

                        <SelectItem key={service.id} value={service.name}>

                          {service.name}

                        </SelectItem>

                      ))}

                    </SelectContent>

                  </Select>

                </div>

              </div>



              <div className="space-y-2">

                <Label htmlFor="preferredDate">Preferred Date</Label>

                <Input

                  id="preferredDate"

                  name="preferredDate"

                  type="date"

                  value={formData.preferredDate}

                  onChange={handleChange}

                />

              </div>



              <div className="space-y-2">

                <Label htmlFor="message">Message *</Label>

                <Textarea

                  id="message"

                  name="message"

                  placeholder="Tell me about your project or request..."

                  rows={5}

                  value={formData.message}

                  onChange={handleChange}

                  required

                />

              </div>



              <Button

                type="submit"

                variant="accent"

                size="lg"

                className="w-full md:w-auto"

                disabled={isSubmitting}

              >

                {isSubmitting ? (

                  "Sending..."

                ) : (

                  <>

                    <Send className="h-4 w-4 mr-2" />

                    Send Message

                  </>

                )}

              </Button>

            </form>

          </div>



          {/* Contact Info */}

          <div className="space-y-6">

            <div className="bg-card rounded-xl p-6 card-hover border border-border/50">

              <h3 className="font-serif text-xl font-bold mb-6">

                Contact Information

              </h3>

              <div className="space-y-4">

                {contactInfo.map((info) => (

                  <div key={info.label} className="flex items-start gap-4">

                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">

                      <info.icon className="h-5 w-5 text-accent" />

                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground">

                        {info.label}

                      </p>

                      {info.href ? (

                        <a

                          href={info.href}

                          className="font-medium hover:text-accent transition-colors"

                        >

                          {info.value}

                        </a>

                      ) : (

                        <p className="font-medium">{info.value}</p>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>



            {/* Quick Response */}

            <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">

              <h3 className="font-serif text-lg font-semibold mb-2">

                Quick Response

              </h3>

              <p className="text-sm text-muted-foreground">

                I typically respond to all inquiries within 24 hours during

                business days. For urgent matters, please call directly.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}