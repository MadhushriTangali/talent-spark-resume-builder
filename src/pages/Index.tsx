
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Sparkles, Target, CheckCircle, LogOut } from "lucide-react";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { ResumePreview } from "@/components/ResumePreview";
import { KeywordAnalyzer } from "@/components/KeywordAnalyzer";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<"home" | "build" | "preview">("home");
  const [user, setUser] = useState<User | null>(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      website: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }
    });

    // Check if we should start building (from templates page)
    if (location.state?.startBuilding) {
      setCurrentView("build");
    }

    return () => subscription.unsubscribe();
  }, [location.state, toast]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const handleStartBuilding = () => {
    console.log("Start Building clicked, user:", user);
    if (!user) {
      navigate("/auth");
      return;
    }
    setCurrentView("build");
  };

  const features = [
    {
      icon: Target,
      title: "ATS-Optimized Templates",
      description: "Professional templates designed to pass through Applicant Tracking Systems"
    },
    {
      icon: Sparkles,
      title: "Smart Keyword Suggestions",
      description: "AI-powered keyword recommendations based on your industry and role"
    },
    {
      icon: CheckCircle,
      title: "Real-time Formatting",
      description: "Live feedback on ATS-friendly formatting and structure"
    }
  ];

  if (currentView === "build") {
    return (
      <ResumeBuilder 
        resumeData={resumeData}
        setResumeData={setResumeData}
        onPreview={() => setCurrentView("preview")}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "preview") {
    return (
      <ResumePreview 
        resumeData={resumeData}
        onEdit={() => setCurrentView("build")}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ATS Resume Builder
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <Button 
                    onClick={handleStartBuilding}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Build Resume
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut} className="text-gray-600 hover:text-gray-700">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/auth")} className="text-purple-600 hover:text-purple-700">
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => navigate("/auth")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Create an{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ATS-Friendly Resume
            </span>{" "}
            That Gets You Hired
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build a professional resume optimized for Applicant Tracking Systems with our AI-powered tools, 
            keyword suggestions, and expert formatting guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleStartBuilding}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Building
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/templates")}
              className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Resume Builder?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven recruiting insights 
            to help you create resumes that stand out to both ATS systems and hiring managers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ATS Tips Section */}
      <section className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              ATS Optimization Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Use Standard Headings</h4>
                    <p className="text-gray-600">Stick to conventional section names like "Experience" and "Education"</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Include Relevant Keywords</h4>
                    <p className="text-gray-600">Match job description keywords naturally throughout your resume</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Simple Formatting</h4>
                    <p className="text-gray-600">Avoid complex layouts, graphics, and unusual fonts</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Use Standard File Format</h4>
                    <p className="text-gray-600">Save as .docx or .pdf for maximum compatibility</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quantify Achievements</h4>
                    <p className="text-gray-600">Use numbers and metrics to demonstrate impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Spell Out Acronyms</h4>
                    <p className="text-gray-600">Include both acronym and full form for better matching</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your Perfect Resume?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of job seekers who have successfully landed interviews with our ATS-optimized resumes.
          </p>
          <Button 
            size="lg"
            onClick={handleStartBuilding}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">ATS Resume Builder</span>
          </div>
          <p className="text-gray-400">
            © 2024 ATS Resume Builder. Built with ❤️ to help you land your dream job.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
