
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { ResumePreview } from "@/components/ResumePreview";

const BuildResume = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<"build" | "preview">("build");
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
    // Check if template data was passed from navigation
    if (location.state?.templateData) {
      setResumeData(location.state.templateData);
    }
  }, [location.state]);

  if (currentView === "preview") {
    return (
      <ResumePreview 
        resumeData={resumeData}
        onEdit={() => setCurrentView("build")}
        onBack={() => setCurrentView("build")}
      />
    );
  }

  return (
    <ResumeBuilder 
      resumeData={resumeData}
      setResumeData={setResumeData}
      onPreview={() => setCurrentView("preview")}
      onBack={() => window.history.back()}
    />
  );
};

export default BuildResume;
