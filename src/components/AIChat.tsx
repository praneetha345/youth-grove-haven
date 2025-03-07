
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Mic, BrainCircuit, Smile, Frown, Meh, RefreshCw, SunMoon, Cloud, Snowflake, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";

// Types for our chat
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type MoodType = 'Happy' | 'Stressed' | 'Anxious' | 'Motivated' | 'Confused' | 'Tired' | 'Energetic' | 'Peaceful' | 'Creative' | null;

// Personalized responses based on mood
const moodResponses = {
  Happy: "That's wonderful to hear! It's great that you're feeling positive today. Let's build on that good energy. Would you like to explore some activities that could enhance your mood further? Maybe a short gratitude exercise or sharing your positivity with someone else today?",
  
  Stressed: "I'm here for you. Stress can be really overwhelming, and it's completely normal to feel this way. Would you like to talk about what's causing your stress? You can vent or just tell me a little about what's on your mind. Sometimes just putting it into words can help lighten the mental load. Or we could try a quick breathing exercise if you prefer?",
  
  Anxious: "I understand how anxiety can feel. That tightness in your chest, racing thoughts - it's a lot to handle. Would you like to try a quick grounding exercise? Look around and name three things you see, two things you can touch, and one thing you hear. This can help bring you back to the present moment. Remember, you're not alone in this feeling, and it will pass.",
  
  Motivated: "That's amazing! I love hearing that you're feeling motivated today. Motivation is such a powerful energy - let's make the most of it! Would you like some tips to stay productive and focused? Or maybe you already have something specific you're excited to work on? Tell me more about what's driving your motivation today.",
  
  Confused: "It's okay to feel this way. We all go through periods of confusion or uncertainty - it's actually part of growing and figuring things out. What's making you feel unsure today? Maybe talking through it could help bring some clarity, or we could explore some techniques for decision-making if you're facing a specific choice.",
  
  Tired: "I can understand feeling tired. Our bodies and minds need rest, and sometimes life can be really demanding. Would you like to talk about your sleep habits or explore some energy-boosting techniques? Even small changes like a 5-minute stretch break or a glass of water can help. What might work best for you right now?",
  
  Energetic: "It's great that you're feeling energetic! That's a wonderful state to be in. What would you like to channel this energy into today? Perhaps there's a project you've been wanting to tackle, or maybe you'd enjoy some physical activity to make the most of this feeling?",
  
  Peaceful: "That sense of peace is so valuable. I'm glad you're experiencing it today. Would you like to explore ways to savor this feeling or perhaps share what's contributing to your sense of calm? Sometimes understanding what brings us peace can help us return to this state when we need it most.",
  
  Creative: "Feeling creative is such a special state of mind! Your imagination is active and ready to explore. Is there a creative project you've been wanting to work on? Or perhaps you'd like some prompts to help channel this creative energy? I'd love to hear more about how your creativity expresses itself."
};

