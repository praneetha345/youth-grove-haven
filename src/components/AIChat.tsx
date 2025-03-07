
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Mic, BrainCircuit, Smile, Frown, Meh } from 'lucide-react';

// Types for our chat
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Mock AI responses
const mockResponses = [
  "I understand how you're feeling. What specific thoughts are troubling you today?",
  "It sounds like you're going through a challenging time. Would you like to try a quick breathing exercise?",
  "Your mental well-being is important. Have you been practicing the mindfulness techniques we discussed?",
  "I'm here to support you. Let's work through these feelings together.",
  "That's completely normal to feel that way. Many people experience similar emotions.",
  "Let's focus on one concern at a time. What's the most pressing issue for you right now?",
  "You're showing great awareness by recognizing these feelings. That's an important first step.",
  "Have you tried the journaling exercise we talked about last time? It might help to put your thoughts on paper."
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI well-being assistant. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<string | null>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleMoodSelection = (selectedMood: string) => {
    setMood(selectedMood);
    
    // Add user message about mood
    const moodMessage: Message = {
      id: Date.now().toString(),
      content: `I'm feeling ${selectedMood.toLowerCase()} today.`,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, moodMessage]);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Response based on mood
    setTimeout(() => {
      let response = '';
      
      switch (selectedMood) {
        case 'Happy':
          response = "That's wonderful to hear! Let's build on that positive energy today. Would you like to explore some activities that could enhance your mood further?";
          break;
        case 'Neutral':
          response = "Thanks for sharing. A neutral state can be a good foundation. Is there anything specific you'd like to focus on improving today?";
          break;
        case 'Sad':
          response = "I'm sorry to hear you're feeling down. Remember that it's okay to have these feelings. Would you like to talk about what might be causing this, or would you prefer some suggestions for lifting your mood?";
          break;
        default:
          response = "Thank you for sharing how you're feeling. How can I support you today?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50" id="mental-health">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personal <span className="text-gradient">AI Companion</span>
          </h2>
          <p className="text-slate-600">
            Our AI-powered chat provides personalized mental health support, guidance, and resources whenever you need them.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chat" className="text-sm sm:text-base">
                <MessageSquare className="h-4 w-4 mr-2" /> AI Chat
              </TabsTrigger>
              <TabsTrigger value="mood" className="text-sm sm:text-base">
                <BrainCircuit className="h-4 w-4 mr-2" /> Mood Tracking
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-sm sm:text-base">
                <MessageSquare className="h-4 w-4 mr-2" /> Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200">
                {/* Chat Header */}
                <div className="bg-white border-b border-slate-100 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-well-gradient flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Well-Being Assistant</h3>
                      <p className="text-xs text-slate-500">Online • Responds instantly</p>
                    </div>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 bg-slate-50/50">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.sender === 'user' 
                            ? 'bg-well-blue text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        <p className={message.sender === 'user' ? 'text-white' : 'text-slate-700'}>
                          {message.content}
                        </p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Mic className="h-5 w-5 text-slate-500" />
                    </Button>
                    <Button onClick={handleSendMessage} className="bg-well-blue text-white hover:bg-well-blue/90">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mood" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
                <p className="text-slate-600 mb-6">Tracking your mood helps our AI provide better personalized support.</p>
                
                {!mood ? (
                  <div className="grid grid-cols-3 gap-4">
                    <Button 
                      onClick={() => handleMoodSelection('Happy')}
                      variant="outline" 
                      className="flex flex-col items-center p-6 h-auto border-2 border-slate-200 hover:border-green-500 transition-colors"
                    >
                      <Smile className="h-10 w-10 text-green-500 mb-2" />
                      <span>Happy</span>
                    </Button>
                    <Button 
                      onClick={() => handleMoodSelection('Neutral')}
                      variant="outline" 
                      className="flex flex-col items-center p-6 h-auto border-2 border-slate-200 hover:border-blue-500 transition-colors"
                    >
                      <Meh className="h-10 w-10 text-blue-500 mb-2" />
                      <span>Neutral</span>
                    </Button>
                    <Button 
                      onClick={() => handleMoodSelection('Sad')}
                      variant="outline" 
                      className="flex flex-col items-center p-6 h-auto border-2 border-slate-200 hover:border-purple-500 transition-colors"
                    >
                      <Frown className="h-10 w-10 text-purple-500 mb-2" />
                      <span>Sad</span>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg mb-4">
                      You're feeling <span className="font-semibold">{mood}</span> today
                    </p>
                    <Button 
                      onClick={() => setMood(null)} 
                      variant="outline"
                    >
                      Update Mood
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-4">Mental Health Resources</h3>
                <p className="text-slate-600 mb-6">Access helpful resources for your mental well-being journey.</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Guided Meditation Sessions</h4>
                    <p className="text-sm text-slate-500">10+ sessions for stress, anxiety, and sleep</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Crisis Helpline Directory</h4>
                    <p className="text-sm text-slate-500">24/7 support contacts for immediate help</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Well-being Articles</h4>
                    <p className="text-sm text-slate-500">Expert-written content on mental health topics</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Self-assessment Tools</h4>
                    <p className="text-sm text-slate-500">Understand your mental health status</p>
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
