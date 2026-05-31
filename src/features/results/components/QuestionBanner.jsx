import React from "react";
import { HelpCircle } from "lucide-react";

function QuestionBanner() {
  return (
    <div className="mb-6 flex w-full items-center gap-3 rounded-full border border-indigo-300 bg-white p-4 text-black">
      <HelpCircle className="ml-2 text-gray-500" size={24} />
      <span className="text-sm font-medium md:text-base">
        What is the average salary of a junior position in startups and
        companies?
      </span>
    </div>
  );
}

export default QuestionBanner;
