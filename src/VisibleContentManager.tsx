 
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Avatar } from "./Avatar";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";
import { Typography } from "./Typography";

export const VisibleContentManager = ({
    children,
    containerWidthPercentage = "calc(100% - 24px)",
    contentGap = 8,
    tooltipAsText = false,
    avatarProps,
    safePushToTooltip = 0, // safePushToTooltip will push the visible element from end to hidden element
}: {
    children: React.ReactNode[];
    containerWidthPercentage?: string;
    contentGap?: number;
    HiddenChildrenContainer?: React.ReactNode;
    tooltipAsText?: boolean;
    avatarProps?: object;
    safePushToTooltip?: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([]);
    const [hiddenChildren, setHiddenChildren] = useState<React.ReactNode[]>([]);
    const updateVisibleChildren = useCallback(() => {
        if (!containerRef.current) return;
        const parentWidth = containerRef.current.parentElement?.clientWidth ?? 0;
        let availableWidth = parentWidth;
        let visible = 0;
        let hidden = 0;
        const childWidths = Array.from(containerRef.current.children).map(
            (child) => child.getBoundingClientRect().width + contentGap // Add dynamic gap width
        );
        for (let i = 0; i < childWidths.length; i++) {
            if (childWidths[i] <= availableWidth && !hidden) {
                visible++;
                availableWidth -= childWidths[i];
            } else {
                hidden++;
            }
        }
        visible = visible - safePushToTooltip; // safePushToTooltip will push the visible element from end to hidden element
        setVisibleChildren(children.slice(0, visible));
        setHiddenChildren(children.slice(visible));
    }, [children, containerWidthPercentage, contentGap]);
    useEffect(() => {
        updateVisibleChildren();
    }, [children, updateVisibleChildren]);
    useEffect(() => {
        // Use ResizeObserver to detect parent width changes and update visible children
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
                gap: `${contentGap}px`,
                width: "100%",
                overflow: "hidden",
                alignItems: "center",
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
                    gap: `${contentGap}px`,
                }}
            >
                {children}
            </div>
            {/* Visible children */}
            <div
                style={{
                    display: "flex",
                    maxWidth: `${containerWidthPercentage}%`,
                    gap: `${contentGap}px`,
                }}
            >
                {visibleChildren}
            </div>
            {/* Hidden children container */}
            {/* Hidden tags count */}
            {hiddenChildren?.length > 0 && (
                <Tooltip
                    placement="bottom"
                    darkMode={true}
                    content={
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            {tooltipAsText
                                ? hiddenChildren?.map((s, i) => {
                                        const id = s?.props?.id ?? i;
                                        const label = s?.props?.label ?? "";
                                        return (
                                            <Typography
                                                variant="body"
                                                size="s"
                                                color="#FFFFFF"
                                                key={`tag-${id}-${i}-tooltip` || `tag-${i}-tooltip`}
                                                id={`tag-${id}-${i}-tooltip` || `tag-${i}-tooltip`}
                                            >
                                                {label}
                                            </Typography>
                                        );
                                    })
                                : hiddenChildren}
                        </Box>
                    }
                >
                    <Avatar
                        type="number"
                        size="s"
                        {...avatarProps}
                        src={
                            <Typography variant="body" size="s" color="#475467">
                                {`+${hiddenChildren?.length}`}
                            </Typography>
                        }
                    />
                </Tooltip>
            )}
        </div>
    );
};