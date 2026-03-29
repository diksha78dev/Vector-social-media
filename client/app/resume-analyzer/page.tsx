"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";

export default function ResumeAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSubmit = async () => {
        if (!file || !jd) return alert("Upload resume + JD");

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jd);

        try {
            setLoading(true);
            const res = await axios.post(
                `${BACKEND_URL}/api/resume/analyze`,
                formData
            );
            setResult(res.data);
        } catch (err: any) {
            console.error(err);
            alert("Backend error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-5 bg-white relative overflow-hidden">
            <Navbar />

            <div className="relative flex z-10 max-w-7xl mx-auto px-6 py-16">

                {/* HEADER */}


                {/* GRID */}
                <div className="flex gap-10 w-full">

                    {/* INPUT SIDE */}
                    <div className="space-y-6 w-full md:w-1/2">
                        <div className="mb-14">
                            <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
                                Resume <span className="text-blue-500">Intelligence</span>
                            </h1>
                            <p className="text-neutral-500 mt-3 max-w-xl">
                                Upload your resume. Paste a job description. Get brutally honest,
                                recruiter-level insights instantly.
                            </p>
                        </div>
                        {/* Upload */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-card">
                            <p className="text-sm text-neutral-500 mb-3">Resume</p>

                            <div className="border border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer bg-neutral-50">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setFile(e.target.files?.[0] || null)
                                    }
                                    className="hidden"
                                    id="file-upload"
                                />

                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <p className="text-sm text-neutral-600">
                                        {file ? file.name : "Click to upload PDF"}
                                    </p>
                                </label>
                            </div>
                        </div>

                        {/* JD */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-card">
                            <p className="text-sm text-neutral-500 mb-3">
                                Job Description
                            </p>

                            <textarea
                                value={jd}
                                onChange={(e) => setJd(e.target.value)}
                                placeholder="Paste the job description..."
                                className="w-full h-40 border border-neutral-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 resize-none"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleSubmit}
                            className={`w-full py-3 rounded-xl ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium transition shadow-md`}
                        >
                            {loading ? "Analyzing..." : "Analyze Resume"}
                        </button>

                    </div>

                    {/* OUTPUT SIDE */}
                    <div className="w-full md:w-1/2">

                        {!result && (
                            <div className="h-full flex items-center justify-center text-neutral-400 text-sm border border-neutral-200 rounded-2xl bg-white shadow-card">
                                Your analysis will appear here
                            </div>
                        )}

                        {result && (
                            <div className="space-y-5">

                                {/* SCORE */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
                                    <p className="text-sm text-neutral-500">ATS Score</p>
                                    <h2 className="text-5xl font-bold text-blue-500 mt-1">
                                        {result.ats_score ?? "N/A"}
                                    </h2>
                                </div>

                                {/* CARDS */}
                                <div className="grid gap-4">

                                    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-card">
                                        <h3 className="text-sm text-blue-500 mb-2 font-medium">
                                            Missing Skills
                                        </h3>
                                        <ul className="text-sm text-neutral-600 space-y-1">
                                            {result.missing_skills?.map((s: string, i: number) => (
                                                <li key={i}>• {s}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-card">
                                        <h3 className="text-sm text-blue-500 mb-2 font-medium">
                                            Weak Areas
                                        </h3>
                                        <ul className="text-sm text-neutral-600 space-y-1">
                                            {result.weak_areas?.map((w: string, i: number) => (
                                                <li key={i}>• {w}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-card">
                                        <h3 className="text-sm text-blue-500 mb-2 font-medium">
                                            Suggestions
                                        </h3>
                                        <ul className="text-sm text-neutral-600 space-y-1">
                                            {result.suggestions?.map((s: string, i: number) => (
                                                <li key={i}>• {s}</li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}