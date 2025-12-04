var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import React from "react";
import { useWindowSize } from "./utils";
var createHash = function () {
  return Math.random().toString(36).substring(7);
};
var hashedClassName = createHash();
export function DvdScreensaver(props) {
  const fiftyFifty = Math.random() < 0.5;
  var _a = useWindowSize(),
    windowWidth = _a.width,
    windowHeight = _a.height;
  var animationRef = React.useRef({
    animationFrameId: 0,
    impactCount: 0,
    isPosXIncrement: fiftyFifty,
    isPosYIncrement: fiftyFifty,
    containerHeight: 0,
    containerWidth: 0,
    positionX: Math.random() * (windowWidth - 0) + 0,
    positionY: Math.random() * (windowHeight - 0) + 0,
    lastFrameTime: performance.now(),
    accumulatedTime: 0,
  });
  var elementRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var _b = React.useState(false),
    hovered = _b[0],
    setHovered = _b[1];
  var _c = React.useState(0),
    impactCount = _c[0],
    setImpactCount = _c[1];
  React.useEffect(
    function () {
      if (props.impactCallback) {
        props.impactCallback(impactCount);
      }
    },
    [impactCount, props]
  );
  var animate = function () {
    var currentTime = performance.now();
    var frameTime = (currentTime - animationRef.current.lastFrameTime) / 1000; // Convert to seconds
    animationRef.current.lastFrameTime = currentTime;

    // Clamp frameTime to prevent huge jumps
    if (frameTime > 1 / 30) {
      frameTime = 1 / 30;
    }

    // Fixed timestep: process in 60fps chunks (0.0166 seconds)
    var fixedTimeStep = 1 / 60; // 60fps
    animationRef.current.accumulatedTime += frameTime;

    // Process multiple steps if needed (for high refresh rates)
    var maxSteps = 10; // Prevent spiral of death
    var steps = 0;
    while (
      animationRef.current.accumulatedTime >= fixedTimeStep &&
      steps < maxSteps
    ) {
      animationRef.current.accumulatedTime -= fixedTimeStep;
      steps++;

      // Calculate movement based on fixed timestep
      var pixelsPerSecond = (props.speed || 5) * 60;
      var delta = pixelsPerSecond * fixedTimeStep; // Always use fixed timestep

      var setPos = function (_a) {
        var containerSpan = _a.containerSpan,
          delta = _a.delta,
          elementSpan = _a.elementSpan,
          prevPos = _a.prevPos,
          toggleRefKey = _a.toggleRefKey;
        var parentBoundary = containerSpan - elementSpan;
        var positionInRange = Math.min(Math.max(prevPos, 0), parentBoundary);
        if (positionInRange >= parentBoundary) {
          animationRef.current[toggleRefKey] = true;
          animationRef.current.impactCount =
            animationRef.current.impactCount + 1;
          setImpactCount(animationRef.current.impactCount);
        }
        if (positionInRange <= 0) {
          animationRef.current[toggleRefKey] = false;
          animationRef.current.impactCount =
            animationRef.current.impactCount + 1;
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
          toggleRefKey: "isPosXIncrement",
        });
        var posY = setPos({
          containerSpan: containerHeight,
          delta: delta,
          elementSpan: elementHeight,
          prevPos: animationRef.current.positionY,
          toggleRefKey: "isPosYIncrement",
        });
        elementRef.current.style.transform = "translate3d("
          .concat(posX, "px, ")
          .concat(posY, "px, 0)");
        animationRef.current.positionX = posX;
        animationRef.current.positionY = posY;
      }
    }

    var animationFrameId = requestAnimationFrame(animate);
    animationRef.current.animationFrameId = animationFrameId;
  };
  React.useEffect(
    function () {
      if (props.freezeOnHover) {
        if (hovered) {
          console.log("hello");
          cancelAnimationFrame(animationRef.current.animationFrameId);
          animationRef.current.animationFrameId = 0;
        }
        if (!hovered && !animationRef.current.animationFrameId) {
          animationRef.current.lastFrameTime = performance.now();
          animationRef.current.animationFrameId =
            requestAnimationFrame(animate);
        }
      }
      if (props.hoverCallback) {
        props.hoverCallback();
      }
    },
    [hovered, props]
  );
  React.useEffect(
    function () {
      if (props.freezeOnBool) {
        cancelAnimationFrame(animationRef.current.animationFrameId);
        animationRef.current.animationFrameId = 0;
      } else {
        // Only start if not already running
        if (!animationRef.current.animationFrameId) {
          animationRef.current.lastFrameTime = performance.now();
          animationRef.current.accumulatedTime = 0; // Reset accumulator
          animationRef.current.animationFrameId =
            requestAnimationFrame(animate);
        }
      }

      if (props.hoverCallback) {
        props.hoverCallback();
      }
    },
    [props.freezeOnBool] // Only depend on freezeOnBool, not all props
  );
  var handleMouseOver = function () {
    setHovered(true);
  };
  var handleMouseOut = function () {
    setHovered(false);
  };
  React.useLayoutEffect(
    function () {
      if (animationRef.current && elementRef.current) {
        elementRef.current.style.willChange = "transform";
        elementRef.current.onmouseover = handleMouseOver;
        elementRef.current.onmouseout = handleMouseOut;
        animationRef.current.lastFrameTime = performance.now();
        animationRef.current.animationFrameId = requestAnimationFrame(animate);
      }
      return function () {
        var _a, _b;
        (_a = elementRef.current) === null || _a === void 0
          ? void 0
          : _a.removeEventListener("mouseover", handleMouseOut);
        (_b = elementRef.current) === null || _b === void 0
          ? void 0
          : _b.removeEventListener("mouseout", handleMouseOver);
        cancelAnimationFrame(animationRef.current.animationFrameId);
      };
    },
    [animationRef, elementRef]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "style",
      null,
      "."
        .concat(hashedClassName, " {\n          width: ")
        .concat(
          !props.className && props.width ? props.width : "inherit",
          ";\n          height: "
        )
        .concat(
          !props.className && props.height ? props.height : "inherit",
          ";\n        }"
        )
    ),
    React.createElement(
      "div",
      {
        ref: containerRef,
        className: "".concat(hashedClassName, " ").concat(props.className),
        style: __assign({}, props.styles),
      },
      React.cloneElement(props.children, {
        ref: elementRef,
      })
    )
  );
}
//# sourceMappingURL=DvdScreensaver.js.map
