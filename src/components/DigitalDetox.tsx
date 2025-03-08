
import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Clock, 
  TrendingDown, 
  Award, 
  Check, 
  ChevronRight,
  ChevronUp,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

type Challenge = {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'join' | 'completed';
  participants: number;
  progress: string;
}

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
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  
  // Initial challenges
  const initialChallenges: Challenge[] = [
    {
      id: 1,
      title: "Mindful Morning",
      description: "No phone for first hour after waking",
      status: 'active',
      participants: 5,
      progress: "Day 3/7"
    },
    {
      id: 2,
      title: "Social Media Cleanse",
      description: "72 hours without social media apps",
      status: 'join',
      participants: 10,
      progress: "Starts in 2 days"
    },
    {
      id: 3,
      title: "No-Phone Meal Times",
      description: "Eat without screen distractions",
      status: 'join',
      participants: 6,
      progress: "Ongoing"
    },
    {
      id: 4,
      title: "Digital Sabbath",
      description: "One full day without screens each week",
      status: 'join',
      participants: 8,
      progress: "Starts this weekend"
    },
    {
      id: 5,
      title: "App Detox Challenge",
      description: "Delete your most distracting app for 5 days",
      status: 'join',
      participants: 12,
      progress: "Ongoing"
    },
    {
      id: 6,
      title: "Notification Silence",
      description: "Turn off all non-essential notifications",
      status: 'join',
      participants: 15,
      progress: "Join anytime"
    }
  ];

  // Get challenges from localStorage or use defaults
  const getStoredChallenges = () => {
    if (typeof window === 'undefined') return initialChallenges;
    
    const savedChallenges = localStorage.getItem('digitalDetoxChallenges');
    return savedChallenges ? JSON.parse(savedChallenges) : initialChallenges;
  };

  const [challenges, setChallenges] = useState<Challenge[]>(getStoredChallenges);
  
  // Save all settings when they change
  useEffect(() => {
    const settings = { screenTime, detoxGoal, appLimit };
    localStorage.setItem('digitalDetoxSettings', JSON.stringify(settings));
    localStorage.setItem('digitalDetoxChallenges', JSON.stringify(challenges));
  }, [screenTime, detoxGoal, appLimit, challenges]);
  
  const saveGoals = () => {
    toast({
      title: "Goals Saved!",
      description: `Your daily screen time goal is now ${detoxGoal} hours with focus on limiting ${appLimit}.`,
    });
  };

  const toggleChallengeStatus = (id: number) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === id) {
        let newStatus: 'active' | 'join' | 'completed';
        
        if (challenge.status === 'join') newStatus = 'active';
        else if (challenge.status === 'active') newStatus = 'completed';
        else newStatus = 'join';
        
        return {...challenge, status: newStatus};
      }
      return challenge;
    }));
    
    // Show toast based on new status
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
      if (challenge.status === 'join') {
        toast({
          title: "Challenge Joined!",
          description: `You've joined the "${challenge.title}" challenge.`,
        });
      } else if (challenge.status === 'active') {
        toast({
          title: "Challenge Completed!",
          description: `Congratulations on completing the "${challenge.title}" challenge!`,
        });
      }
    }
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
                {challenges.slice(0, showAllChallenges ? challenges.length : 3).map((challenge) => (
                  <div key={challenge.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-slate-800">{challenge.title}</h4>
                        <p className="text-sm text-slate-500">{challenge.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        className={`text-xs px-2 py-1 rounded-full ${
                          challenge.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : challenge.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                        onClick={() => toggleChallengeStatus(challenge.id)}
                      >
                        {challenge.status === 'active' 
                          ? 'Active' 
                          : challenge.status === 'completed' 
                            ? 'Completed' 
                            : 'Join'
                        }
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                            {challenge.id === 1 ? 'S' : challenge.id === 2 ? 'J' : 'A'}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                            {challenge.id === 1 ? 'T' : challenge.id === 2 ? 'K' : 'M'}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-well-blue text-white flex items-center justify-center text-xs">
                            +{challenge.participants - 2}
                          </div>
                        </div>
                        <span>{challenge.participants} participants</span>
                      </div>
                      <div className="text-xs font-medium text-slate-600">{challenge.progress}</div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full gap-1 text-slate-800" 
                    onClick={() => setShowAllChallenges(!showAllChallenges)}
                  >
                    {showAllChallenges ? (
                      <>See fewer challenges <ChevronUp className="h-4 w-4" /></>
                    ) : (
                      <>See all challenges <ChevronRight className="h-4 w-4" /></>
                    )}
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
