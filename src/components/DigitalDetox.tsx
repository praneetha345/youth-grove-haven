
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  PhoneOff, 
  Trophy, 
  Phone, 
  AlertCircle, 
  GanttChart,
  BarChart,
  CheckCircle
} from 'lucide-react';

// Mock usage data
const appUsage = [
  { name: "Instagram", time: 125, icon: "📱", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Twitter", time: 87, icon: "🐦", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
  { name: "TikTok", time: 103, icon: "🎵", color: "bg-gradient-to-r from-black to-gray-800" },
  { name: "Facebook", time: 45, icon: "👥", color: "bg-gradient-to-r from-blue-600 to-blue-800" },
  { name: "YouTube", time: 112, icon: "📺", color: "bg-gradient-to-r from-red-600 to-red-700" },
];

// Mock challenges
const challenges = [
  { 
    id: 1, 
    title: "Morning Mindfulness", 
    description: "Check your phone only after completing a 5-minute meditation session each morning.",
    duration: "7 days",
    difficulty: "Easy",
    reward: 300,
    started: true,
    progress: 4,
    color: "bg-gradient-to-r from-teal-400 to-teal-600"
  },
  { 
    id: 2, 
    title: "Screen-Free Evenings", 
    description: "Avoid all screens for 1 hour before bedtime for better sleep quality.",
    duration: "14 days",
    difficulty: "Medium",
    reward: 600,
    started: true,
    progress: 8,
    color: "bg-gradient-to-r from-blue-400 to-blue-600"
  },
  { 
    id: 3, 
    title: "Full Day Detox", 
    description: "Complete a 24-hour digital detox during the weekend.",
    duration: "1 day",
    difficulty: "Hard",
    reward: 1000,
    started: false,
    progress: 0,
    color: "bg-gradient-to-r from-purple-500 to-purple-700"
  },
  { 
    id: 4, 
    title: "Social Media Limiter", 
    description: "Limit social media use to 30 minutes per day.",
    duration: "21 days",
    difficulty: "Medium",
    reward: 750,
    started: false,
    progress: 0,
    color: "bg-gradient-to-r from-red-400 to-red-600"
  },
];

export const DigitalDetox = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([1, 2]);
  
  const totalScreenTime = appUsage.reduce((acc, app) => acc + app.time, 0);
  const hours = Math.floor(totalScreenTime / 60);
  const minutes = totalScreenTime % 60;
  
  const toggleChallenge = (id: number) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(joinedChallenges.filter(cid => cid !== id));
    } else {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white" id="digital-detox">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Digital <span className="text-gradient">Detox</span> Solutions
          </h2>
          <p className="text-slate-600">
            Regain control of your digital habits with AI-powered usage tracking, challenges, and personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="analytics" className="text-sm sm:text-base">
                <GanttChart className="h-4 w-4 mr-2" /> Usage Analytics
              </TabsTrigger>
              <TabsTrigger value="challenges" className="text-sm sm:text-base">
                <Trophy className="h-4 w-4 mr-2" /> Detox Challenges
              </TabsTrigger>
              <TabsTrigger value="limits" className="text-sm sm:text-base">
                <AlertCircle className="h-4 w-4 mr-2" /> App Limits
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Today's Screen Time</h3>
                    <div className="flex items-center mb-6">
                      <div className="w-28 h-28 rounded-full border-8 border-well-blue flex items-center justify-center bg-white mr-5">
                        <div className="text-center">
                          <p className="text-lg font-bold text-well-blue">{hours}h {minutes}m</p>
                          <p className="text-xs text-slate-500">Total</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-600">
                          <span className="text-red-500 font-medium">+18%</span> increase compared to your weekly average
                        </p>
                        <p className="text-slate-500 text-sm mt-1">
                          Your goal: Less than 3 hours daily
                        </p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-sm text-slate-500 mb-3">APP BREAKDOWN</h4>
                    <div className="space-y-4">
                      {appUsage.map((app, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white mr-3`}>
                            <span>{app.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{app.name}</span>
                              <span className="text-slate-600">
                                {Math.floor(app.time / 60)}h {app.time % 60}m
                              </span>
                            </div>
                            <Progress 
                              value={(app.time / totalScreenTime) * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Weekly Trends</h3>
                    <div className="h-60 mb-6">
                      {/* Placeholder for chart */}
                      <div className="h-full w-full bg-slate-50 rounded-lg flex items-center justify-center">
                        <BarChart className="h-10 w-10 text-slate-300" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                        <h4 className="font-medium mb-1">AI Insight</h4>
                        <p className="text-sm text-slate-600">
                          You tend to spend more time on social media during evenings (8-10 PM). Setting app limits during this time could help reduce overall screen time.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <h4 className="font-medium mb-1">Weekly Progress</h4>
                        <p className="text-sm text-slate-600">
                          You've reduced your Instagram usage by 15% this week. Keep it up!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-4">Digital Detox Challenges</h3>
                <p className="text-slate-600 mb-6">
                  Join challenges to build healthier digital habits and earn rewards.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {challenges.map(challenge => (
                    <div 
                      key={challenge.id} 
                      className={`p-4 rounded-lg border ${challenge.id === selectedChallenge ? 'border-well-purple/30 bg-well-purple/5' : 'border-slate-200'} hover:shadow-md transition-shadow cursor-pointer`}
                      onClick={() => setSelectedChallenge(challenge.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{challenge.description}</p>
                          
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-slate-400" />
                              <span className="text-xs text-slate-500">{challenge.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-amber-500" />
                              <span className="text-xs text-slate-500">{challenge.reward} pts</span>
                            </div>
                            <Badge className={`text-xs px-2 py-0.5 ${
                              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              challenge.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {challenge.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant={joinedChallenges.includes(challenge.id) ? "outline" : "default"}
                          className={joinedChallenges.includes(challenge.id) ? 
                            "border-well-purple text-well-purple hover:bg-well-purple/10" : 
                            "bg-well-purple text-white hover:bg-well-purple/90"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChallenge(challenge.id);
                          }}
                        >
                          {joinedChallenges.includes(challenge.id) ? 'Joined' : 'Join'}
                        </Button>
                      </div>
                      
                      {joinedChallenges.includes(challenge.id) && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-500">Progress</span>
                            <span className="text-xs font-medium">{challenge.progress}/{challenge.duration.split(' ')[0]}</span>
                          </div>
                          <Progress 
                            value={(challenge.progress / parseInt(challenge.duration.split(' ')[0])) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedChallenge && (
                  <div className="mt-8 p-5 border border-slate-200 rounded-lg bg-slate-50">
                    <h4 className="font-semibold mb-4">Tips for "{challenges.find(c => c.id === selectedChallenge)?.title}"</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-slate-600">Set specific times to check your devices.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-slate-600">Use the "Do Not Disturb" mode during focus periods.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-slate-600">Find alternative activities to replace screen time.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-slate-600">Track your progress and celebrate small wins.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="limits" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-4">App Time Limits</h3>
                <p className="text-slate-600 mb-6">
                  Set daily time limits for apps to maintain a healthy digital balance.
                </p>
                
                <div className="space-y-4">
                  {appUsage.map((app, index) => (
                    <div key={index} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white mr-3`}>
                            <span>{app.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{app.name}</h4>
                            <p className="text-xs text-slate-500">
                              Currently using {Math.floor(app.time / 60)}h {app.time % 60}m per day
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                            <Button variant="ghost" className="h-8 px-3 rounded-none">
                              <span>30m</span>
                            </Button>
                            <Button variant="ghost" className="h-8 px-3 rounded-none bg-slate-50">
                              <span>1h</span>
                            </Button>
                            <Button variant="ghost" className="h-8 px-3 rounded-none">
                              <span>2h</span>
                            </Button>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="bg-well-blue text-white hover:bg-well-blue/90 h-8"
                          >
                            Set
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-well-blue/10 border border-well-blue/20 rounded-lg">
                    <div className="flex items-start">
                      <PhoneOff className="h-5 w-5 text-well-blue shrink-0 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Focus Mode</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Block all social media apps during specific hours to maximize productivity and minimize distractions.
                        </p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-slate-500 block mb-1">Start Time</label>
                            <Input type="time" defaultValue="09:00" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 block mb-1">End Time</label>
                            <Input type="time" defaultValue="17:00" />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="workdays" className="rounded text-well-blue" />
                            <label htmlFor="workdays" className="text-sm">Workdays only</label>
                          </div>
                          
                          <Button 
                            className="bg-well-blue text-white hover:bg-well-blue/90"
                          >
                            Activate Focus Mode
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
