import React from 'react';
import { useWindowSize } from './utils';
export function useDvdScreensaver(params) {
    var _a = useWindowSize(), windowWidth = _a.width, windowHeight = _a.height;
    var animationRef = React.useRef({
        animationFrameId: 0,
        impactCount: 0,
        isPosXIncrement: false,
        isPosYIncrement: false,
        containerHeight: 0,
        containerWidth: 0,
        positionX: Math.random() * (windowWidth - 0) + 0,
        positionY: Math.random() * (windowHeight - 0) + 0,
    });
    var elementRef = React.useRef(null);
    var containerRef = React.useRef(null);
    var _b = React.useState(0), impactCount = _b[0], setImpactCount = _b[1];
    var _c = React.useState(false), hovered = _c[0], setHovered = _c[1];
    var animate = function () {
        var delta = params.speed || 5;
        var setPos = function (_a) {
            var containerSpan = _a.containerSpan, delta = _a.delta, elementSpan = _a.elementSpan, prevPos = _a.prevPos, toggleRefKey = _a.toggleRefKey;
            var parentBoundary = containerSpan - elementSpan;
            var positionInRange = Math.min(Math.max(prevPos, 0), parentBoundary);
            if (positionInRange >= parentBoundary) {
                animationRef.current[toggleRefKey] = true;
                animationRef.current.impactCount = animationRef.current.impactCount + 1;
                setImpactCount(animationRef.current.impactCount);
            }
            if (positionInRange <= 0) {
                animationRef.current[toggleRefKey] = false;
                animationRef.current.impactCount = animationRef.current.impactCount + 1;
                setImpactCount(animationRef.current.impactCount);
            }
            return animationRef.current[toggleRefKey]
                ? positionInRange - delta
                : positionInRange + delta;
        };
        if (elementRef.current && elementRef.current.parentElement) {
            var containerHeight = elementRef.current.parentElement.clientHeight;
            var containerWidth = elementRef.current.parentElement.clientWidth;
            var elementHeight = elementRef.current.clientHeight;
            var elementWidth = elementRef.current.clientWidth;
            var posX = setPos({
                containerSpan: containerWidth,
                delta: delta,
                elementSpan: elementWidth,
                prevPos: animationRef.current.positionX,
                toggleRefKey: 'isPosXIncrement',
            });
            var posY = setPos({
                containerSpan: containerHeight,
                delta: delta,
                elementSpan: elementHeight,
                prevPos: animationRef.current.positionY,
                toggleRefKey: 'isPosYIncrement',
            });
            elementRef.current.style.transform = "translate3d(".concat(posX, "px, ").concat(posY, "px, 0)");
            animationRef.current.positionX = posX;
            animationRef.current.positionY = posY;
        }
        var animationFrameId = requestAnimationFrame(animate);
        animationRef.current.animationFrameId = animationFrameId;
    };
    React.useEffect(function () {
        if (params.freezeOnHover) {
            if (hovered) {
                cancelAnimationFrame(animationRef.current.animationFrameId);
                animationRef.current.animationFrameId = 0;
            }
            if (!hovered && !animationRef.current.animationFrameId) {
                animationRef.current.animationFrameId = requestAnimationFrame(animate);
            }
        }
        if (params.hoverCallback) {
            params.hoverCallback();
        }
    }, [hovered, params]);
    var handleMouseOver = function () {
        setHovered(true);
    };
    var handleMouseOut = function () {
        setHovered(false);
    };
    React.useLayoutEffect(function () {
        if (animationRef.current && elementRef.current) {
            elementRef.current.style.willChange = 'transform';
            elementRef.current.onmouseover = handleMouseOver;
            elementRef.current.onmouseout = handleMouseOut;
            animationRef.current.animationFrameId = requestAnimationFrame(animate);
        }
        return function () {
            var _a, _b;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseover', handleMouseOut);
            (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('mouseout', handleMouseOver);
            cancelAnimationFrame(animationRef.current.animationFrameId);
        };
    }, [animationRef, elementRef]);
    return {
        containerRef: containerRef,
        elementRef: elementRef,
        hovered: hovered,
        impactCount: impactCount,
    };
}
//# sourceMappingURL=useDvdScreensaver.js.map