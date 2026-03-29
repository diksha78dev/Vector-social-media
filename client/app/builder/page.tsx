"use client";

import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumeTemplate } from "@/components/resume/ResumeTemplate";
import { useResume } from "@/context/ResumeContext";
import { Download, ArrowLeft, Trash2, Eye, EyeOff, Sparkles } from "lucide-react";
import { initialResumeData } from "@/types/resume";
import { demoResumeData } from "@/utils/demoData";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "react-toastify";

export default function Builder() {
  const { resumeData, setResumeData } = useResume();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearResume = () => {
    setResumeData(initialResumeData);
    toast.success("Resume data cleared!");
  };

  const handleLoadDemo = () => {
    if (confirm("Load demo data? This will replace your current resume.")) {
      setResumeData(demoResumeData);
      toast.success("Demo data loaded!");
    }
  };

  const isEmpty =
    !resumeData.personalInfo?.name &&
    resumeData.education.length === 0 &&
    resumeData.experience.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobilePreview(!showMobilePreview)} className="lg:hidden flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors">
                {showMobilePreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {showMobilePreview ? "Hide" : "Preview"}
                </span>
              </button>

              {isEmpty && (
                <button onClick={handleLoadDemo} className="hidden md:flex btn-secondary items-center gap-2 px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Load Demo
                </button>
              )}

              {!isEmpty &&
                <button onClick={() => { setShowConfirm(true) }} className="hidden btn-secondary sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">Clear Resume</span>
                </button>}

              <Link href="/download" className="flex items-center gap-2 px-4 sm:px-6 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-0 overflow-hidden">
          <div
            className={`bg-gray-50 overflow-auto ${showMobilePreview ? "hidden lg:block" : ""}`}>
            <div className="max-w-3xl mx-auto px-6 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Build Your Resume
                </h1>
                <p className="text-gray-600">
                  Fill in your information and watch your resume update in
                  real-time
                </p>
              </div>

              <ResumeForm />
            </div>
          </div>

          <div
            className={`bg-blue-500 border-l border-gray-300 overflow-auto sticky top-0 ${showMobilePreview ? "" : "hidden lg:block"}`}>
            <div className="p-4 sm:p-8">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-1">
                  Live Preview
                </h2>
                <p className="text-sm text-gray-300">
                  Your resume updates as you type
                </p>
              </div>

              <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ aspectRatio: "8.5/11" }}>
                <ResumeTemplate data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          handleClearResume();
          setShowConfirm(false);
        }} />
    </div>
  );
}