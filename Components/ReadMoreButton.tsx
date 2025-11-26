import React from "react";

interface ReadMoreButtonProps {
  text: string;
  isExpanded: boolean;
  onToggle: () => void;
  charLimit?: number;
  expandText?: string;
  collapseText?: string;
}

export default function ReadMoreButton({
  text,
  isExpanded,
  onToggle,
  charLimit = 100,
  expandText = "اقرأ المزيد",
  collapseText = "اقرأ أقل",
}: ReadMoreButtonProps) {
  const shouldShowButton = text.length > charLimit;

  return (
    <div>
      <p className={isExpanded ? "" : "line-clamp-3"}>{text}</p>
      {shouldShowButton && (
        <button
          onClick={onToggle}
          className=" text-amber-700 hover:text-amber-900 font-semibold text-sm mt-2 transition-colors duration-200">
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </div>
  );
}
