import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={`fixed inset-0 z-50 bg-black/80 ${className}`}
      {...props}
    />
  ),
);

const AlertDialogContent = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ${className}`}
        {...props}
      />
    </AlertDialogPortal>
  ),
);

const AlertDialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
    {...props}
  />
);

const AlertDialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
);

const AlertDialogTitle = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold ${className}`}
      {...props}
    />
  ),
);

const AlertDialogDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  ),
);

const AlertDialogAction = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={`px-4 py-2 rounded bg-green-600 text-white ${className}`}
      {...props}
    />
  ),
);

const AlertDialogCancel = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={`px-4 py-2 rounded border mt-2 sm:mt-0 ${className}`}
      {...props}
    />
  ),
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
