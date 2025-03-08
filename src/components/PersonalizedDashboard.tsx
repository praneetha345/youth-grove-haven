
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  Calendar, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon, 
  BookOpen, 
  LayoutDashboard, 
  Award, 
  ArrowRight, 
  Smile, 
  Meh, 
  Frown,
  Trash2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Sample chart data
const sleepData = [
  { name: 'Mon', hours: 7.2 },
  { name: 'Tue', hours: 6.8 },
  { name: 'Wed', hours: 7.5 },
  { name: 'Thu', hours: 8.1 },
  { name: 'Fri', hours: 6.7 },
  { name: 'Sat', hours: 7.9 },
  { name: 'Sun', hours: 8.3 }
];

const moodData = [
  { name: 'Mon', value: 7 },
  { name: 'Tue', value: 6 },
  { name: 'Wed', value: 8 },
  { name: 'Thu', value: 9 },
  { name: 'Fri', value: 7 },
  { name: 'Sat', value: 8 },
  { name: 'Sun', value: 9 }
];

const screenTimeData = [
  { name: 'Mon', hours: 4.2 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 2.5 },
  { name: 'Thu', hours: 3.1 },
  { name: 'Fri', hours: 5.7 },
  { name: 'Sat', hours: 6.9 },
  { name: 'Sun', hours: 4.3 }
];

const activityBreakdown = [
  { name: 'Work', value: 35 },
  { name: 'Exercise', value: 10 },
  { name: 'Leisure', value: 20 },
  { name: 'Social', value: 15 },
  { name: 'Learning', value: 20 }
];

type JournalEntry = {
  id: string;
  date: string;
  text: string;
  mood: 'positive' | 'neutral' | 'negative';
};

