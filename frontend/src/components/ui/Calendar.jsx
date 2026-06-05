import React from "react";

const Calendar = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    type="date"
    className={`calendar-input rounded border px-3 py-2 ${className}`}
    {...props}
  />
));
Calendar.displayName = "Calendar";

export { Calendar };
