
import { 
  Heart, 
  BrainCircuit, 
  Briefcase, 
  Smartphone, 
  Users, 
  LifeBuoy, 
  Trophy,
  LineChart,
  Calendar,
  MessageSquare 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Heart className="h-8 w-8 text-white" />,
    title: "AI Mental Health Support",
    description: "Personalized chatbot support, mood tracking and guided meditations with anonymous crisis helpline integration.",
    color: "from-well-blue to-well-purple"
  },
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: "Career Growth",
    description: "AI career coach, job recommendations, skill assessment and personalized learning roadmaps.",
    color: "from-well-purple to-well-pink"
  },
  {
    icon: <Smartphone className="h-8 w-8 text-white" />,
    title: "Digital Detox",
    description: "App usage analytics, detox challenges, screen time management and digital wellbeing tips.",
    color: "from-well-teal to-well-blue"
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Community Support",
    description: "Anonymous forums, peer mentorship matching, expert webinars and AI-moderated discussions.",
    color: "from-well-blue to-well-teal"
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-white" />,
    title: "Emergency Support",
    description: "AI sentiment detection, crisis prevention, SOS button and therapist booking integration.",
    color: "from-well-pink to-well-purple"
  },
  {
    icon: <Trophy className="h-8 w-8 text-white" />,
    title: "Gamified Wellbeing",
    description: "Personalized challenges, rewards system, achievement badges and progress tracking.",
    color: "from-well-purple to-well-blue"
  },
  {
    icon: <LineChart className="h-8 w-8 text-white" />,
    title: "Personalized Dashboard",
    description: "AI-adaptive insights, mood-based recommendations and visual progress tracking.",
    color: "from-well-teal to-well-purple"
  },
  {
    icon: <Calendar className="h-8 w-8 text-white" />,
    title: "Self-Improvement",
    description: "Daily and weekly challenges with points, badges and leaderboard integration.",
    color: "from-well-blue to-well-pink"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Virtual Well-Being Buddy",
    description: "Personalized AI coach with voice assistance and empathetic conversations.",
    color: "from-well-purple to-well-teal"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            Our Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Solutions for{" "}
            <span className="text-gradient">Complete Well-Being</span>
          </h2>
          <p className="text-slate-600">
            Our platform combines cutting-edge AI technology with evidence-based well-being approaches
            to support your mental health, career growth, and digital balance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
