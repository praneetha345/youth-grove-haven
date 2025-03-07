
import { BrainCircuit, Heart, Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit className="h-7 w-7 text-well-blue" />
              <span className="text-xl font-bold bg-well-gradient bg-clip-text text-transparent">
                YouthWell
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              AI-powered well-being platform for mental health, career growth, and digital balance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#mental-health" className="text-slate-400 hover:text-white transition-colors">Mental Health</a></li>
              <li><a href="#career" className="text-slate-400 hover:text-white transition-colors">Career Growth</a></li>
              <li><a href="#detox" className="text-slate-400 hover:text-white transition-colors">Digital Detox</a></li>
              <li><a href="#community" className="text-slate-400 hover:text-white transition-colors">Community Support</a></li>
              <li><a href="#emergency" className="text-slate-400 hover:text-white transition-colors">Emergency Help</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Mental Health Articles</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Career Planning</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">
              Join our newsletter for well-being tips, career advice, and digital wellness strategies.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-slate-800 border-slate-700" />
              <Button className="bg-well-blue hover:bg-well-blue/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2023 Youth Well-Being Hub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <div className="flex items-center">
              <Heart className="h-3 w-3 text-red-400 mr-1" /> Made with love for youth well-being
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
