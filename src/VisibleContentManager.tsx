import React, { useEffect, useRef, useState } from "react";

export const VisibleContentManager = ({
  children,
  containerWidthPercentage = 85,
}: {
  children: React.ReactNode[];
  containerWidthPercentage?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleChildren, setVisibleChildren] = useState<any>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      let containerWidth =
        (containerWidthPercentage / 100) *
        containerRef.current.parentElement!.offsetWidth;
      let visible = 0;
      let hidden = 0;
      React.Children?.forEach(children, (child, i) => {
        const childWidth =
          containerRef.current?.children[i].getBoundingClientRect().width + 8;
        if (childWidth) {
          if (childWidth <= containerWidth) {
            visible++;
            containerWidth -= childWidth;
          } else {
            hidden += 1;
          }
        }
      });
      setVisibleChildren(children.slice(0, visible));
      setHiddenCount(hidden);
    }
  }, [children, containerWidthPercentage]);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        width: "100%",
      }}
    >
      {/* Render all children invisibly for measurement */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflow: "hidden",
          maxWidth: `${containerWidthPercentage}%`,
          gap: "8px",
          height: "24px",
          visibility: "hidden", // Render invisibly
          position: "absolute", // Remove from layout
        }}
      >
        {children}
      </div>
      {/* Render visible children normally */}
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          maxWidth: `${containerWidthPercentage}%`,
          gap: "8px",
        }}
      >
        {visibleChildren}
      </div>
      {/* Hidden children count */}
      {hiddenCount > 0 && (
        <div
          style={{
            width: "24px",
            height: "24px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#E0E0E0", // You can change the background color if needed
          }}
        >
          {`+${hiddenCount}`}
        </div>
      )}
    </div>
  );
};
