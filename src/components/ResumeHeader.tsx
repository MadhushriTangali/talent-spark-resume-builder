
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Save } from "lucide-react";

interface ResumeHeaderProps {
  onBack: () => void;
  resumeId?: string;
  overallCompletion: number;
  onSave: () => void;
  saving: boolean;
  onPreview: () => void;
}

export const ResumeHeader = ({ 
  onBack, 
  resumeId, 
  overallCompletion, 
  onSave, 
  saving, 
  onPreview 
}: ResumeHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {resumeId ? 'Edit Resume' : 'Resume Builder'}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {overallCompletion}% Complete
            </Badge>
            <Button
              variant="outline"
              onClick={onSave}
              disabled={saving}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button 
              variant="outline" 
              onClick={onPreview}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
