
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 mb-6">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-well-blue" />
                AI-Powered Youth Well-Being Platform
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Your AI Companion for{" "}
              <span className="bg-well-gradient bg-clip-text text-transparent">
                Mental Well-Being
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Personalized mental health support, career guidance, and digital well-being solutions 
              powered by AI that understands and grows with you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-well-gradient hover:opacity-90 gap-2 px-6">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-6">
                Talk to AI <BrainCircuit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-slate-500">
              <Heart className="h-4 w-4 text-well-purple mr-2" />
              <span>Trusted by 10,000+ users worldwide</span>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-light"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse-light"></div>
              
              <div className="relative glass-card overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                <div className="p-6 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-well-gradient flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Well-Being Assistant</h3>
                      <p className="text-xs text-slate-500">Personal, empathetic support</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-white/70 rounded-lg p-4 shadow-sm border border-slate-100">
                      <p className="text-slate-600">How are you feeling today?</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Happy", "Stressed", "Anxious", "Motivated", "Confused"].map((mood) => (
                          <Button
                            key={mood}
                            variant="outline"
                            size="sm"
                            className="rounded-full bg-white hover:bg-slate-50"
                          >
                            {mood}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-well-blue/10 rounded-lg p-4 border border-well-blue/20 text-slate-700">
                      <p>I'm here for you. Would you like to talk about what's making you feel this way?</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your response..."
                      className="w-full rounded-full border border-slate-200 px-4 py-2.5 pr-10 focus:border-blue-400 focus:ring-blue-400 text-sm"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-well-blue"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
