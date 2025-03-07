
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
  CheckCircle2,
  X,
  Filter,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

// Mock job data
const jobsData = [
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
const coursesData = [
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
  const [jobs, setJobs] = useState(jobsData);
  const [courses, setCourses] = useState(coursesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [resumeData, setResumeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      }
    ],
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
      }
    ],
    skills: ["JavaScript", "React", "HTML/CSS", "UI Design", "UX Research"]
  });
  
  const toggleSkill = (skill: string) => {
    if (activeSkills.includes(skill)) {
      setActiveSkills(activeSkills.filter(s => s !== skill));
    } else {
      setActiveSkills([...activeSkills, skill]);
    }
  };
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
      
      // Show toast notification
      toast({
        title: "Filter Applied",
        description: `Showing results for "${filter}" jobs`,
      });
    }
  };
  
  const handleSearch = () => {
    if (searchQuery) {
      const filteredJobs = jobsData.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setJobs(filteredJobs);
      
      toast({
        title: "Search Results",
        description: `Found ${filteredJobs.length} jobs matching "${searchQuery}"`,
      });
    } else {
      setJobs(jobsData);
    }
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const enrollCourse = (courseId: number) => {
    toast({
      title: "Course Enrollment Successful",
      description: `You've enrolled in ${courses.find(c => c.id === courseId)?.title}`,
    });
  };
  
  const applyForJob = (jobId: number) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${jobs.find(j => j.id === jobId)?.title} has been sent!`,
    });
  };
  
  const addSkill = (skill: string) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill]
      });
      
      toast({
        title: "Skill Added",
        description: `${skill} has been added to your resume`,
      });
    }
  };
  
  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(s => s !== skill)
    });
  };
  
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: ''
        }
      ]
    });
  };
  
  const removeEducation = (index: number) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: newEducation
    });
  };
  
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          location: '',
          description: ''
        }
      ]
    });
  };
  
  const removeExperience = (index: number) => {
    const newExperience = [...resumeData.experience];
    newExperience.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: newExperience
    });
  };
  
  const updateResumeField = (
    section: 'personal' | 'education' | 'experience', 
    field: string, 
    value: string, 
    index?: number
  ) => {
    if (section === 'personal') {
      setResumeData({
        ...resumeData,
        [field]: value
      });
    } else if (section === 'education' && index !== undefined) {
      const newEducation = [...resumeData.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      setResumeData({
        ...resumeData,
        education: newEducation
      });
    } else if (section === 'experience' && index !== undefined) {
      const newExperience = [...resumeData.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      setResumeData({
        ...resumeData,
        experience: newExperience
      });
    }
  };
  
  const generateResume = () => {
    // Validate form
    if (!resumeData.firstName || !resumeData.lastName || !resumeData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Resume Generated",
      description: "Your AI-optimized resume has been created and is ready to download",
    });
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
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Search jobs..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                      />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Filter Jobs</h4>
                          <div className="flex flex-col gap-2">
                            <Badge 
                              variant={activeFilters.includes('Remote') ? "default" : "outline"}
                              className="cursor-pointer justify-start"
                              onClick={() => toggleFilter('Remote')}
                            >
                              Remote
                            </Badge>
                            <Badge 
                              variant={activeFilters.includes('Full-time') ? "default" : "outline"}
                              className="cursor-pointer justify-start"
                              onClick={() => toggleFilter('Full-time')}
                            >
                              Full-time
                            </Badge>
                            <Badge 
                              variant={activeFilters.includes('Internship') ? "default" : "outline"}
                              className="cursor-pointer justify-start"
                              onClick={() => toggleFilter('Internship')}
                            >
                              Internship
                            </Badge>
                            <Badge 
                              variant={activeFilters.includes('Contract') ? "default" : "outline"}
                              className="cursor-pointer justify-start"
                              onClick={() => toggleFilter('Contract')}
                            >
                              Contract
                            </Badge>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Remote", "Full-time", "Internship", "Entry Level", "Tech", "Design", "Marketing"].map((filter) => (
                    <Badge 
                      key={filter}
                      variant={activeFilters.includes(filter) ? "default" : "outline"}
                      className="cursor-pointer bg-slate-50 hover:bg-slate-100"
                      onClick={() => toggleFilter(filter)}
                    >
                      {filter}
                      {activeFilters.includes(filter) && (
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => {
                          e.stopPropagation();
                          toggleFilter(filter);
                        }} />
                      )}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {jobs.length > 0 ? (
                    jobs.map(job => (
                      <motion.div 
                        key={job.id} 
                        className={`p-4 rounded-lg border ${job.featured ? 'border-well-blue/30 bg-well-blue/5' : 'border-slate-200'} hover:shadow-md transition-shadow`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
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
                            <Button 
                              size="sm" 
                              className="bg-well-blue text-white hover:bg-well-blue/90"
                              onClick={() => applyForJob(job.id)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-500">No jobs match your search criteria</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setJobs(jobsData);
                          setSearchQuery('');
                          setActiveFilters([]);
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
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
                        onClick={() => {
                          addSkill(skill);
                          toast({
                            title: "Skill Added to Resume",
                            description: `${skill} has been added to your skills list`,
                          });
                        }}
                      >
                        {skill} <TrendingUp className="h-3 w-3 ml-1 text-well-blue" />
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <h4 className="font-medium mb-3">Top Courses for You</h4>
                  
                  {courses.map(course => (
                    <motion.div 
                      key={course.id} 
                      className={`p-4 rounded-lg border ${course.aiRecommended ? 'border-well-purple/30 bg-well-purple/5' : 'border-slate-200'} hover:shadow-md transition-shadow`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: course.id * 0.1 }}
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
                        
                        <Button 
                          size="sm" 
                          className="bg-well-purple text-white hover:bg-well-purple/90"
                          onClick={() => enrollCourse(course.id)}
                        >
                          Enroll
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resume" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="glass-card overflow-hidden rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">AI Resume Builder</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => {
                        toast({
                          title: "Resume Saved",
                          description: "Your resume has been saved to your account",
                        });
                      }}
                    >
                      <Download className="h-4 w-4" /> Save
                    </Button>
                    <Button 
                      className="bg-well-blue text-white hover:bg-well-blue/90 gap-1"
                      onClick={generateResume}
                    >
                      <Upload className="h-4 w-4" /> Generate Resume
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-500">PERSONAL INFORMATION</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input 
                        placeholder="First Name" 
                        value={resumeData.firstName}
                        onChange={(e) => updateResumeField('personal', 'firstName', e.target.value)}
                      />
                      <Input 
                        placeholder="Last Name" 
                        value={resumeData.lastName}
                        onChange={(e) => updateResumeField('personal', 'lastName', e.target.value)}
                      />
                      <Input 
                        placeholder="Email Address" 
                        value={resumeData.email}
                        onChange={(e) => updateResumeField('personal', 'email', e.target.value)}
                      />
                      <Input 
                        placeholder="Phone Number" 
                        value={resumeData.phone}
                        onChange={(e) => updateResumeField('personal', 'phone', e.target.value)}
                      />
                      <Input 
                        placeholder="LinkedIn URL" 
                        className="sm:col-span-2"
                        value={resumeData.linkedin}
                        onChange={(e) => updateResumeField('personal', 'linkedin', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-slate-500">EDUCATION</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-well-blue"
                        onClick={addEducation}
                      >+ Add</Button>
                    </div>
                    
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg relative">
                        {resumeData.education.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 absolute top-2 right-2 text-slate-400 hover:text-red-500"
                            onClick={() => removeEducation(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input 
                            placeholder="University/Institution" 
                            className="sm:col-span-2" 
                            value={edu.institution}
                            onChange={(e) => updateResumeField('education', 'institution', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Degree" 
                            value={edu.degree}
                            onChange={(e) => updateResumeField('education', 'degree', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Field of Study" 
                            value={edu.field}
                            onChange={(e) => updateResumeField('education', 'field', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Start Date" 
                            value={edu.startDate}
                            onChange={(e) => updateResumeField('education', 'startDate', e.target.value, index)}
                          />
                          <Input 
                            placeholder="End Date" 
                            value={edu.endDate}
                            onChange={(e) => updateResumeField('education', 'endDate', e.target.value, index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-slate-500">WORK EXPERIENCE</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-well-blue"
                        onClick={addExperience}
                      >+ Add</Button>
                    </div>
                    
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg relative">
                        {resumeData.experience.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 absolute top-2 right-2 text-slate-400 hover:text-red-500"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input 
                            placeholder="Company Name" 
                            value={exp.company}
                            onChange={(e) => updateResumeField('experience', 'company', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Position" 
                            value={exp.position}
                            onChange={(e) => updateResumeField('experience', 'position', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Start Date" 
                            value={exp.startDate}
                            onChange={(e) => updateResumeField('experience', 'startDate', e.target.value, index)}
                          />
                          <Input 
                            placeholder="End Date" 
                            value={exp.endDate}
                            onChange={(e) => updateResumeField('experience', 'endDate', e.target.value, index)}
                          />
                          <Input 
                            placeholder="Location" 
                            className="sm:col-span-2"
                            value={exp.location}
                            onChange={(e) => updateResumeField('experience', 'location', e.target.value, index)}
                          />
                          <div className="sm:col-span-2">
                            <Input 
                              placeholder="Description of responsibilities and achievements" 
                              className="h-24"
                              value={exp.description}
                              onChange={(e) => updateResumeField('experience', 'description', e.target.value, index)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-500">SKILLS</h4>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resumeData.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            className="bg-slate-100 pr-1.5"
                          >
                            {skill}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4 ml-1 hover:bg-transparent hover:text-red-500"
                              onClick={() => removeSkill(skill)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add more skills..." 
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputValue) {
                              addSkill(inputValue);
                              setInputValue('');
                            }
                          }}
                        />
                        <Button 
                          variant="outline"
                          onClick={() => {
                            if (inputValue) {
                              addSkill(inputValue);
                              setInputValue('');
                            }
                          }}
                        >
                          Add
                        </Button>
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
