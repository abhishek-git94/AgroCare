import React from "react";

const Slider = React.forwardRef(({ className = "", ...props }, ref) => (
  <input ref={ref} type="range" className={`slider ${className}`} {...props} />
));
Slider.displayName = "Slider";

export { Slider };
