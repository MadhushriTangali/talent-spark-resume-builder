
import { useState, useEffect } from "react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { SummaryForm } from "./SummaryForm";
import { ATSScoreCard } from "./ATSScoreCard";
import { ResumeHeader } from "./ResumeHeader";
import { ResumeNavigationSidebar } from "./ResumeNavigationSidebar";
import { ResumeSectionContent } from "./ResumeSectionContent";
import { useAuth } from "@/hooks/useAuth";
import { useResumeData } from "@/hooks/useResumeData";
import { getOverallCompletion } from "@/utils/resumeUtils";
import { useNavigate } from "react-router-dom";

interface ResumeBuilderProps {
  resumeData: any;
  setResumeData: (data: any) => void;
  onPreview: () => void;
  onBack: () => void;
  resumeId?: string;
}

export const ResumeBuilder = ({ resumeData, setResumeData, onPreview, onBack, resumeId }: ResumeBuilderProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { saveResume, saving } = useResumeData(user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const sections = [
    { id: "personal", title: "Personal Information", component: PersonalInfoForm, icon: "👤" },
    { id: "summary", title: "Professional Summary", component: SummaryForm, icon: "📝" },
    { id: "experience", title: "Work Experience", component: ExperienceForm, icon: "💼" },
    { id: "education", title: "Education", component: EducationForm, icon: "🎓" },
    { id: "skills", title: "Skills & Expertise", component: SkillsForm, icon: "⚡" }
  ];

  const handleSaveResume = () => {
    saveResume(resumeData, resumeId);
  };

  const overallCompletion = getOverallCompletion(resumeData, sections);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <ResumeHeader
        onBack={onBack}
        resumeId={resumeId}
        overallCompletion={overallCompletion}
        onSave={handleSaveResume}
        saving={saving}
        onPreview={onPreview}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <ResumeNavigationSidebar
              sections={sections}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              resumeData={resumeData}
            />

            {/* ATS Score Card */}
            <div className="mt-6">
              <ATSScoreCard resumeData={resumeData} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ResumeSectionContent
              sections={sections}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              resumeData={resumeData}
              setResumeData={setResumeData}
              onPreview={onPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
