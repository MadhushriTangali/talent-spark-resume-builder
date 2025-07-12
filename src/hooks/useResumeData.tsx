
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useResumeData = (user: any) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const saveResume = async (resumeData: any, resumeId?: string) => {
    if (!user) return;

    setSaving(true);
    try {
      const resumeTitle = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName}'s Resume`
        : 'My Resume';

      if (resumeId) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update({
            title: resumeTitle,
            personal_info: resumeData.personalInfo,
            summary: resumeData.summary,
            experience: resumeData.experience,
            education: resumeData.education,
            skills: resumeData.skills,
            projects: resumeData.projects,
            certifications: resumeData.certifications,
            updated_at: new Date().toISOString()
          })
          .eq('id', resumeId);

        if (error) {
          throw error;
        }
      } else {
        // Create new resume
        const { error } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: resumeTitle,
            personal_info: resumeData.personalInfo,
            summary: resumeData.summary,
            experience: resumeData.experience,
            education: resumeData.education,
            skills: resumeData.skills,
            projects: resumeData.projects,
            certifications: resumeData.certifications
          });

        if (error) {
          throw error;
        }
      }

      toast({
        title: "Resume Saved!",
        description: "Your resume has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return { saveResume, saving };
};
