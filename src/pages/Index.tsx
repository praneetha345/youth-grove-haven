
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AIChat } from "@/components/AIChat";
import { CareerGrowth } from "@/components/CareerGrowth";
import { DigitalDetox } from "@/components/DigitalDetox";
import { GamifiedWellbeing } from "@/components/GamifiedWellbeing";
import { PersonalizedDashboard } from "@/components/PersonalizedDashboard";
import { Testimonials } from "@/components/Testimonials";
import { SupportOptions } from "@/components/SupportOptions";
import { Footer } from "@/components/Footer";

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = "MindMend - Your AI Wellness Companion";
    
    // Add CSS to ensure text is always visible in light mode
    const style = document.createElement('style');
    style.textContent = `
      body {
        color: #1e293b !important; /* slate-800 to ensure text is visible */
      }
      
      .text-white {
        color: white !important;
      }
      
      h1, h2, h3, h4, h5, h6, p, span, div {
        color: inherit;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />
      <Hero />
      <Features />
      <AIChat />
      <CareerGrowth />
      <DigitalDetox />
      <GamifiedWellbeing />
      <PersonalizedDashboard />
      <SupportOptions />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
