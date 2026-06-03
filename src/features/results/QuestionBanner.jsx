import React from "react";
import { HelpCircle } from "lucide-react";

export default function QuestionBanner({ question }) {
  return (
    <div className="mb-6 flex w-full items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 p-3 text-slate-900">
      <HelpCircle className="ml-2 shrink-0 text-indigo-500" size={20} />
      <span className="text-sm font-medium md:text-sm">{question}</span>
    </div>
  );
}
