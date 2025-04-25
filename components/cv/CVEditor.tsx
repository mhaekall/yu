'use client';

import { useState } from "react";
import SectionCard from "./SectionCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface Section {
  id: string;
  cv_id: string;
  type: string;
  content: any;
  order: number;
}

interface CV {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function CVEditor({
  cv,
  sections,
}: {
  cv: CV;
  sections: Section[];
}) {
  const [title, setTitle] = useState(cv.title);
  const [cvSections, setCvSections] = useState<Section[]>(sections);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const updateSection = async (sectionId: string, content: any) => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from("cv_sections")
      .update({ content })
      .eq("id", sectionId);

    if (error) {
      console.error("Error updating section:", error);
    } else {
      setCvSections(
        cvSections.map((section) =>
          section.id === sectionId ? { ...section, content } : section
        )
      );
    }
    
    setIsSaving(false);
  };

  const addSection = async (type: string) => {
    setIsSaving(true);
    
    const newSection = {
      cv_id: cv.id,
      type,
      content: {},
      order: cvSections.length,
    };

    const { data, error } = await supabase
      .from("cv_sections")
      .insert(newSection)
      .select()
      .single();

    if (error) {
      console.error("Error adding section:", error);
    } else {
      setCvSections([...cvSections, data]);
    }
    
    setIsSaving(false);
  };

  const removeSection = async (sectionId: string) => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from("cv_sections")
      .delete()
      .eq("id", sectionId);

    if (error) {
      console.error("Error removing section:", error);
    } else {
      setCvSections(cvSections.filter((section) => section.id !== sectionId));
    }
    
    setIsSaving(false);
  };

  const updateTitle = async () => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from("cvs")
      .update({ title })
      .eq("id", cv.id);

    if (error) {
      console.error("Error updating CV title:", error);
    }
    
    setIsSaving(false);
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvId: cv.id }),
      });

      const data = await res.json();
      
      // In a real application, handle the PDF download here
      console.log("Export response:", data);
      
      alert("PDF export would be implemented here");
    } catch (error) {
      console.error("Error exporting CV:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={updateTitle}
          className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
        />
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        {cvSections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onUpdate={(content) => updateSection(section.id, content)}
            onRemove={() => removeSection(section.id)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Add Section
          </button>
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                              onClick={() => addSection("personal")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Personal Information
              </button>
              <button
                onClick={() => addSection("experience")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Work Experience
              </button>
              <button
                onClick={() => addSection("education")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Education
              </button>
              <button
                onClick={() => addSection("skills")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Skills
              </button>
              <button
                onClick={() => addSection("projects")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow">
          Saving...
        </div>
      )}
    </div>
  );
                }
