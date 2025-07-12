
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye } from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
}

interface ResumeSectionContentProps {
  sections: Section[];
  currentSection: number;
  setCurrentSection: (index: number) => void;
  resumeData: any;
  setResumeData: (data: any) => void;
  onPreview: () => void;
}

export const ResumeSectionContent = ({ 
  sections, 
  currentSection, 
  setCurrentSection, 
  resumeData, 
  setResumeData,
  onPreview 
}: ResumeSectionContentProps) => {
  const getCurrentSectionCompletion = () => {
    const section = sections[currentSection];
    switch (section.id) {
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

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span className="text-2xl">{sections[currentSection].icon}</span>
              <span>{sections[currentSection].title}</span>
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Fill out this section to build your professional resume
            </p>
          </div>
          {getCurrentSectionCompletion() && (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CurrentSectionComponent 
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-100">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {currentSection < sections.length - 1 ? (
              <Button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Next Section
              </Button>
            ) : (
              <Button
                onClick={onPreview}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Resume
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