// Conversation starters and questions for different topics
const conversationStarters = [
  {
    id: 'smile',
    question: "What's one thing that made you smile today?",
    followUp: "Even small moments of joy are worth celebrating! Would you like to talk more about this positive experience or explore ways to create more moments like this?"
  },
  {
    id: 'grounding',
    question: "Let's try a quick grounding exercise. Look around and name three things you see, two things you can touch, and one thing you hear.",
    followUp: "That's great! How are you feeling now? Grounding exercises like this can really help when your mind feels scattered or anxious. They bring you back to the present moment."
  },
  {
    id: 'breathing',
    question: "Would you like to try a guided breathing exercise? It only takes a minute and can help you feel more relaxed.",
    followUp: "Perfect. Let's do this together. Breathe in slowly through your nose for 4 counts... hold for 2... and out through your mouth for 6. Let's repeat that 3 more times. How are you feeling now? Even just a few deep breaths can shift your nervous system."
  },
  {
    id: 'learning',
    question: "What's something you've always been curious about learning?",
    followUp: "That sounds fascinating! Learning new things not only expands our skills but can also boost happiness and confidence. Have you taken any steps toward exploring this interest yet? I'd be happy to suggest some resources or first steps if you'd like."
  },
  {
    id: 'achievement',
    question: "What's something you've achieved recently, no matter how small?",
    followUp: "That's definitely worth celebrating! We often focus so much on our big goals that we forget to acknowledge the small wins along the way. How did accomplishing this make you feel? Those feelings of satisfaction and pride are important to recognize."
  },
  {
    id: 'social-media',
    question: "How do you feel after scrolling through social media?",
    followUp: "Many people notice that too. Our relationship with social media can significantly impact our mental well-being. Have you ever tried setting boundaries with your social media use? Even small changes like no-phone zones or time limits can make a big difference in how we feel."
  },
  {
    id: 'motivation',
    question: "Here's a quote for you: 'No matter how slow you go, you're still lapping everyone on the couch.' How does this make you feel?",
    followUp: "I appreciate you sharing that reaction. Quotes can be powerful reminders when we need a shift in perspective. Is there a particular area in your life where you feel this resonates most? Perhaps your studies, fitness journey, or a personal project?"
  },
  {
    id: 'challenge',
    question: "Do you want a small challenge today? Something simple like drinking more water, stretching for five minutes, or writing down one thing you're grateful for?",
    followUp: "Excellent choice! Small, consistent actions often lead to the biggest changes over time. Would you like me to check in with you later about how it went? Sometimes a bit of accountability can help us follow through on our intentions."
  },
  {
    id: 'safe-space',
    question: "Is there something on your mind that you need a safe space to talk about? You don't have to go through it alone.",
    followUp: "Thank you for trusting me with this. It takes courage to open up, and I'm here to listen without judgment. Would it help to explore this further or would you prefer some suggestions for managing this situation? Remember, many others have faced similar challenges - you're not alone in this experience."
  },
  {
    id: 'future',
    question: "If you could look five years into the future and see that everything worked out well, what would your life look like?",
    followUp: "That's a beautiful vision! Visualizing a positive future can actually help guide us toward it. Are there small steps you could take today that would move you in the direction of that future? Even tiny actions can create momentum over time."
  },
  {
    id: 'strength',
    question: "What's a personal strength you have that you're proud of?",
    followUp: "That's an wonderful strength to recognize in yourself! Our strengths are powerful resources we can lean on during challenging times. Can you think of a recent situation where this strength helped you or someone else? Reflecting on how we use our strengths can help us appreciate them even more."
  },
  {
    id: 'helpful',
    question: "What's the most helpful piece of advice someone has given you?",
    followUp: "That's powerful advice. Isn't it amazing how the right words at the right time can make such a difference? Has this advice changed how you approach certain situations in your life? Sometimes wisdom from others becomes integrated into our own perspective in meaningful ways."
  }
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there, I'm your AI well-being assistant at MindMend. I'm here to provide support, guidance, or just have a friendly chat. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState<MoodType>(null);
  const [showMoodPrompt, setShowMoodPrompt] = useState(true);
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
    
    // Choose a response
    setTimeout(() => {
      let botResponse: string;
      
      // More sophisticated response selection
      if (inputValue.toLowerCase().includes('anxious') || inputValue.toLowerCase().includes('anxiety')) {
        botResponse = "It sounds like you're experiencing some anxiety. That's something many people deal with, and it can be really challenging. Let's talk about it - what specifically is making you feel anxious right now? Sometimes just naming what's bothering us can help reduce its power. Would you also be interested in trying a quick breathing exercise? I'm here to support you however would be most helpful.";
      } else if (inputValue.toLowerCase().includes('sad') || inputValue.toLowerCase().includes('depress')) {
        botResponse = "I'm sorry to hear you're feeling down. These feelings are valid, and I appreciate you sharing them with me. Would you like to talk more about what's contributing to these feelings? Sometimes expressing our thoughts can help us process them better. Remember that it's okay to not be okay sometimes, and reaching out - like you're doing now - is a positive step. Would it help to explore some mood-lifting activities or resources for additional support?";
      } else if (inputValue.toLowerCase().includes('career') || inputValue.toLowerCase().includes('job') || inputValue.toLowerCase().includes('work')) {
        botResponse = "Career questions and challenges are something many young people navigate. Whether you're just starting out, considering a change, or feeling stuck, these thoughts are completely normal. Would you like to explore some options together? We could talk about your interests, skills you'd like to develop, or maybe break down a specific career challenge you're facing. Career paths rarely look like straight lines - they're more like winding journeys of growth and discovery.";
      } else if (inputValue.toLowerCase().includes('social media') || inputValue.toLowerCase().includes('phone') || inputValue.toLowerCase().includes('screen')) {
        botResponse = "Our relationship with technology can definitely impact our wellbeing. Many people find themselves feeling drained after too much screen time or social media scrolling. Have you noticed specific patterns in how digital use affects your mood or energy? We could explore some ways to create healthier boundaries with your devices - maybe a screen-free hour before bed, or designated tech breaks throughout the day. What do you think might work best for your lifestyle?";
      } else if (inputValue.toLowerCase().includes('thank')) {
        botResponse = "You're very welcome! I'm truly glad I could be helpful. Remember, I'm here anytime you want to talk, explore ideas, or just have someone to listen. Your wellbeing matters, and taking time for these conversations is an important part of self-care. Is there anything else you'd like to discuss or explore today?";
      } else if (inputValue.toLowerCase().includes('bye') || inputValue.toLowerCase().includes('goodbye')) {
        botResponse = "It was really nice chatting with you! Remember, I'm here whenever you need support, want to talk through something, or just need a friendly conversation. Take care of yourself, and I hope the rest of your day goes well. Don't hesitate to come back anytime - I'll be here!";
      } else if (inputValue.toLowerCase().includes('hello') || inputValue.toLowerCase().includes('hi') || inputValue.toLowerCase().includes('hey')) {
        botResponse = "Hello there! It's great to connect with you today. I'm your AI well-being assistant at MindMend. I'm here to chat about whatever's on your mind - whether that's mental health support, career questions, digital wellbeing, or just having a friendly conversation. How are you feeling today, and how can I support you?";
      } else if (inputValue.toLowerCase().includes('who are you') || inputValue.toLowerCase().includes('what are you')) {
        botResponse = "I'm your AI well-being assistant at MindMend. I'm designed to provide personalized support for your mental health, career growth, and digital wellbeing. I can offer a listening ear, helpful resources, guided exercises, or just friendly conversation - whatever would be most helpful for you right now. While I'm powered by AI and not a human or a replacement for professional help, I'm here to support your journey toward greater wellbeing in whatever way I can.";
      } else if (inputValue.toLowerCase().includes('help') || inputValue.toLowerCase().includes('crisis')) {
        botResponse = "I hear that you're looking for help, and reaching out is a really important first step. If you're experiencing a crisis or emergency situation, please connect with crisis support services like a local emergency number (911 in the US), Crisis Text Line (text HOME to 741741), or the National Suicide Prevention Lifeline (988). If you'd like to talk through what's happening, I'm here to listen. Would it help to share more about what's going on? I can also point you toward resources for specific concerns.";
      } else {
        // Use conversation starters for more varied responses
        const starter = conversationStarters[currentConversationIndex];
        
        // If it seems like a response to our previous question, give a follow-up
        const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();
        if (lastBotMessage && conversationStarters.some(s => lastBotMessage.content.includes(s.question))) {
          const matchingStarter = conversationStarters.find(s => lastBotMessage.content.includes(s.question));
          if (matchingStarter) {
            botResponse = matchingStarter.followUp;
          } else {
            botResponse = starter.followUp;
          }
        } else {
          // Otherwise ask a new question
          botResponse = starter.question;
          setCurrentConversationIndex((currentConversationIndex + 1) % conversationStarters.length);
        }
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
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
  
  const handleMoodSelection = (selectedMood: MoodType) => {
    setMood(selectedMood);
    setShowMoodPrompt(false);
    
    // Add user message about mood
    const moodMessage: Message = {
      id: Date.now().toString(),
      content: `I'm feeling ${selectedMood?.toLowerCase()} today.`,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, moodMessage]);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Response based on mood
    setTimeout(() => {
      const response = selectedMood ? moodResponses[selectedMood] : "Thank you for sharing how you're feeling. How can I support you today?";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show toast notification
      toast({
        title: "Mood tracked",
        description: `We've recorded that you're feeling ${selectedMood?.toLowerCase()} today.`,
        duration: 3000,
      });
    }, 1500);
  };

  // Generate a new conversation starter
  const handleNewTopic = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * conversationStarters.length);
      const randomTopic = conversationStarters[randomIndex].question;
      setCurrentConversationIndex(randomIndex);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomTopic,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getMoodIcon = (moodType: MoodType) => {
    switch(moodType) {
      case 'Happy':
        return <Smile className="h-4 w-4 text-green-500" />;
      case 'Stressed':
        return <Frown className="h-4 w-4 text-amber-500" />;
      case 'Anxious':
        return <Frown className="h-4 w-4 text-blue-500" />;
      case 'Motivated':
        return <Smile className="h-4 w-4 text-purple-500" />;
      case 'Confused':
        return <Meh className="h-4 w-4 text-slate-500" />;
      case 'Tired':
        return <Coffee className="h-4 w-4 text-brown-500" />;
      case 'Energetic':
        return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'Peaceful':
        return <SunMoon className="h-4 w-4 text-blue-300" />;
      case 'Creative':
        return <Smile className="h-4 w-4 text-pink-500" />;
      default:
        return <Meh className="h-4 w-4 text-slate-500" />;
    }
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
                      <h3 className="font-medium">MindMend AI Assistant</h3>
                      <p className="text-xs text-slate-500">Online • Responds instantly</p>
                    </div>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 bg-slate-50/50">
                  {showMoodPrompt && (
                    <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                      <p className="mb-3 text-slate-700">How are you feeling today?</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Happy')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Smile className="h-4 w-4 text-green-500" /> Happy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Stressed')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Frown className="h-4 w-4 text-amber-500" /> Stressed
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Anxious')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Frown className="h-4 w-4 text-blue-500" /> Anxious
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Motivated')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Smile className="h-4 w-4 text-purple-500" /> Motivated
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Confused')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Meh className="h-4 w-4 text-slate-500" /> Confused
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Tired')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Coffee className="h-4 w-4 text-amber-700" /> Tired
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Energetic')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Smile className="h-4 w-4 text-yellow-500" /> Energetic
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Peaceful')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <SunMoon className="h-4 w-4 text-blue-300" /> Peaceful
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoodSelection('Creative')}
                          className="rounded-full flex items-center gap-1"
                        >
                          <Smile className="h-4 w-4 text-pink-500" /> Creative
                        </Button>
                      </div>
                    </div>
                  )}
                
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
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleNewTopic}
                      className="text-slate-500 flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" /> New Topic
                    </Button>
                    <div className="flex-1 flex space-x-2">
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
              </div>
            </TabsContent>
            
            <TabsContent value="mood" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
                <p className="text-slate-600 mb-6">Tracking your mood helps our AI provide better personalized support.</p>
                
                {!mood ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {['Happy', 'Stressed', 'Anxious', 'Motivated', 'Confused', 'Tired', 'Energetic', 'Peaceful', 'Creative'].map((moodOption) => (
                      <Button 
                        key={moodOption}
                        onClick={() => handleMoodSelection(moodOption as MoodType)}
                        variant="outline" 
                        className="flex flex-col items-center p-6 h-auto border-2 border-slate-200 hover:border-well-blue transition-colors"
                      >
                        {getMoodIcon(moodOption as MoodType)}
                        <span className="mt-2">{moodOption}</span>
                      </Button>
                    ))}
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
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">Your Mood History</h4>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex-1 h-8 bg-slate-100 rounded animate-pulse"></div>
                      <div className="w-20 h-8 bg-slate-100 rounded animate-pulse"></div>
                    </div>
                    <div className="h-48 bg-slate-100 rounded-lg animate-pulse"></div>
                    <p className="text-center text-xs text-slate-400 mt-3">Your mood patterns will appear here as you track over time</p>
                  </div>
                </div>
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
                    <Button className="mt-2" size="sm" variant="outline">Access Now</Button>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Crisis Helpline Directory</h4>
                    <p className="text-sm text-slate-500">24/7 support contacts for immediate help</p>
                    <Button className="mt-2" size="sm" variant="outline">View Directory</Button>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Well-being Articles</h4>
                    <p className="text-sm text-slate-500">Expert-written content on mental health topics</p>
                    <Button className="mt-2" size="sm" variant="outline">Read Articles</Button>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-well-blue transition-colors">
                    <h4 className="font-medium">Self-assessment Tools</h4>
                    <p className="text-sm text-slate-500">Understand your mental health status</p>
                    <Button className="mt-2" size="sm" variant="outline">Take Assessment</Button>
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
