
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";
import { useAuth } from "@/hooks/useAuth";

const Templates = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleUseTemplate = (templateData: any) => {
    if (!user) {
      // If user is not authenticated, redirect to auth page
      navigate('/auth');
      return;
    }
    // Navigate to build page with template data
    navigate('/build', { state: { templateData } });
  };

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and creative industries",
      sampleData: {
        personalInfo: {
          fullName: "Alex Johnson",
          email: "alex.johnson@email.com",
          phone: "(555) 123-4567",
          location: "New York, NY",
          linkedIn: "linkedin.com/in/alexjohnson",
          website: "alexjohnson.dev"
        },
        summary: "Results-driven Software Engineer with 5+ years of experience developing scalable web applications. Passionate about clean code, user experience, and continuous learning.",
        experience: [
          {
            jobTitle: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            location: "New York, NY",
            startDate: "Jan 2022",
            endDate: "Present",
            current: true,
            responsibilities: [
              "Led development of React-based dashboard serving 10,000+ daily users",
              "Reduced application load time by 40% through code optimization",
              "Mentored 3 junior developers and conducted code reviews"
            ],
            achievements: [
              "Increased team productivity by 25% through process improvements",
              "Implemented CI/CD pipeline reducing deployment time by 60%"
            ]
          }
        ],
        education: [
          {
            degree: "Bachelor of Science",
            major: "Computer Science",
            school: "University of Technology",
            location: "Boston, MA",
            graduationDate: "May 2019",
            gpa: "3.8",
            honors: "Magna Cum Laude"
          }
        ],
        skills: [
          { name: "JavaScript", category: "Technical" },
          { name: "React", category: "Technical" },
          { name: "Node.js", category: "Technical" },
          { name: "Python", category: "Technical" },
          { name: "Leadership", category: "Soft" },
          { name: "Problem Solving", category: "Soft" },
          { name: "Git", category: "Tools" },
          { name: "Docker", category: "Tools" }
        ]
      }
    },
    {
      id: "classic",
      name: "Classic Professional",
      description: "Traditional format ideal for corporate and finance sectors",
      sampleData: {
        personalInfo: {
          fullName: "Sarah Mitchell",
          email: "sarah.mitchell@email.com",
          phone: "(555) 987-6543",
          location: "Chicago, IL",
          linkedIn: "linkedin.com/in/sarahmitchell",
          website: ""
        },
        summary: "Experienced Financial Analyst with 7+ years in corporate finance and investment analysis. Proven track record of optimizing financial processes and delivering actionable insights.",
        experience: [
          {
            jobTitle: "Senior Financial Analyst",
            company: "Global Finance Corp",
            location: "Chicago, IL",
            startDate: "Mar 2020",
            endDate: "Present",
            current: true,
            responsibilities: [
              "Analyzed financial data and market trends to support strategic decisions",
              "Prepared comprehensive financial reports for C-level executives",
              "Managed portfolio of investments worth $50M+"
            ],
            achievements: [
              "Identified cost savings opportunities resulting in $2M annual savings",
              "Improved forecasting accuracy by 30% through advanced modeling"
            ]
          }
        ],
        education: [
          {
            degree: "Master of Business Administration",
            major: "Finance",
            school: "Chicago Business School",
            location: "Chicago, IL",
            graduationDate: "May 2017",
            gpa: "3.9",
            honors: "Summa Cum Laude"
          }
        ],
        skills: [
          { name: "Financial Modeling", category: "Technical" },
          { name: "Excel", category: "Tools" },
          { name: "SQL", category: "Technical" },
          { name: "Tableau", category: "Tools" },
          { name: "Strategic Planning", category: "Soft" },
          { name: "Communication", category: "Soft" }
        ]
      }
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Stylish design for designers, artists, and creative professionals",
      sampleData: {
        personalInfo: {
          fullName: "Jordan Creative",
          email: "jordan@creativestudio.com",
          phone: "(555) 456-7890",
          location: "Los Angeles, CA",
          linkedIn: "linkedin.com/in/jordancreative",
          website: "jordancreative.com"
        },
        summary: "Award-winning Graphic Designer with 6+ years of experience creating compelling visual solutions for brands across various industries. Specialized in brand identity and digital design.",
        experience: [
          {
            jobTitle: "Senior Graphic Designer",
            company: "Creative Agency Plus",
            location: "Los Angeles, CA",
            startDate: "Jun 2021",
            endDate: "Present",
            current: true,
            responsibilities: [
              "Designed brand identities for 25+ clients across multiple industries",
              "Created digital campaigns that increased client engagement by 45%",
              "Collaborated with cross-functional teams on product launches"
            ],
            achievements: [
              "Won 'Designer of the Year' award in 2023",
              "Increased client retention rate by 35% through exceptional design quality"
            ]
          }
        ],
        education: [
          {
            degree: "Bachelor of Fine Arts",
            major: "Graphic Design",
            school: "Art Institute of California",
            location: "Los Angeles, CA",
            graduationDate: "May 2018",
            gpa: "3.7",
            honors: "Dean's List"
          }
        ],
        skills: [
          { name: "Adobe Creative Suite", category: "Tools" },
          { name: "Figma", category: "Tools" },
          { name: "Brand Design", category: "Technical" },
          { name: "Web Design", category: "Technical" },
          { name: "Creativity", category: "Soft" },
          { name: "Client Relations", category: "Soft" }
        ]
      }
    }
  ];

  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      return (
        <ResumePreview 
          resumeData={template.sampleData}
          onEdit={() => handleUseTemplate(template.sampleData)}
          onBack={() => setSelectedTemplate(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Templates
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates optimized for ATS systems and modern hiring practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <Card key={template.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {template.name}
                </CardTitle>
                <p className="text-gray-600">{template.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={() => setSelectedTemplate(template.id)}
                    variant="outline"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Template
                  </Button>
                  <Button
                    onClick={() => handleUseTemplate(template.sampleData)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
