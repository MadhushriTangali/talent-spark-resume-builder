import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationFormProps {
  resumeData: any;
  setResumeData: (data: any) => void;
}

interface Education {
  id: string;
  degree: string;
  major: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
  honors: string;
}

export const EducationForm = ({ resumeData, setResumeData }: EducationFormProps) => {
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: Date.now().toString(),
    degree: "",
    major: "",
    school: "",
    location: "",
    graduationDate: "",
    gpa: "",
    honors: ""
  });

  const degreeTypes = [
    "High School Diploma",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree (JD, MD, etc.)",
    "Certificate",
    "Diploma"
  ];

  const addEducation = () => {
    if (currentEducation.degree && currentEducation.school) {
      const newEducation = { ...currentEducation, id: Date.now().toString() };
      setResumeData({
        ...resumeData,
        education: [...(resumeData.education || []), newEducation]
      });
      setCurrentEducation({
        id: Date.now().toString(),
        degree: "",
        major: "",
        school: "",
        location: "",
        graduationDate: "",
        gpa: "",
        honors: ""
      });
    }
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu: Education) => edu.id !== id)
    });
  };

  const updateCurrentEducation = (field: string, value: string) => {
    setCurrentEducation({
      ...currentEducation,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* ATS Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Badge className="bg-blue-100 text-blue-700">ATS Tip</Badge>
          </div>
          <p className="text-sm text-blue-700">
            List education in reverse chronological order. Include GPA only if it's 3.5 or higher. 
            Use full degree names (Bachelor of Science, not BS) for better ATS recognition.
          </p>
        </CardContent>
      </Card>

      {/* Existing Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Education</h3>
          {resumeData.education.map((edu: Education) => (
            <Card key={edu.id} className="bg-white border-purple-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-purple-900">
                      {edu.degree} {edu.major && `in ${edu.major}`}
                    </CardTitle>
                    <p className="text-purple-600 font-medium">{edu.school}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      {edu.location && <span>{edu.location}</span>}
                      {edu.graduationDate && <span>Graduated: {edu.graduationDate}</span>}
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                    {edu.honors && (
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">{edu.honors}</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Education */}
      <Card className="bg-white border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            <span>Add Education</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree Type *</Label>
              <Select value={currentEducation.degree} onValueChange={(value) => updateCurrentEducation("degree", value)}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select degree type" />
                </SelectTrigger>
                <SelectContent>
                  {degreeTypes.map((degree) => (
                    <SelectItem key={degree} value={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Field of Study / Major</Label>
              <Input
                id="major"
                placeholder="Computer Science"
                value={currentEducation.major}
                onChange={(e) => updateCurrentEducation("major", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="school">School / Institution *</Label>
              <Input
                id="school"
                placeholder="University of California, Berkeley"
                value={currentEducation.school}
                onChange={(e) => updateCurrentEducation("school", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Berkeley, CA"
                value={currentEducation.location}
                onChange={(e) => updateCurrentEducation("location", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationDate">Graduation Date</Label>
              <Input
                id="graduationDate"
                type="month"
                value={currentEducation.graduationDate}
                onChange={(e) => updateCurrentEducation("graduationDate", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                placeholder="3.8/4.0"
                value={currentEducation.gpa}
                onChange={(e) => updateCurrentEducation("gpa", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
              <p className="text-xs text-gray-500">Only include if 3.5 or higher</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="honors">Honors / Awards</Label>
              <Input
                id="honors"
                placeholder="Magna Cum Laude, Dean's List"
                value={currentEducation.honors}
                onChange={(e) => updateCurrentEducation("honors", e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
          </div>

          <Button
            onClick={addEducation}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            disabled={!currentEducation.degree || !currentEducation.school}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      {/* Education Tips */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Education Tips:</h4>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-purple-600 mt-1">•</span>
              <span>List most recent education first</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-purple-600 mt-1">•</span>
              <span>Include relevant coursework if you're a recent graduate</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-purple-600 mt-1">•</span>
              <span>For experienced professionals, education can be brief</span>
            </li>
            <li className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-purple-600 mt-1">•</span>
              <span>Include certifications and professional development</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
