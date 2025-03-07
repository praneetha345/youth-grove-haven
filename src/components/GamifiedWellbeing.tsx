
import { useState } from "react";
import { 
  Trophy, 
  Calendar, 
  Target, 
  BarChart3, 
  Flame,
  Award,
  Medal,
  Star,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

type Challenge = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  points: number;
  completed: boolean;
  progress: number;
  daysStreak?: number;
  badgeEarned?: boolean;
};

export const GamifiedWellbeing = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Morning Mindfulness",
      description: "Complete a 5-minute meditation session in the morning",
      icon: Calendar,
      points: 50,
      completed: false,
      progress: 0,
      daysStreak: 3
    },
    {
      id: 2,
      title: "Digital Detox Hour",
      description: "No phone or screens for 1 full hour",
      icon: Target,
      points: 70,
      completed: false,
      progress: 65,
    },
    {
      id: 3,
      title: "Gratitude Journal",
      description: "Write down 3 things you're grateful for today",
      icon: BarChart3,
      points: 40,
      completed: true,
      progress: 100,
      badgeEarned: true
    },
    {
      id: 4,
      title: "Mood Check-In Streak",
      description: "Check in with your mood every day this week",
      icon: Flame,
      points: 60,
      completed: false,
      progress: 57,
      daysStreak: 4
    }
  ]);

  const [userPoints, setUserPoints] = useState(320);
  const [userLevel, setUserLevel] = useState(4);
  
  const completeChallenge = (id: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id 
        ? {...challenge, completed: true, progress: 100, badgeEarned: true} 
        : challenge
    ));
    setUserPoints(userPoints + challenges.find(c => c.id === id)?.points || 0);
  };

  return (
    <section id="gamified" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Gamified Well-Being
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Gamified</span> Self-Improvement
          </h2>
          <p className="text-slate-600">
            Track your progress, complete challenges, earn rewards, and improve your well-being while having fun.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-6 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Today's Challenges</h3>
                <Button className="bg-well-gradient hover:opacity-90">
                  <Trophy className="h-4 w-4 mr-2" /> View All
                </Button>
              </div>
              
              <div className="space-y-6">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-lg ${challenge.completed ? 'bg-green-100' : 'bg-slate-100'} flex items-center justify-center`}>
                          <challenge.icon className={`h-5 w-5 ${challenge.completed ? 'text-green-600' : 'text-slate-600'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{challenge.title}</h4>
                            {challenge.daysStreak && (
                              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                <Flame className="h-3 w-3" /> {challenge.daysStreak} day streak
                              </div>
                            )}
                            {challenge.badgeEarned && (
                              <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                <Award className="h-3 w-3" /> Badge earned
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{challenge.description}</p>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-500">Progress</span>
                              <span className="font-medium">{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-amber-600">{challenge.points} pts</span>
                        {!challenge.completed && (
                          <Button 
                            size="sm" 
                            className="mt-4 bg-well-gradient hover:opacity-90"
                            onClick={() => completeChallenge(challenge.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-6 rounded-xl border border-slate-200 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-well-gradient flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Level {userLevel}</h3>
                <p className="text-slate-500 text-sm mb-4">Wellness Warrior</p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{userPoints} pts</span>
                    <span>{userPoints + 180} pts</span>
                  </div>
                  <Progress value={(userPoints % 500) / 5} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">180 points until Level {userLevel + 1}</p>
                </div>
                
                <Button className="w-full bg-well-gradient hover:opacity-90">
                  Redeem Rewards
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold mb-4">Your Achievements</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Medal className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Consistency Champion</h4>
                    <p className="text-xs text-slate-500">7-day streak of completing challenges</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Mindfulness Master</h4>
                    <p className="text-xs text-slate-500">Completed 10 meditation sessions</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Digital Balance Pro</h4>
                    <p className="text-xs text-slate-500">Reduced screen time by 20%</p>
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
