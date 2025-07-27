import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {
  /**
   * Optional CSS class name to apply to the label
   */
  className?: string;
  /**
   * The content to display inside the label
   */
  children?: React.ReactNode;

  isMandatory?: boolean;
}
