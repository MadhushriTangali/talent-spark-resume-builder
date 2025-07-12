
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Templates = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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
    });

    return () => subscription.unsubscribe();
  }, []);

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean, modern design perfect for tech and creative industries",
      preview: "/placeholder.svg",
      features: ["ATS-Friendly", "Modern Design", "Easy to Customize"]
    },
    {
      id: "classic",
      name: "Classic Corporate",
      description: "Traditional format ideal for corporate and business roles",
      preview: "/placeholder.svg",
      features: ["ATS-Optimized", "Professional Layout", "Industry Standard"]
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Minimalist design that highlights your achievements",
      preview: "/placeholder.svg",
      features: ["Clean Design", "Focus on Content", "Versatile"]
    },
    {
      id: "creative",
      name: "Creative Edge",
      description: "Eye-catching design for creative professionals",
      preview: "/placeholder.svg",
      features: ["Creative Layout", "Visual Appeal", "Stand Out"]
    }
  ];

  const handleUseTemplate = (templateId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    // Navigate to builder with selected template
    navigate("/", { state: { templateId, startBuilding: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Resume Templates
                </h1>
              </div>
            </div>
            {!user && (
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Templates Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All templates are ATS-optimized and designed to help you land your dream job
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Template Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={() => handleUseTemplate(template.id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Use This Template
                    </Button>
                    <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Choose a template above or start with a blank resume
          </p>
          <Button 
            size="lg"
            onClick={() => handleUseTemplate("modern")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Start Building Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
