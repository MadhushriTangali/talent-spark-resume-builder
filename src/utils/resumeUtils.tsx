
export const getOverallCompletion = (resumeData: any, sections: any[]) => {
  const completedSections = sections.filter((_, index) => {
    const completion = sections.map((s, i) => {
      switch (s.id) {
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
    });
    return completion[index];
  });
  return Math.round((completedSections.length / sections.length) * 100);
};
