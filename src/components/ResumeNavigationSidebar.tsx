
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: string;
}

interface ResumeNavigationSidebarProps {
  sections: Section[];
  currentSection: number;
  setCurrentSection: (index: number) => void;
  resumeData: any;
}

export const ResumeNavigationSidebar = ({ 
  sections, 
  currentSection, 
  setCurrentSection, 
  resumeData 
}: ResumeNavigationSidebarProps) => {
  const getSectionCompletion = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone;
      case "summary":
        return resumeData.summary && resumeData.summary.length > 50;
      case "experience":
        return resumeData.experience && resumeData.experience.length > 0;
      case "education":
        return resumeData.education && resumeData.education.length > 0;
      case "skills":
        return resumeData.skills && resumeData.skills.length > 0;
      default:
        return false;
    }
  };

  return (
    <Card className="sticky top-24 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Resume Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sections.map((section, index) => {
          const isCompleted = getSectionCompletion(section.id);
          
          return (
            <Button
              key={section.id}
              variant={currentSection === index ? "default" : "ghost"}
              className={`w-full justify-start text-left h-auto p-3 ${
                currentSection === index 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                  : "hover:bg-purple-50"
              }`}
              onClick={() => setCurrentSection(index)}
            >
              <div className="flex items-center space-x-3 w-full">
                <span className="text-lg">{section.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{section.title}</div>
                </div>
                {isCompleted && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
