
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Award, 
  BookOpen, 
  Users,
  ArrowRight
} from 'lucide-react';

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 opacity-20 animate-float">
        <div className="absolute top-24 right-24 w-64 h-64 rounded-full bg-well-blue opacity-20"></div>
        <div className="absolute top-48 right-48 w-40 h-40 rounded-full bg-well-purple opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="space-y-6 md:pr-12">
            <div className="inline-block animate-fade-in">
              <span className="px-3 py-1 rounded-full bg-well-blue/10 text-well-blue text-sm font-medium">
                AI-Powered Well-Being Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your <span className="text-gradient">AI Companion</span> for Mental Wellness
            </h1>
            
            <p className="text-lg text-slate-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Empowering youth with AI-driven tools for mental health support, career guidance, and digital well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button className="btn-gradient px-6 py-6 rounded-xl text-white font-medium">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="btn-outline px-6 py-6 rounded-xl">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="glass-card p-4">
                <p className="text-3xl font-bold text-well-blue">10k+</p>
                <p className="text-sm text-slate-500">Young Lives Improved</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-3xl font-bold text-well-purple">92%</p>
                <p className="text-sm text-slate-500">Satisfaction Rate</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div 
              className="glass-card p-8 rounded-2xl overflow-hidden transition-all duration-300 transform"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative z-10">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-well-blue flex items-center justify-center text-white">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">AI Well-Being Assistant</h3>
                      <p className="text-sm text-slate-500">Personalized support 24/7</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-well-purple flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700">How are you feeling today, Sarah? I've noticed your sleep pattern has improved this week.</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 relative">
                      <div className="bg-slate-100 rounded-lg p-3 animate-pulse-light">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Type your response...</span>
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 rounded-full bg-well-teal/20 flex items-center justify-center">
                              <span className="text-well-teal text-xs">🎤</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                      <Award className="h-5 w-5 text-well-blue mb-2" />
                      <span className="text-xs text-slate-600">Daily Goals</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                      <BookOpen className="h-5 w-5 text-well-teal mb-2" />
                      <span className="text-xs text-slate-600">Resources</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                      <Users className="h-5 w-5 text-well-purple mb-2" />
                      <span className="text-xs text-slate-600">Community</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated background elements */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-well-blue/5 -z-10 transition-all duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
              <div className={`absolute bottom-0 left-20 w-24 h-24 rounded-full bg-well-purple/5 -z-10 transition-all duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
