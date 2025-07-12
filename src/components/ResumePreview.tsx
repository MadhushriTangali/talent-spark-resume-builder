
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Edit, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  resumeData: any;
  onEdit: () => void;
  onBack: () => void;
}

export const ResumePreview = ({ resumeData, onEdit, onBack }: ResumePreviewProps) => {
  const handleDownload = () => {
    // Create a printable version
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Preview
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={onEdit}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Resume
              </Button>
              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Resume Preview */}
        <Card className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none">
          <CardContent className="p-8 print:p-6">
            {/* Header Section */}
            <div className="text-center mb-8 print:mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-3xl">
                {resumeData.personalInfo?.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 text-sm">
                {resumeData.personalInfo?.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{resumeData.personalInfo.email}</span>
                  </div>
                )}
                {resumeData.personalInfo?.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{resumeData.personalInfo.phone}</span>
                  </div>
                )}
                {resumeData.personalInfo?.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                )}
                {resumeData.personalInfo?.linkedIn && (
                  <div className="flex items-center space-x-1">
                    <Linkedin className="h-4 w-4" />
                    <span>{resumeData.personalInfo.linkedIn}</span>
                  </div>
                )}
                {resumeData.personalInfo?.website && (
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{resumeData.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-purple-200 pb-1">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-purple-200 pb-1">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                          {exp.location && <p>{exp.location}</p>}
                        </div>
                      </div>
                      <div className="ml-0">
                        {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {exp.responsibilities.filter((resp: string) => resp.trim()).map((resp: string, idx: number) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        )}
                        {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] && (
                          <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                            {exp.achievements.filter((achievement: string) => achievement.trim()).map((achievement: string, idx: number) => (
                              <li key={idx} className="font-medium">{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-purple-200 pb-1">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu: any, index: number) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.degree} {edu.major && `in ${edu.major}`}
                        </h3>
                        <p className="text-purple-600 font-medium">{edu.school}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          {edu.location && <span>{edu.location}</span>}
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                          {edu.honors && <span className="font-medium text-yellow-700">{edu.honors}</span>}
                        </div>
                      </div>
                      {edu.graduationDate && (
                        <div className="text-right text-sm text-gray-600">
                          <p>Graduated: {edu.graduationDate}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-purple-200 pb-1">
                  SKILLS & EXPERTISE
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Technical", "Soft", "Industry", "Tools"].map((category) => {
                    const categorySkills = resumeData.skills.filter((skill: any) => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {category === "Technical" ? "Technical Skills" :
                           category === "Soft" ? "Soft Skills" :
                           category === "Industry" ? "Industry Knowledge" : "Tools & Software"}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {categorySkills.map((skill: any, index: number) => (
                            <span key={index} className="text-sm text-gray-700">
                              {skill.name}{index < categorySkills.length - 1 ? "," : ""}&nbsp;
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Print Instructions */}
        <div className="max-w-4xl mx-auto mt-6 text-center text-sm text-gray-600 print:hidden">
          <p>
            Click "Download PDF" to save your resume. For best results, use Chrome or Edge browser 
            and set margins to "Minimum" in print settings.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:p-6 { padding: 1.5rem !important; }
          .print\\:mb-6 { margin-bottom: 1.5rem !important; }
          .print\\:text-3xl { font-size: 1.875rem !important; }
          @page { margin: 0.5in; }
        }
      `}</style>
    </div>
  );
};
