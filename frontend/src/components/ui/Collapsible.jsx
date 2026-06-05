import React from "react";

const Collapsible = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`collapsible ${className}`} {...props} />
));
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`collapsible-trigger ${className}`}
      {...props}
    />
  ),
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`collapsible-content ${className}`} {...props} />
  ),
);
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
