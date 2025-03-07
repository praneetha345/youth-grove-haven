
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "College Student",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "The AI Career Coach helped me discover my passion for data science and guided me to relevant internships. I landed a role at a tech startup that I love!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Professional",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "I struggled with anxiety for years. The guided meditation and wellbeing buddy have been life-changing. I've noticed improved focus and confidence at work.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "High School Student",
    image: "https://i.pravatar.cc/150?img=3",
    quote: "The digital detox challenges helped me reduce my screen time by 40%. I'm sleeping better and have started reading books again!",
    rating: 4
  },
  {
    id: 4,
    name: "Jessica Taylor",
    role: "Graphic Designer",
    image: "https://i.pravatar.cc/150?img=6",
    quote: "I was confused about my career path. The AI-generated roadmap helped me transition to UX design with personalized guidance and courses.",
    rating: 5
  },
  {
    id: 5,
    name: "David Lopez",
    role: "High School Senior",
    image: "https://i.pravatar.cc/150?img=4",
    quote: "The anonymous forums and peer mentorship program helped me deal with stress and build meaningful connections during a difficult time.",
    rating: 5
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hear From Our <span className="text-gradient">Community</span>
          </h2>
          <p className="text-slate-600">
            Real stories from real users who have transformed their mental wellbeing, careers, and digital habits 
            with our platform.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="glass-card rounded-xl border border-slate-200 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-opacity duration-300 ${
                    index === activeIndex ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-sm">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                        <div className="flex items-center justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-8 flex items-center">
                      <div>
                        <Quote className="h-8 w-8 text-well-blue/20 mb-4" />
                        <p className="text-lg text-slate-700 mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex justify-end">
                          <div className="w-20 h-1 bg-well-gradient rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6 gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 p-0 rounded-full ${
                    index === activeIndex ? "bg-well-blue" : "bg-slate-200"
                  }`}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
