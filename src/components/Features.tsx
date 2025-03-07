
import { 
  Brain, 
  Briefcase, 
  PieChart, 
  Users, 
  Shield, 
  Award, 
  LayoutDashboard, 
  Trophy, 
  Bot,
  Palette,
  UserPlus,
  Glasses,
  Bell,
  Map,
  Music,
  MapPin
} from 'lucide-react';

const features = [
  {
    title: "AI Mental Health Support",
    description: "Anonymous chatbot, mood tracking, guided meditation, and crisis helpline integration.",
    icon: Brain,
    color: "bg-well-blue",
    id: "mental-health"
  },
  {
    title: "Career Growth",
    description: "AI career coach, job listings, skill-based learning modules, and resume builder.",
    icon: Briefcase,
    color: "bg-well-purple",
    id: "career"
  },
  {
    title: "Digital Detox",
    description: "App usage analytics, detox challenges, and motivational content feed.",
    icon: PieChart,
    color: "bg-well-teal",
    id: "digital-detox"
  },
  {
    title: "Community Support",
    description: "Anonymous forums, mentorship programs, expert webinars, and AI-moderated discussions.",
    icon: Users,
    color: "bg-well-pink",
    id: "community"
  },
  {
    title: "Emergency Support",
    description: "AI sentiment detection, SOS button, emergency contacts, and therapist booking.",
    icon: Shield,
    color: "bg-rose-500",
    id: "emergency"
  },
  {
    title: "Gamification & Rewards",
    description: "Daily well-being challenges, leaderboards, personalized goals, and redeemable rewards.",
    icon: Award,
    color: "bg-amber-500",
    id: "gamification"
  },
  {
    title: "AI Personalized Dashboard",
    description: "Customizable dashboard adapting to user mood and providing daily AI recommendations.",
    icon: LayoutDashboard,
    color: "bg-indigo-500",
    id: "dashboard"
  },
  {
    title: "Self-Improvement Challenges",
    description: "Daily and weekly challenges with points, badges, and leaderboard integration.",
    icon: Trophy,
    color: "bg-emerald-500",
    id: "challenges"
  },
  {
    title: "AI Well-Being Buddy",
    description: "Interactive AI chatbot with voice-based assistance and personalized reminders.",
    icon: Bot,
    color: "bg-blue-500",
    id: "ai-buddy"
  },
  {
    title: "Digital Mood Canvas",
    description: "Express emotions through digital art with AI-generated mood-based music suggestions.",
    icon: Palette,
    color: "bg-fuchsia-500",
    id: "mood-canvas"
  },
  {
    title: "AI Peer Matchmaking",
    description: "AI matches users with similar challenges or interests for support and networking.",
    icon: UserPlus,
    color: "bg-cyan-500",
    id: "matchmaking"
  },
  {
    title: "AR Meditation",
    description: "AR-guided meditation, interactive breathing exercises, and immersive environments.",
    icon: Glasses,
    color: "bg-purple-500",
    id: "ar-meditation"
  },
  {
    title: "Smart Notification System",
    description: "AI detects stress patterns and sends personalized well-being suggestions.",
    icon: Bell,
    color: "bg-orange-500",
    id: "notifications"
  },
  {
    title: "AI Career Mind Map",
    description: "Interactive career roadmap with step-by-step guidance and job recommendations.",
    icon: Map,
    color: "bg-green-500",
    id: "career-map"
  },
  {
    title: "AI-Generated Podcasts",
    description: "Dynamically generates personalized stories and career guidance podcasts.",
    icon: Music,
    color: "bg-pink-500",
    id: "podcasts"
  },
  {
    title: "Well-Being Map",
    description: "AI-integrated map displaying nearby wellness spaces, mentors, and career events.",
    icon: MapPin,
    color: "bg-teal-500",
    id: "well-being-map"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive <span className="text-gradient">AI-Powered</span> Features
          </h2>
          <p className="text-slate-600">
            Our platform brings together powerful tools to support your mental health, career growth, and digital well-being journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              id={feature.id}
              className="glass-card p-6 animated-card border-t-4 hover:border-t-4"
              style={{ borderTopColor: `var(--${feature.color.slice(3)})`, animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-white mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
