
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
  return (
    <div className="min-h-screen">
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
