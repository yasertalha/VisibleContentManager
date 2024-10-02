var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useRef, useState, useCallback } from "react";
export var VisibleContentManager = function (_a) {
    var children = _a.children, _b = _a.containerWidthPercentage, containerWidthPercentage = _b === void 0 ? 85 : _b, _c = _a.gapWidth, gapWidth = _c === void 0 ? 8 : _c, HiddenChildrenContainerStyle = _a.HiddenChildrenContainerStyle;
    var containerRef = useRef(null);
    var _d = useState([]), visibleChildren = _d[0], setVisibleChildren = _d[1];
    var _e = useState(0), hiddenCount = _e[0], setHiddenCount = _e[1];
    var updateVisibleChildren = useCallback(function () {
        if (!containerRef.current)
            return;
        var parentWidth = (containerWidthPercentage / 100) * containerRef.current.parentElement.offsetWidth;
        var availableWidth = parentWidth;
        var visible = 0;
        var hidden = 0;
        // Use a loop to get child widths
        React.Children.forEach(children, function (child) {
            if (React.isValidElement(child) && containerRef.current) {
                // Assert the type of child
                var childIndex = React.Children.toArray(children).indexOf(child);
                var childElement = containerRef.current.children[childIndex];
                var childWidth = childElement.getBoundingClientRect().width + gapWidth; // Add dynamic gap width
                if (childWidth <= availableWidth) {
                    visible++;
                    availableWidth -= childWidth;
                }
                else {
                    hidden++;
                }
            }
        });
        setVisibleChildren(children.slice(0, visible));
        setHiddenCount(hidden);
    }, [children, containerWidthPercentage, gapWidth]);
    useEffect(function () {
        updateVisibleChildren();
    }, [children, updateVisibleChildren]);
    useEffect(function () {
        var _a;
        var resizeObserver = new ResizeObserver(function () {
            updateVisibleChildren();
        });
        if ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
            resizeObserver.observe(containerRef.current.parentElement);
        }
        return function () {
            var _a;
            if ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
                resizeObserver.unobserve(containerRef.current.parentElement);
            }
        };
    }, [updateVisibleChildren]);
    return (React.createElement("div", { style: {
            display: "flex",
            gap: "".concat(gapWidth, "px"),
            width: "100%",
            overflow: "hidden",
        } },
        React.createElement("div", { ref: containerRef, style: {
                display: "flex",
                visibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: "".concat(containerWidthPercentage, "%"),
                gap: "".concat(gapWidth, "px"),
            } }, children),
        React.createElement("div", { style: {
                display: "flex",
                maxWidth: "".concat(containerWidthPercentage, "%"),
                gap: "".concat(gapWidth, "px"),
            } }, visibleChildren),
        hiddenCount > 0 &&
            React.createElement("div", { style: __assign({ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "#E0E0E0" }, HiddenChildrenContainerStyle) }, "+".concat(hiddenCount))));
};
