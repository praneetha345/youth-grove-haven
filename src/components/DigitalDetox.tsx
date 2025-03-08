
import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Clock, 
  TrendingDown, 
  Award, 
  Check, 
  ChevronRight,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export const DigitalDetox = () => {
  // Load saved settings from localStorage or use defaults
  const getSavedSettings = () => {
    if (typeof window === 'undefined') return null;
    
    const savedSettings = localStorage.getItem('digitalDetoxSettings');
    return savedSettings ? JSON.parse(savedSettings) : null;
  };

  const [screenTime, setScreenTime] = useState(() => getSavedSettings()?.screenTime || 5);
  const [detoxGoal, setDetoxGoal] = useState(() => getSavedSettings()?.detoxGoal || 3);
  const [appLimit, setAppLimit] = useState(() => getSavedSettings()?.appLimit || "Instagram");
  
  // Save settings when they change
  useEffect(() => {
    const settings = { screenTime, detoxGoal, appLimit };
    localStorage.setItem('digitalDetoxSettings', JSON.stringify(settings));
  }, [screenTime, detoxGoal, appLimit]);
  
  const saveGoals = () => {
    toast({
      title: "Goals Saved!",
      description: `Your daily screen time goal is now ${detoxGoal} hours with focus on limiting ${appLimit}.`,
    });
  };

  return (
    <section id="detox" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Digital Wellbeing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Achieve <span className="text-gradient">Digital Balance</span> With AI
          </h2>
          <p className="text-slate-600">
            Track your app usage, set healthy limits, and participate in challenges to improve your relationship with technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-xl border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-well-gradient flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Daily Screen Time</h3>
                    <p className="text-sm text-slate-500">Today's usage</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Current</span>
                    <span className="text-sm font-medium">{screenTime} hrs</span>
                  </div>
                  <Progress value={screenTime * 10} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 rounded-full bg-well-blue"></div>
                      Social Media
                    </span>
                    <span className="font-medium">2.5 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 rounded-full bg-well-purple"></div>
                      Entertainment
                    </span>
                    <span className="font-medium">1.8 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 rounded-full bg-well-teal"></div>
                      Productivity
                    </span>
                    <span className="font-medium">0.7 hrs</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-well-purple to-well-blue flex items-center justify-center mr-4">
                    <TrendingDown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Set Detox Goals</h3>
                    <p className="text-sm text-slate-500">Personalize your limits</p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-slate-600 mb-2">Daily screen time goal (hours)</label>
                    <Input 
                      type="number" 
                      value={detoxGoal}
                      onChange={(e) => setDetoxGoal(Number(e.target.value))}
                      min="1"
                      max="10"
                      className="mb-1"
                    />
                    <div className="text-xs text-slate-500">Recommended: 3-4 hours per day</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-600 mb-2">App to limit</label>
                    <Input 
                      type="text" 
                      value={appLimit}
                      onChange={(e) => setAppLimit(e.target.value)}
                      className="mb-1"
                    />
                    <div className="text-xs text-slate-500">Which app do you want to reduce usage of?</div>
                  </div>
                  
                  <Button 
                    className="w-full bg-well-gradient hover:opacity-90 gap-2"
                    onClick={saveGoals}
                  >
                    <Save className="h-4 w-4" />
                    Save Goals
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-well-purple" />
                Digital Detox Challenges
              </h3>
              
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Mindful Morning</h4>
                      <p className="text-sm text-slate-500">No phone for first hour after waking</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">S</div>
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">T</div>
                        <div className="w-6 h-6 rounded-full bg-well-blue text-white flex items-center justify-center text-xs">+3</div>
                      </div>
                      <span>5 participants</span>
                    </div>
                    <div className="text-xs font-medium text-well-blue">Day 3/7</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Social Media Cleanse</h4>
                      <p className="text-sm text-slate-500">72 hours without social media apps</p>
                    </div>
                    <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">Join</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">J</div>
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">K</div>
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">+8</div>
                      </div>
                      <span>10 participants</span>
                    </div>
                    <div className="text-xs font-medium text-slate-600">Starts in 2 days</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">No-Phone Meal Times</h4>
                      <p className="text-sm text-slate-500">Eat without screen distractions</p>
                    </div>
                    <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">Join</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">A</div>
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">M</div>
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">+4</div>
                      </div>
                      <span>6 participants</span>
                    </div>
                    <div className="text-xs font-medium text-slate-600">Ongoing</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full gap-1">
                    See all challenges <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
