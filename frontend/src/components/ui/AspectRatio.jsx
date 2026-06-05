import React from "react";

const AspectRatio = React.forwardRef(
  ({ ratio = 1, className = "", style = {}, ...props }, ref) => (
    <div
      ref={ref}
      className={`aspect-ratio ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  ),
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
