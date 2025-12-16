// "use client";
// import { style } from "framer-motion/client";
// import { ReactNode, useLayoutEffect, useRef, useState } from "react";

// interface FlipCardProps {
//   front: (flip: () => void) => ReactNode;
//   back: (flip: () => void) => ReactNode;
//   className?: string;
// }

// export default function FlipCard({
//   front,
//   back,
//   className = "",
// }: FlipCardProps) {
//   const [flipped, setFlipped] = useState(false);
//  const [height, setHeight] = useState<number | null>(null);
//   const frontRef = useRef<HTMLDivElement>(null);
//   const toggle = () => setFlipped((v) => !v);
//  useLayoutEffect(() => {
//     if (frontRef.current && height === null) {
//       setHeight(frontRef.current.offsetHeight);
//     }
//   }, [height]);
//   return (
//     <div className={`flip-wrapper ${className}`}
//     style={{ height: height ? `${height}px` : "auto" }}
//     >
//       <div className={`flip-card ${flipped ? "flipped" : ""}`}>
//         <div
//           className={`flip-face ${flipped? "hidden" : "hidden"}`}
//           // style={{ position: flipped ? "" : "relative" }}
//           >
//           {front(toggle)}
//         </div>
//         <div className="flip-face flip-back">{back(toggle)}</div>
//       </div>
//     </div>
//   );
// }

"use client";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface FlipCardProps {
  front: (flip: () => void) => ReactNode;
  back: (flip: () => void) => ReactNode;
  className?: string;
}

export default function FlipCard({
  front,
  back,
  className = "",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  const frontRef = useRef<HTMLDivElement>(null);

  const toggle = () => setFlipped(v => !v);

  useLayoutEffect(() => {
    if (frontRef.current && height === null) {
      setHeight(frontRef.current.offsetHeight);
    }
  }, [height]);

  return (
    <div
      className={`flip-wrapper ${className}`}
      style={{ height: height ? `${height}px` : "auto" }}
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        
        {/* FRONT */}
        <div ref={frontRef} className="flip-face">
          {front(toggle)}
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          {back(toggle)}
        </div>

      </div>
    </div>
  );
}
