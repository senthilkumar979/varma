import { cn } from "@/utils/tw-utils";
import React from "react";
import type { BannerProps } from "./Banner.types";
import {
  bannerContentVariants,
  bannerDismissIconVariants,
  bannerDismissVariants,
  bannerVariants,
} from "./Banner.variants";

function Grid({
  cellSize = 12,
  strokeWidth = 1,
  patternOffset = [0, 0],
  className,
}: {
  cellSize?: number;
  strokeWidth?: number;
  patternOffset?: [number, number];
  className?: string;
}) {
  const id = React.useId();

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 text-black/10",
        className
      )}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={`grid-${id}`}
          x={patternOffset[0] - 1}
          y={patternOffset[1] - 1}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect fill={`url(#grid-${id})`} width="100%" height="100%" />
    </svg>
  );
}

export function Banner({
  show = true,
  onDismiss,
  variant = "info",
  icon,
  title,
  children,
  dismissible = false,
  dismissText,
  showGrid = false,
  className,
  contentClassName,
  dismissClassName,
}: BannerProps) {
  if (!show) return null;

  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      {showGrid && (
        <Grid
          cellSize={13}
          patternOffset={[0, -1]}
          className="text-black/30 mix-blend-overlay [mask-image:linear-gradient(to_right,black,transparent)] md:[mask-image:linear-gradient(to_right,black_60%,transparent)]"
        />
      )}

      <div className={cn(bannerContentVariants({ variant }), contentClassName)}>
        {icon && <span className="flex-shrink-0">{icon}</span>}

        <div className="flex-1">
          {title && <div className="font-medium mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
      </div>

      {dismissible && onDismiss && (
        <button
          type="button"
          className={cn(bannerDismissVariants({ variant }), dismissClassName)}
          onClick={onDismiss}
          aria-label="Dismiss banner"
        >
          {dismissText ? (
            dismissText
          ) : (
            <svg
              className={cn(bannerDismissIconVariants({ variant }))}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
