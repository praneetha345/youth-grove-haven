
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Search, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Star,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

// Mock job data
const jobs = [
  {
    id: 1,
    title: "UX/UI Designer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    salary: "$70,000 - $90,000",
    type: "Full-time",
    postedDate: "2 days ago",
    skills: ["UI Design", "User Research", "Figma", "Prototyping"],
    featured: true,
    aiMatch: 92
  },
  {
    id: 2,
    title: "Front-end Developer",
    company: "Digital Solutions Co.",
    location: "New York, NY",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    postedDate: "1 week ago",
    skills: ["React", "JavaScript", "CSS", "HTML5", "TypeScript"],
    featured: false,
    aiMatch: 87
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataWise Analytics",
    location: "San Francisco, CA",
    salary: "$25/hour",
    type: "Internship",
    postedDate: "3 days ago",
    skills: ["SQL", "Excel", "Data Visualization", "Statistics"],
    featured: false,
    aiMatch: 95
  },
  {
    id: 4,
    title: "Content Creator",
    company: "Social Media Giants",
    location: "Remote",
    salary: "$50,000 - $65,000",
    type: "Contract",
    postedDate: "Just now",
    skills: ["Content Strategy", "Video Editing", "Social Media", "Storytelling"],
    featured: true,
    aiMatch: 89
  }
];

// Mock skill courses
const courses = [
  {
    id: 1,
    title: "Introduction to User Experience Design",
    provider: "Design Academy",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 12500,
    aiRecommended: true
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    provider: "Code Mastery",
    duration: "8 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 8750,
    aiRecommended: true
  },
  {
    id: 3,
    title: "Data Analysis with Python",
    provider: "Data Science Pro",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 15300,
    aiRecommended: false
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    provider: "Marketing Accelerator",
    duration: "4 weeks",
    level: "Beginner",
    rating: 4.6,
    students: 22100,
    aiRecommended: false
  }
];

export const CareerGrowth = () => {
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  
  const toggleSkill = (skill: string) => {
    if (activeSkills.includes(skill)) {
      setActiveSkills(activeSkills.filter(s => s !== skill));
    } else {
      setActiveSkills([...activeSkills, skill]);
    }
  };
  
  return (
    <section className="py-20 bg-white" id="career">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="text-gradient">Career Growth</span>
          </h2>
          <p className="text-slate-600">
            Discover personalized career opportunities, skill development paths, and grow professionally with AI guidance.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="jobs" className="text-sm sm:text-base">
                <Briefcase className="h-4 w-4 mr-2" /> Job Opportunities
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-sm sm:text-base">
                <BookOpen className="h-4 w-4 mr-2" /> Skill Development
              </TabsTrigger>
              <TabsTrigger value="resume" className="text-sm sm:text-base">
                <FileText className="h-4 w-4 mr-2" /> Resume Builder
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="text-xl font-semibold">AI-Matched Job Listings</h3>
                  
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search jobs..." 
                      className="pl-10 w-full md:w-64"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Remote</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Full-time</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Internship</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Entry Level</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Tech</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Design</Badge>
                  <Badge variant="outline" className="cursor-pointer bg-slate-50 hover:bg-slate-100">Marketing</Badge>
                </div>
                
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div 
                      key={job.id} 
                      className={`p-4 rounded-lg border ${job.featured ? 'border-well-blue/30 bg-well-blue/5' : 'border-slate-200'} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{job.title}</h4>
                            {job.featured && (
                              <Badge className="bg-well-blue text-white">Featured</Badge>
                            )}
                          </div>
                          <p className="text-slate-600 mt-1">{job.company} • {job.location}</p>
                          <p className="text-slate-500 text-sm mt-0.5">{job.salary} • {job.type}</p>
                          
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {job.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-100">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center mb-3">
                            <Sparkles className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm font-medium">{job.aiMatch}% Match</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">{job.postedDate}</p>
                          <Button size="sm" className="bg-well-blue text-white hover:bg-well-blue/90">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold mb-6">AI-Recommended Skill Paths</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Your Current Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "UX Research", "UI Design", "HTML", "CSS", "React Basics"].map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={`cursor-pointer ${activeSkills.includes(skill) ? 'bg-well-blue text-white' : 'bg-slate-50'}`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Recommended Skills to Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React Advanced", "TypeScript", "Figma", "User Testing", "Redux", "Next.js"].map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer bg-slate-50 hover:bg-slate-100"
                      >
                        {skill} <TrendingUp className="h-3 w-3 ml-1 text-well-blue" />
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <h4 className="font-medium mb-3">Top Courses for You</h4>
                  
                  {courses.map(course => (
                    <div 
                      key={course.id} 
                      className={`p-4 rounded-lg border ${course.aiRecommended ? 'border-well-purple/30 bg-well-purple/5' : 'border-slate-200'} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{course.title}</h4>
                            {course.aiRecommended && (
                              <Badge className="bg-well-purple text-white">AI Recommended</Badge>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm mt-1">{course.provider} • {course.duration} • {course.level}</p>
                          
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm">{course.rating}</span>
                            <span className="text-xs text-slate-500">({course.students.toLocaleString()} students)</span>
                          </div>
                        </div>
                        
                        <Button size="sm" className="bg-well-purple text-white hover:bg-well-purple/90">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resume" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">AI Resume Builder</h3>
                  <Button className="bg-well-blue text-white hover:bg-well-blue/90">
                    Generate Resume
                  </Button>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-500">PERSONAL INFORMATION</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                      <Input placeholder="Email Address" />
                      <Input placeholder="Phone Number" />
                      <Input placeholder="LinkedIn URL" className="sm:col-span-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-slate-500">EDUCATION</h4>
                      <Button variant="ghost" size="sm" className="h-8 text-well-blue">+ Add</Button>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="University/Institution" className="sm:col-span-2" />
                        <Input placeholder="Degree" />
                        <Input placeholder="Field of Study" />
                        <Input placeholder="Start Date" />
                        <Input placeholder="End Date" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-slate-500">WORK EXPERIENCE</h4>
                      <Button variant="ghost" size="sm" className="h-8 text-well-blue">+ Add</Button>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="Company Name" />
                        <Input placeholder="Position" />
                        <Input placeholder="Start Date" />
                        <Input placeholder="End Date" />
                        <Input placeholder="Location" className="sm:col-span-2" />
                        <div className="sm:col-span-2">
                          <Input placeholder="Description of responsibilities and achievements" className="h-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-500">SKILLS</h4>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-slate-100">JavaScript <CheckCircle2 className="h-3 w-3 ml-1" /></Badge>
                        <Badge className="bg-slate-100">React <CheckCircle2 className="h-3 w-3 ml-1" /></Badge>
                        <Badge className="bg-slate-100">HTML/CSS <CheckCircle2 className="h-3 w-3 ml-1" /></Badge>
                        <Badge className="bg-slate-100">UI Design <CheckCircle2 className="h-3 w-3 ml-1" /></Badge>
                        <Badge className="bg-slate-100">UX Research <CheckCircle2 className="h-3 w-3 ml-1" /></Badge>
                      </div>
                      <Input placeholder="Add more skills..." />
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
