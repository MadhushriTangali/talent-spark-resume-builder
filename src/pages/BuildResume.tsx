
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { ResumePreview } from "@/components/ResumePreview";
import { useAuth } from "@/hooks/useAuth";

const BuildResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
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
    // Only redirect if not loading and no user
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Check if template data was passed from navigation
    if (location.state?.templateData) {
      setResumeData(location.state.templateData);
    }
  }, [location.state]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
      onBack={() => navigate("/")}
    />
  );
};

export default BuildResume;
