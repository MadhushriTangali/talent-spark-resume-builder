
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { ResumePreview } from "@/components/ResumePreview";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchResume = async () => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching resume:', error);
          navigate("/my-resumes");
          return;
        }

        setResumeData({
          personalInfo: data.personal_info,
          summary: data.summary,
          experience: data.experience,
          education: data.education,
          skills: data.skills,
          projects: data.projects,
          certifications: data.certifications
        });
      } catch (error) {
        console.error('Error:', error);
        navigate("/my-resumes");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResume();
    }
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (currentView === "preview") {
    return (
      <ResumePreview 
        resumeData={resumeData}
        onEdit={() => setCurrentView("build")}
        onBack={() => navigate("/my-resumes")}
      />
    );
  }

  return (
    <ResumeBuilder 
      resumeData={resumeData}
      setResumeData={setResumeData}
      onPreview={() => setCurrentView("preview")}
      onBack={() => navigate("/my-resumes")}
      resumeId={id}
    />
  );
};

export default EditResume;
