
import { useState } from "react";
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Calendar, 
  BrainCircuit, 
  GraduationCap,
  Smartphone,
  Smile,
  Meh,
  Frown,
  ArrowUp,
  ArrowDown,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

export const PersonalizedDashboard = () => {
  const [currentDate] = useState(new Date());
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Your Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">AI-Personalized</span> Dashboard
          </h2>
          <p className="text-slate-600">
            Your customized wellness command center with AI-driven insights and recommendations tailored to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-6 rounded-xl border border-slate-200 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Today</h3>
                <span className="text-sm text-slate-500">{dayNames[currentDate.getDay()]}, {monthNames[currentDate.getMonth()]} {currentDate.getDate()}</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Mood Trend</h4>
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <ArrowUp className="h-3 w-3" /> 
                      <span>Improving</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-around py-2">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mb-1">
                        <Frown className="h-4 w-4 text-slate-500" />
                      </div>
                      <span className="text-xs">Mon</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mb-1">
                        <Meh className="h-4 w-4 text-slate-500" />
                      </div>
                      <span className="text-xs">Tue</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mb-1">
                        <Meh className="h-4 w-4 text-slate-500" />
                      </div>
                      <span className="text-xs">Wed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                        <Smile className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-xs">Thu</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
                        <Smile className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-xs font-medium">Today</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-medium text-sm mb-3">AI Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BrainCircuit className="h-4 w-4 text-well-blue flex-shrink-0" />
                      <span>Try a 10-minute guided meditation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-well-purple flex-shrink-0" />
                      <span>Update your career roadmap</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="h-4 w-4 text-well-teal flex-shrink-0" />
                      <span>Join today's Digital Detox challenge</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-medium text-sm mb-3">Weekly Progress</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Mental Well-being</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Career Development</span>
                        <span className="font-medium">52%</span>
                      </div>
                      <Progress value={52} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Digital Balance</span>
                        <span className="font-medium">77%</span>
                      </div>
                      <Progress value={77} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-xl border border-slate-200 overflow-hidden">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b border-slate-100">
                  <div className="px-6 pt-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="mental">Mental Health</TabsTrigger>
                      <TabsTrigger value="career">Career Growth</TabsTrigger>
                      <TabsTrigger value="digital">Digital Balance</TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Wellness Insights</h4>
                        <LineChart className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="h-40 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-center">
                          <p className="text-sm text-slate-500 mb-2">Your personalized wellness chart</p>
                          <Button variant="outline" size="sm">Generate Insights</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Weekly Goals</h4>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4 text-slate-400" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <p className="text-sm">Set and track your weekly wellness goals.</p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center">
                              <Calendar className="h-3 w-3 text-amber-600" />
                            </div>
                            <span className="text-sm">Meditation practice</span>
                          </div>
                          <span className="text-sm font-medium">3/5 days</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                              <Smartphone className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm">Screen time reduction</span>
                          </div>
                          <span className="text-sm font-medium">-20%</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center">
                              <GraduationCap className="h-3 w-3 text-purple-600" />
                            </div>
                            <span className="text-sm">Career skill learning</span>
                          </div>
                          <span className="text-sm font-medium">2/3 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">AI Personalized Journal</h4>
                      <Button variant="outline" size="sm">Write Entry</Button>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-3">
                      <p className="text-sm text-slate-600 italic">
                        "Today I feel more energized than yesterday. The meditation session helped me focus better during my study session."
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-slate-400">Yesterday, 8:45 PM</span>
                        <div className="flex items-center gap-1">
                          <Smile className="h-3 w-3 text-green-500" />
                          <span className="text-xs font-medium text-green-600">Positive</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <p className="text-sm text-slate-600 italic">
                        "Feeling a bit anxious about tomorrow's presentation, but I've prepared well. Going to try the breathing exercises before bed."
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-slate-400">2 days ago, 10:20 PM</span>
                        <div className="flex items-center gap-1">
                          <Meh className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">Neutral</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mental" className="focus-visible:outline-none focus-visible:ring-0 p-6">
                  <div className="text-center py-10">
                    <BrainCircuit className="h-10 w-10 text-well-blue mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">Personalized Mental Health Dashboard</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                      Track your mood patterns, meditation progress, and get AI-powered mental wellness recommendations.
                    </p>
                    <Button className="bg-well-blue text-white hover:bg-well-blue/90">
                      Activate Mental Health Tracking
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="career" className="focus-visible:outline-none focus-visible:ring-0 p-6">
                  <div className="text-center py-10">
                    <GraduationCap className="h-10 w-10 text-well-purple mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">Career Development Dashboard</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                      Track your skill development, job application progress, and get AI-powered career recommendations.
                    </p>
                    <Button className="bg-well-purple text-white hover:bg-well-purple/90">
                      Set Up Career Goals
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="digital" className="focus-visible:outline-none focus-visible:ring-0 p-6">
                  <div className="text-center py-10">
                    <Smartphone className="h-10 w-10 text-well-teal mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">Digital Wellness Dashboard</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                      Track your screen time, app usage, and get AI-powered recommendations for digital balance.
                    </p>
                    <Button className="bg-well-teal text-white hover:bg-well-teal/90">
                      Connect Your Devices
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
