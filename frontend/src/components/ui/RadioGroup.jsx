import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
});

RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-4 w-4 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator>
        <Circle className="h-3 w-3 fill-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
