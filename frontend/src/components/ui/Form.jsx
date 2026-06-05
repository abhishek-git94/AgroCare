import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={className} {...props} />
));

Label.displayName = "Label";
