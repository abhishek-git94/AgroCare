import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

function Checkbox({ className = "", ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={`
        grid place-content-center
        h-4 w-4
        rounded-sm
        border
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-content-center">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default Checkbox;
