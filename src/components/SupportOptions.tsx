
import { Button } from "@/components/ui/button";
import { 
  LifeBuoy,
  PhoneCall,
  MessageSquare,
  Calendar,
  User,
  UserPlus,
  MapPin,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export const SupportOptions = () => {
  return (
    <section id="emergency" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600 mb-4">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 inline mr-1" />
            Crisis Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Emergency Support</span> When You Need It
          </h2>
          <p className="text-slate-600">
            Access immediate help and resources for crisis situations. Our AI can detect signs of distress
            and provide appropriate support options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-amber-500 border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Crisis Helpline</h3>
                <p className="text-sm text-slate-500">Immediate phone support</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Connect with trained crisis counselors available 24/7 to provide immediate emotional support during difficult moments.
            </p>
            <Button variant="outline" className="w-full gap-2">
              <PhoneCall className="h-4 w-4" /> Call Helpline
            </Button>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-well-blue border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-well-blue/10 text-well-blue flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Professional Support</h3>
                <p className="text-sm text-slate-500">Book a therapist session</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Schedule a session with licensed therapists and counselors who can provide professional guidance and support.
            </p>
            <Button variant="outline" className="w-full gap-2">
              <Calendar className="h-4 w-4" /> Book Appointment
            </Button>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-well-purple border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-well-purple/10 text-well-purple flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Instant AI Support</h3>
                <p className="text-sm text-slate-500">24/7 availability</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Access immediate AI-powered support that can provide coping strategies, grounding exercises, and crisis resources.
            </p>
            <Button variant="outline" className="w-full gap-2">
              <MessageSquare className="h-4 w-4" /> Chat with AI
            </Button>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-well-teal border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-well-teal/10 text-well-teal flex items-center justify-center">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Peer Support</h3>
                <p className="text-sm text-slate-500">Connect with others</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Join moderated support groups with peers who understand what you're going through and can provide understanding and encouragement.
            </p>
            <Button variant="outline" className="w-full gap-2">
              <UserPlus className="h-4 w-4" /> Find Support Group
            </Button>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-green-500 border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-500 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Local Resources</h3>
                <p className="text-sm text-slate-500">Find help nearby</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Discover mental health resources, support centers, and wellness activities in your local area.
            </p>
            <Button variant="outline" className="w-full gap-2">
              <MapPin className="h-4 w-4" /> Find Local Resources
            </Button>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl border-l-4 border-l-red-500 border-t border-r border-b border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">SOS Button</h3>
                <p className="text-sm text-slate-500">One-click emergency</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Press the SOS button during a crisis to automatically alert emergency services or your designated emergency contacts.
            </p>
            <Button className="w-full gap-2 bg-red-500 hover:bg-red-600">
              <LifeBuoy className="h-4 w-4" /> SOS Emergency
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
