import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex items-center px-2 py-2 text-sm rounded cursor-pointer",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  ),
);

export const ContextMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  ),
);

export const ContextMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-lg",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  ),
);

export const ContextMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center px-2 py-2 text-sm rounded cursor-pointer hover:bg-gray-100",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

export const ContextMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex items-center py-2 pl-8 pr-2 text-sm rounded hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </ContextMenuPrimitive.CheckboxItem>
  ),
);

export const ContextMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex items-center py-2 pl-8 pr-2 text-sm rounded hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-3 w-3 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </ContextMenuPrimitive.RadioItem>
  ),
);

export const ContextMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-2 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

export const ContextMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  ),
);

export function ContextMenuShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs text-gray-500", className)}
      {...props}
    />
  );
}
