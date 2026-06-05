import { Toaster as Sonner } from "sonner";

export function Toaster(props) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-white text-black border shadow-lg",
          description: "text-gray-500",
          actionButton: "bg-green-600 text-white",
          cancelButton: "bg-gray-200 text-black",
        },
      }}
      {...props}
    />
  );
}
