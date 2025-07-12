
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const PreviewResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(null);
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

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume not found</h2>
          <button onClick={() => navigate("/my-resumes")} className="text-purple-600 hover:text-purple-700">
            Back to My Resumes
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResumePreview 
      resumeData={resumeData}
      onEdit={() => navigate(`/edit/${id}`)}
      onBack={() => navigate("/my-resumes")}
    />
  );
};

export default PreviewResume;
