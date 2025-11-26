import React, { useEffect, useRef, useState } from "react";

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
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>("4rem");

  useEffect(() => {
    if (!contentRef.current) return;

    // When expanded, set maxHeight to the content's scrollHeight so transition animates to full height.
    // When collapsed, clamp to ~3 lines (4.5rem). Using a fixed collapsed height provides a smooth transition.
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("4.5rem");
    }
  }, [isExpanded, text]);

  return (
    <div>
      <div
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 300ms ease",
        }}>
        <p ref={contentRef} className="m-0">
          {text}
        </p>
      </div>
      {shouldShowButton && (
        <button
          onClick={onToggle}
          className=" text-amber-700  hover:text-amber-900 font-semibold text-sm mt-2 transition-colors duration-200">
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </div>
  );
}
