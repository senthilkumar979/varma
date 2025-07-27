import React, { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { RippleButtonProps } from "./RippleButton.types";
import { Button } from "../Button";

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const hexToRgba = (hex: string, alpha: number): string => {
  let hexValue = hex.startsWith("#") ? hex.slice(1) : hex;
  if (hexValue.length === 3) {
    hexValue = hexValue
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Variant color mapping
const getVariantColors = (variant: string) => {
  switch (variant) {
    case "primary":
      return {
        base: "#3b82f6", // blue-500
        ripple: "#1d4ed8", // blue-700
        text: "#ffffff",
      };
    case "secondary":
      return {
        base: "#6b7280", // gray-500
        ripple: "#374151", // gray-700
        text: "#ffffff",
      };
    case "info":
      return {
        base: "#0ea5e9", // sky-500
        ripple: "#0369a1", // sky-700
        text: "#ffffff",
      };
    case "success":
      return {
        base: "#22c55e", // green-500
        ripple: "#15803d", // green-700
        text: "#ffffff",
      };
    case "warning":
      return {
        base: "#f59e0b", // amber-500
        ripple: "#d97706", // amber-600
        text: "#ffffff",
      };
    case "error":
      return {
        base: "#ef4444", // red-500
        ripple: "#dc2626", // red-600
        text: "#ffffff",
      };
    case "dark":
      return {
        base: "#111827", // gray-900
        ripple: "#111827", // gray-900
        text: "#ffffff",
      };
    default:
      return {
        base: "#3b82f6", // blue-500
        ripple: "#1d4ed8", // blue-700
        text: "#ffffff",
      };
  }
};

const GRID_HOVER_NUM_COLS = 36;
const GRID_HOVER_NUM_ROWS = 12;
const GRID_HOVER_TOTAL_CELLS = GRID_HOVER_NUM_COLS * GRID_HOVER_NUM_ROWS;
const GRID_HOVER_RIPPLE_EFFECT_SIZE = "18.973665961em";

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect {
    animation: js-ripple-animation var(--ripple-duration) ease-out forwards;
  }
`;

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "hover",
  variant = "primary",
  rippleColor: userProvidedRippleColor,
  rippleDuration = 600,
  hoverRippleColor: customHoverRippleColor,
  hoverBorderEffectColor,
  hoverBorderEffectThickness = "0.1em",
}) => {
  const [jsRipples, setJsRipples] = useState<RippleState[]>([]);

  // Get colors based on variant
  const variantColors = getVariantColors(variant);
  const defaultHoverRippleColor =
    customHoverRippleColor || variantColors.ripple;
  const defaultHoverBorderEffectColor =
    hoverBorderEffectColor || hexToRgba(variantColors.base, 0.466);

  const determinedJsRippleColor = useMemo(() => {
    if (userProvidedRippleColor) {
      return userProvidedRippleColor;
    }
    return hexToRgba(variantColors.ripple, 0.3);
  }, [userProvidedRippleColor, variantColors.ripple]);

  const dynamicGridHoverStyles = useMemo(() => {
    let nthChildHoverRules = "";
    const cellDim = 0.25;
    const initialTopOffset = 0.125;
    const initialLeftOffset = 0.1875;

    // Standardized hover transition duration for width and height
    const hoverEffectDuration = "1.5s"; // CHANGED: Standardized to 1.5s

    for (let r = 0; r < GRID_HOVER_NUM_ROWS; r++) {
      for (let c = 0; c < GRID_HOVER_NUM_COLS; c++) {
        const childIndex = r * GRID_HOVER_NUM_COLS + c + 1;
        const topPos = initialTopOffset + r * cellDim;
        const leftPos = initialLeftOffset + c * cellDim;

        if (type === "hover") {
          nthChildHoverRules += `
            .hover-variant-grid-cell:nth-child(${childIndex}):hover ~ .hover-variant-visual-ripple {
              top: ${topPos}em; left: ${leftPos}em;
              transition: width ${hoverEffectDuration} ease, height ${hoverEffectDuration} ease, top 0s linear, left 0s linear;
            }`;
        } else if (type === "hoverborder") {
          nthChildHoverRules += `
            .hoverborder-variant-grid-cell:nth-child(${childIndex}):hover ~ .hoverborder-variant-visual-ripple {
              top: ${topPos}em; left: ${leftPos}em;
              transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 0s linear, left 0s linear;
            }`; // Using ease-out for hoverborder as it was before, just changed duration
        }
      }
    }

    if (type === "hover") {
      const actualHoverRippleColor = hexToRgba(defaultHoverRippleColor, 0.9);
      return `
        .hover-variant-visual-ripple {
          background-color: ${actualHoverRippleColor};
          transition: width ${hoverEffectDuration} ease, height ${hoverEffectDuration} ease, top 99999s linear, left 99999s linear;
        }
        .hover-variant-grid-cell:hover ~ .hover-variant-visual-ripple {
          color: white !important;
          width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE};
        }
        ${nthChildHoverRules}
      `;
    } else if (type === "hoverborder") {
      return `
        .hoverborder-variant-ripple-container {
          padding: ${hoverBorderEffectThickness};
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
        }
        .hoverborder-variant-visual-ripple {
          background-color: ${defaultHoverBorderEffectColor};
          /* Ensure the base transition also uses the standardized duration for width/height */
          transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 99999s linear, left 9999s linear;
        }
        .hoverborder-variant-grid-cell:hover ~ .hoverborder-variant-visual-ripple {
          width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE};
        }
        ${nthChildHoverRules}
      `;
    }
    return "";
  }, [
    type,
    defaultHoverRippleColor,
    defaultHoverBorderEffectColor,
    hoverBorderEffectThickness,
  ]);

  const createJsRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 0.5;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple: RippleState = {
      key: Date.now(),
      x,
      y,
      size,
      color: determinedJsRippleColor,
    };
    setJsRipples((prev) => [...prev, newRipple]);
    // Use the same duration as the CSS animation
    setTimeout(() => {
      setJsRipples((currentRipples) =>
        currentRipples.filter((r) => r.key !== newRipple.key)
      );
    }, rippleDuration);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createJsRipple(event);
      if (onClick) onClick(event);
    }
  };

  const jsRippleElements = (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      {jsRipples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute rounded-full animate-js-ripple-effect"
          style={
            {
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: ripple.color,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );

  if (type === "hover") {
    const hoverButtonFinalClassName = [
      "relative",
      "rounded-md",
      "h-9 px-4 py-2 has-[>svg]:px-3",
      "bg-transparent",
      "isolate",
      "overflow-hidden",
      "cursor-pointer",
      "border",
      "hover:text-white",
      "border-solid",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
        <style dangerouslySetInnerHTML={{ __html: dynamicGridHoverStyles }} />
        <Button
          variant={"ripple"}
          className={hoverButtonFinalClassName}
          onClick={handleButtonClick}
          disabled={disabled}
          style={{
            borderColor: variantColors.ripple,
            ["--ripple-duration" as string]: `${rippleDuration}ms`,
          }}
        >
          <span className="relative z-[10] pointer-events-none">
            {children}
          </span>
          {jsRippleElements}
          <div
            className="hover-variant-grid-container absolute inset-0 grid overflow-hidden pointer-events-none z-[0]"
            style={{
              gridTemplateColumns: `repeat(${GRID_HOVER_NUM_COLS}, 0.25em)`,
            }}
          >
            {Array.from({ length: GRID_HOVER_TOTAL_CELLS }, (_, index) => (
              <span
                key={index}
                className="hover-variant-grid-cell relative flex justify-center items-center pointer-events-auto"
              />
            ))}
            <div className="hover-variant-visual-ripple pointer-events-none absolute w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
          </div>
        </Button>
      </>
    );
  }

  if (type === "hoverborder") {
    const hoverBorderButtonFinalClassName = [
      "relative",
      "rounded-md",
      "h-9 px-4 py-2 has-[>svg]:px-3",
      "bg-transparent",
      "isolate",
      "cursor-pointer",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
        <style dangerouslySetInnerHTML={{ __html: dynamicGridHoverStyles }} />
        <Button
          variant={"ripple"}
          className={hoverBorderButtonFinalClassName}
          onClick={handleButtonClick}
          disabled={disabled}
          style={{
            ["--ripple-duration" as string]: `${rippleDuration}ms`,
          }}
        >
          <span className="relative z-[10] pointer-events-none">
            {children}
          </span>
          {jsRippleElements}
          <div
            className="hoverborder-variant-ripple-container absolute inset-0 grid rounded-[0.8em] overflow-hidden pointer-events-none z-[0]"
            style={{
              gridTemplateColumns: `repeat(${GRID_HOVER_NUM_COLS}, 0.25em)`,
            }}
          >
            {Array.from({ length: GRID_HOVER_TOTAL_CELLS }, (_, index) => (
              <span
                key={index}
                className="hoverborder-variant-grid-cell relative flex justify-center items-center pointer-events-auto"
              />
            ))}
            <div className="hoverborder-variant-visual-ripple pointer-events-none absolute w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
          </div>
        </Button>
      </>
    );
  }

  // Default hover type (when no type is specified)
  const defaultHoverButtonFinalClassName = [
    "relative",
    "rounded-md",
    "h-9 px-4 py-2 has-[>svg]:px-3",
    "bg-transparent",
    "isolate",
    "overflow-hidden",
    "cursor-pointer",
    "border",
    "hover:text-white",
    "border-solid",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
      <style dangerouslySetInnerHTML={{ __html: dynamicGridHoverStyles }} />
      <Button
        variant={"ripple"}
        className={defaultHoverButtonFinalClassName}
        onClick={handleButtonClick}
        disabled={disabled}
        style={{
          borderColor: variantColors.ripple,
        }}
      >
        <span className="relative z-[10] pointer-events-none">{children}</span>
        {jsRippleElements}
        <div
          className="hover-variant-grid-container absolute inset-0 grid overflow-hidden pointer-events-none z-[0]"
          style={{
            gridTemplateColumns: `repeat(${GRID_HOVER_NUM_COLS}, 0.25em)`,
          }}
        >
          {Array.from({ length: GRID_HOVER_TOTAL_CELLS }, (_, index) => (
            <span
              key={index}
              className="hover-variant-grid-cell relative flex justify-center items-center pointer-events-auto"
            />
          ))}
          <div className="hover-variant-visual-ripple pointer-events-none absolute w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
        </div>
      </Button>
    </>
  );
};

export { RippleButton };
