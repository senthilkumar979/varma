import * as React from "react";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  endIcon?: React.ReactNode;
  helperText?: string;
  isError?: boolean;
}
