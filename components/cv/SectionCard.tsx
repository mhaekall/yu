'use client';

import { useState } from "react";

interface Section {
  id: string;
  type: string;
  content: any;
}

export default function SectionCard({
  section,
  onUpdate,
  onRemove,
}: {
  section: Section;
  onUpdate: (content: any) => void;
  onRemove: () => void;
}) {
  const [content, setContent] = useState(section.content);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field: string, value: string) => {
    const updatedContent = { ...content, [field]: value };
    setContent(updatedContent);
  };

  const handleBlur = () => {
    onUpdate(content);
  };

  const getSectionTitle = (type: string) => {
    switch (type) {
      case "personal":
        return "Personal Information";
      case "experience":
        return "Work Experience";
      case "education":
        return "Education";
      case "skills":
        return "Skills";
      case "projects":
        return "Projects";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const renderSectionContent = () => {
    switch (section.type) {
      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={content.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={content.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={content.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={content.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                value={content.company || ""}
                onChange={(e) => handleChange("company", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  value={content.startDate || ""}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="MM/YYYY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="text"
                  value={content.endDate || ""}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="MM/YYYY or Present"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={content.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={handleBlur}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                value={content.institution || ""}
                onChange={(e) => handleChange("institution", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                value={content.degree || ""}
                onChange={(e) => handleChange("degree", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  value={content.startDate || ""}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="MM/YYYY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="text"
                  value={content.endDate || ""}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="MM/YYYY or Present"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={content.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={handleBlur}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills (comma separated)
              </label>
              <textarea
                value={content.skills || ""}
                onChange={(e) => handleChange("skills", e.target.value)}
                onBlur={handleBlur}
                rows={3}
                placeholder="JavaScript, React, Node.js, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={content.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={content.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={handleBlur}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technologies Used
              </label>
              <input
                type="text"
                value={content.technologies || ""}
                onChange={(e) => handleChange("technologies", e.target.value)}
                onBlur={handleBlur}
                placeholder="React, Node.js, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="url"
                value={content.link || ""}
                onChange={(e) => handleChange("link", e.target.value)}
                onBlur={handleBlur}
                placeholder="https://..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="border-b last:border-b-0 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {getSectionTitle(section.type)}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 text-red-500 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isExpanded && <div>{renderSectionContent()}</div>}
    </div>
  );
          }
