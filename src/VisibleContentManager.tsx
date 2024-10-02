import React, { useEffect, useRef, useState, useCallback } from "react";

export const VisibleContentManager = ({
  children,
  containerWidthPercentage = 85,
  gapWidth = 8,
  HiddenChildrenContainerStyle,
}: {
  children: React.ReactNode[];
  containerWidthPercentage?: number;
  gapWidth?: number;
  HiddenChildrenContainerStyle?: Object;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  const updateVisibleChildren = useCallback(() => {
    if (!containerRef.current) return;

    const parentWidth =
      (containerWidthPercentage / 100) * containerRef.current.parentElement!.offsetWidth;

    let availableWidth = parentWidth;
    let visible = 0;
    let hidden = 0;

    // Use a loop to get child widths
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && containerRef.current) {
        // Assert the type of child
        const childIndex = React.Children.toArray(children).indexOf(child);
        const childElement = containerRef.current.children[childIndex] as HTMLElement;

        const childWidth = childElement.getBoundingClientRect().width + gapWidth; // Add dynamic gap width
        if (childWidth <= availableWidth) {
          visible++;
          availableWidth -= childWidth;
        } else {
          hidden++;
        }
      }
    });

    setVisibleChildren(children.slice(0, visible));
    setHiddenCount(hidden);
  }, [children, containerWidthPercentage, gapWidth]);

  useEffect(() => {
    updateVisibleChildren();
  }, [children, updateVisibleChildren]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateVisibleChildren();
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      if (containerRef.current?.parentElement) {
        resizeObserver.unobserve(containerRef.current.parentElement);
      }
    };
  }, [updateVisibleChildren]);

  return (
    <div
      style={{
        display: "flex",
        gap: `${gapWidth}px`,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Invisible container for measurement */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          width: `${containerWidthPercentage}%`,
          gap: `${gapWidth}px`,
        }}
      >
        {children}
      </div>

      {/* Visible children */}
      <div
        style={{
          display: "flex",
          maxWidth: `${containerWidthPercentage}%`,
          gap: `${gapWidth}px`,
        }}
      >
        {visibleChildren}
      </div>

      {/* Hidden children container */}
      {hiddenCount > 0 &&  
          <div
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#E0E0E0",
              ...HiddenChildrenContainerStyle
            }}
          >
            {`+${hiddenCount}`}
          </div> 
       }
    </div>
  );
};
