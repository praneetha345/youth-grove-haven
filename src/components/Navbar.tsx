
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Heart, 
  Briefcase, 
  Smartphone, 
  Users, 
  LifeBuoy,
  Trophy,
  BrainCircuit
} from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 glass-card bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-7 w-7 text-well-blue" />
            <span className="text-lg md:text-xl font-bold bg-well-gradient bg-clip-text text-transparent">
              Youth Well-Being Hub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#mental-health" className="text-slate-600 hover:text-well-blue transition-colors flex items-center gap-1">
              <Heart className="h-4 w-4" /> Mental Health
            </a>
            <a href="#career" className="text-slate-600 hover:text-well-blue transition-colors flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> Career Growth
            </a>
            <a href="#detox" className="text-slate-600 hover:text-well-blue transition-colors flex items-center gap-1">
              <Smartphone className="h-4 w-4" /> Digital Detox
            </a>
            <a href="#community" className="text-slate-600 hover:text-well-blue transition-colors flex items-center gap-1">
              <Users className="h-4 w-4" /> Community
            </a>
            <a href="#emergency" className="text-slate-600 hover:text-well-blue transition-colors flex items-center gap-1">
              <LifeBuoy className="h-4 w-4" /> Emergency
            </a>
            <Button className="bg-well-gradient hover:opacity-90">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-slate-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white border-t border-slate-100 p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-3">
            <a href="#mental-health" className="text-slate-600 py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
              <Heart className="h-4 w-4" /> Mental Health
            </a>
            <a href="#career" className="text-slate-600 py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Career Growth
            </a>
            <a href="#detox" className="text-slate-600 py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> Digital Detox
            </a>
            <a href="#community" className="text-slate-600 py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
              <Users className="h-4 w-4" /> Community
            </a>
            <a href="#emergency" className="text-slate-600 py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
              <LifeBuoy className="h-4 w-4" /> Emergency
            </a>
            <Button className="bg-well-gradient hover:opacity-90 w-full">Get Started</Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
