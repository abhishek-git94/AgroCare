import React from "react";

const AlertDialog = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`alert-dialog ${className}`} {...props} />
));
AlertDialog.displayName = "AlertDialog";

const AlertDialogTrigger = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`alert-dialog-trigger ${className}`}
      {...props}
    />
  ),
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogContent = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`alert-dialog-content ${className}`} {...props} />
  ),
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className = "", ...props }) => (
  <div className={`alert-dialog-header ${className}`} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className = "", ...props }) => (
  <div className={`alert-dialog-footer ${className}`} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <h2 ref={ref} className={`alert-dialog-title ${className}`} {...props} />
  ),
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`alert-dialog-description ${className}`}
      {...props}
    />
  ),
);
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`alert-dialog-action ${className}`}
      {...props}
    />
  ),
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`alert-dialog-cancel ${className}`}
      {...props}
    />
  ),
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