export const PersonalizedDashboard = () => {
  const [insights, setInsights] = useState<string[]>([
    "Your sleep has improved by 12% this week",
    "Mood dips are correlated with increased screen time",
    "Adding more exercise could improve your evening mood",
    "Social interactions boost your well-being scores"
  ]);
  
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [showJournalDialog, setShowJournalDialog] = useState(false);
  const [journalEntryText, setJournalEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  
  // Load journal entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Save journal entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);
  
  const handleJournalSubmit = () => {
    if (!journalEntryText.trim()) {
      toast({
        title: "Error",
        description: "Journal entry cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: journalEntryText,
      mood: selectedMood
    };
    
    setJournalEntries(prev => [newEntry, ...prev]);
    setJournalEntryText('');
    setSelectedMood('neutral');
    setShowJournalDialog(false);
    
    toast({
      title: "Journal entry saved",
      description: "Your thoughts have been recorded.",
    });
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntryToDelete(id);
    setShowDeleteDialog(true);
  };
  
  const confirmDeleteEntry = () => {
    if (entryToDelete) {
      setJournalEntries(prev => prev.filter(entry => entry.id !== entryToDelete));
      setShowDeleteDialog(false);
      setEntryToDelete(null);
      
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been removed.",
      });
    }
  };
  
  const getMoodIcon = (mood: string) => {
    switch(mood) {
      case 'positive': return <Smile className="h-5 w-5 text-green-500" />;
      case 'neutral': return <Meh className="h-5 w-5 text-amber-500" />;
      case 'negative': return <Frown className="h-5 w-5 text-red-500" />;
      default: return <Meh className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Personalized Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Well-Being <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-slate-600">
            Track your progress, gain insights, and view personalized recommendations based on your data and activities.
          </p>
        </div>
        
        <div className="glass-card rounded-xl border border-slate-200 p-4 md:p-6 mb-10">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 w-full flex flex-wrap justify-start overflow-auto">
              <TabsTrigger value="overview" className="flex items-center">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center">
                <LineChartIcon className="h-4 w-4 mr-2" /> Mood Tracking
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center">
                <BarChartIcon className="h-4 w-4 mr-2" /> Sleep Analysis
              </TabsTrigger>
              <TabsTrigger value="screen" className="flex items-center">
                <PieChartIcon className="h-4 w-4 mr-2" /> Screen Time
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> Journal
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center">
                <Award className="h-4 w-4 mr-2" /> Achievements
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">AI Insights</h3>
                    <AlertCircle className="h-4 w-4 text-slate-400" />
                  </div>
                  <ul className="space-y-3">
                    {insights.map((insight, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-slate-600 pl-4 border-l-2 border-well-blue"
                      >
                        {insight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Weekly Mood</h3>
                    <LineChartIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Activity Breakdown</h3>
                    <PieChartIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activityBreakdown}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {activityBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Sleep Tracking</h3>
                    <BarChartIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sleepData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Screen Time</h3>
                    <BarChartIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={screenTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="journal" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Journal Entries</h3>
                <Button onClick={() => setShowJournalDialog(true)}>New Entry</Button>
              </div>
              
              {journalEntries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                  <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-lg font-medium mb-2">No journal entries yet</h4>
                  <p className="text-slate-500 mb-4">Start documenting your thoughts and feelings</p>
                  <Button onClick={() => setShowJournalDialog(true)} variant="outline">
                    Write First Entry
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 mb-2">
                          {getMoodIcon(entry.mood)}
                          <span className="text-sm font-medium">{entry.date}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-red-500"
                          onClick={() => handleDeleteEntry(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-slate-600 whitespace-pre-wrap">{entry.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mood" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Mood Trends</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Mood Insights</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-green-500">
                      Your mood is consistently higher on weekends
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-amber-500">
                      Midweek dips might be related to work stress
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-purple-500">
                      Your mood improved after starting morning meditation
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sleep" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Sleep Quality Analysis</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Sleep Insights</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-blue-500">
                      You average 7.5 hours of sleep per night
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-blue-300">
                      Sleep quality improves when you exercise during the day
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-blue-700">
                      Late-night screen time correlates with poorer sleep quality
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="screen" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Screen Time Analysis</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={screenTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Digital Wellness Insights</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-teal-500">
                      Your screen time increases significantly on weekends
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-teal-300">
                      Social media accounts for 45% of your screen time
                    </li>
                    <li className="text-sm text-slate-600 pl-4 border-l-2 border-teal-700">
                      You've reduced overall screen time by 12% this month
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-purple-500" />
                    </div>
                    <h4 className="font-medium">Mindfulness Master</h4>
                    <p className="text-sm text-slate-500">Completed 10 meditation sessions</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-blue-500" />
                    </div>
                    <h4 className="font-medium">Sleep Improver</h4>
                    <p className="text-sm text-slate-500">Maintained healthy sleep schedule for 7 days</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-green-500" />
                    </div>
                    <h4 className="font-medium">Digital Detoxer</h4>
                    <p className="text-sm text-slate-500">Reduced screen time by 20%</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-amber-500" />
                    </div>
                    <h4 className="font-medium">Mood Tracker</h4>
                    <p className="text-sm text-slate-500">Logged mood for 14 consecutive days</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-pink-500" />
                    </div>
                    <h4 className="font-medium">Journal Keeper</h4>
                    <p className="text-sm text-slate-500">Created 5 journal entries</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg text-center">
                    <div className="w-12 h-12 bg-well-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium">Wellness Explorer</h4>
                    <p className="text-sm text-slate-500">Used all features of the platform</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Journal Entry Dialog */}
      <Dialog open={showJournalDialog} onOpenChange={setShowJournalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Journal Entry</DialogTitle>
            <DialogDescription>
              Record your thoughts, feelings, and reflections for today.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="How are you feeling today?"
              value={journalEntryText}
              onChange={(e) => setJournalEntryText(e.target.value)}
              className="min-h-32"
            />
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Mood:</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedMood === 'positive' ? 'default' : 'outline'}
                  size="sm"
                  className={`gap-1.5 ${selectedMood === 'positive' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => setSelectedMood('positive')}
                >
                  <Smile className="h-4 w-4" />
                  Positive
                </Button>
                <Button
                  type="button" 
                  variant={selectedMood === 'neutral' ? 'default' : 'outline'}
                  size="sm"
                  className={`gap-1.5 ${selectedMood === 'neutral' ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                  onClick={() => setSelectedMood('neutral')}
                >
                  <Meh className="h-4 w-4" />
                  Neutral
                </Button>
                <Button
                  type="button"
                  variant={selectedMood === 'negative' ? 'default' : 'outline'}
                  size="sm"
                  className={`gap-1.5 ${selectedMood === 'negative' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                  onClick={() => setSelectedMood('negative')}
                >
                  <Frown className="h-4 w-4" />
                  Negative
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="button" onClick={handleJournalSubmit}>Save Entry</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Journal Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this journal entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEntry} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
