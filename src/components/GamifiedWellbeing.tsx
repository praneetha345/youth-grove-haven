
import { motion } from "framer-motion";
import { 
  Trophy, 
  Target, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Zap, 
  Brain,
  AlarmClock,
  Clock,
  BookOpen,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type Challenge = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  category: 'mental' | 'physical' | 'digital' | 'social';
  xp: number;
  progress: number;
  isCompleted: boolean;
}

export const GamifiedWellbeing = () => {
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(756);
  const [streak, setStreak] = useState(5);
  const [dailyGoalCompleted, setDailyGoalCompleted] = useState(false);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Mindful Meditation",
      description: "Complete a 10-minute guided meditation session",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      category: 'mental',
      xp: 50,
      progress: 60,
      isCompleted: false
    },
    {
      id: 2,
      title: "Digital Sunset",
      description: "No screen time 1 hour before bed for 5 days",
      icon: <Smartphone className="h-5 w-5 text-blue-500" />,
      category: 'digital',
      xp: 100,
      progress: 80,
      isCompleted: false
    },
    {
      id: 3,
      title: "Gratitude Journal",
      description: "Write down 3 things you're grateful for today",
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      category: 'mental',
      xp: 30,
      progress: 100,
      isCompleted: true
    },
    {
      id: 4,
      title: "Focus Time",
      description: "Complete a 25-minute distraction-free work session",
      icon: <AlarmClock className="h-5 w-5 text-amber-500" />,
      category: 'digital',
      xp: 40,
      progress: 25,
      isCompleted: false
    },
    {
      id: 5,
      title: "Screen-Free Hour",
      description: "Spend one hour away from all screens",
      icon: <Clock className="h-5 w-5 text-teal-500" />,
      category: 'digital',
      xp: 60,
      progress: 0,
      isCompleted: false
    }
  ]);

  const completeDailyGoal = () => {
    if (!dailyGoalCompleted) {
      setDailyGoalCompleted(true);
      setXp(xp + 75);
      setStreak(streak + 1);
      toast({
        title: "Daily Goal Completed!",
        description: "You've earned 75 XP and increased your streak to " + (streak + 1) + " days!",
      });
    }
  };

  const completeChallenge = (id: number) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id) {
        if (!challenge.isCompleted) {
          setXp(xp + challenge.xp);
          toast({
            title: "Challenge Completed!",
            description: `You've earned ${challenge.xp} XP for completing "${challenge.title}"!`,
          });
          
          if (xp + challenge.xp >= 1000) {
            setLevel(level + 1);
            setXp((xp + challenge.xp) - 1000);
            toast({
              title: "Level Up!",
              description: `Congratulations! You've reached Level ${level + 1}!`,
            });
          }
        }
        return { ...challenge, progress: 100, isCompleted: true };
      }
      return challenge;
    }));
  };

  return (
    <section id="gamified" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            <Trophy className="h-3.5 w-3.5 text-amber-500 inline mr-1" />
            Gamified Well-being
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Turn Well-being into <span className="text-gradient">Fun Challenges</span>
          </h2>
          <p className="text-slate-600">
            Earn rewards, track your progress, and build healthy habits through engaging challenges and daily goals.
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
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-well-blue to-well-purple text-white flex items-center justify-center text-xl font-bold mb-2">
                  {level}
                </div>
                <h3 className="font-semibold text-lg">Level {level} Explorer</h3>
                <p className="text-sm text-slate-500 mt-1">Working toward Level {level + 1}</p>
                <div className="w-full mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{xp} XP</span>
                    <span>1000 XP</span>
                  </div>
                  <Progress value={(xp / 1000) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-5 w-5 text-well-blue" />
                    <div>
                      <h4 className="font-medium">Daily Goals</h4>
                      <p className="text-xs text-slate-500">Complete for XP and streaks</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg border ${dailyGoalCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'} transition-colors`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {dailyGoalCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Target className="h-4 w-4 text-amber-500" />
                          )}
                          <span className="text-sm font-medium">10-minute meditation</span>
                        </div>
                        <Badge variant="outline" className="text-xs">75 XP</Badge>
                      </div>
                      
                      {!dailyGoalCompleted && (
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-well-blue to-well-purple hover:opacity-90 text-white"
                          onClick={completeDailyGoal}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <div>
                      <h4 className="font-medium">Streak</h4>
                      <p className="text-xs text-slate-500">You're on a roll!</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-amber-500">{streak}</div>
                      <div className="text-xs text-slate-500">days</div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div 
                          key={day} 
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${day <= streak ? 'bg-amber-500' : 'bg-slate-200'}`}
                        >
                          {day <= streak && (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Achievements</h4>
                      <p className="text-xs text-slate-500">7/25 unlocked</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-well-gradient flex items-center justify-center mb-1">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs">Self-care</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <span className="text-xs">Learning</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-well-gradient flex items-center justify-center mb-1">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs">Mindful</span>
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
            <div className="glass-card rounded-xl border border-slate-200 overflow-hidden p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Active Challenges</h3>
                <div className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer">Mental</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">Digital</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Social</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <motion.div 
                    key={challenge.id}
                    className={`p-4 rounded-lg border ${challenge.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: challenge.id * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100">
                          {challenge.icon}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{challenge.title}</h4>
                            <Badge variant="outline" className="text-xs">{challenge.xp} XP</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{challenge.description}</p>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 items-end justify-between sm:min-w-[120px]">
                        {challenge.isCompleted ? (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-well-blue to-well-purple hover:opacity-90 text-white"
                            onClick={() => completeChallenge(challenge.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="gap-2">
                  Discover More Challenges
                  <Trophy className="h-4 w-4 text-amber-500" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
