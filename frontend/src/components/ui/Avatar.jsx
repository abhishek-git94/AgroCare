import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

function Avatar({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Root
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

function AvatarImage({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Image
      className={`aspect-square h-full w-full ${className}`}
      {...props}
    />
  );
}

function AvatarFallback({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Fallback
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
