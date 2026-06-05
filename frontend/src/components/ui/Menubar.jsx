import React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

export function Menubar(props) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        "flex h-9 items-center space-x-1 rounded-md border bg-white p-1 shadow-sm",
      )}
      {...props}
    />
  );
}

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
export const MenubarSub = MenubarPrimitive.Sub;

export const MenubarTrigger = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-3 py-1 text-sm",
        className,
      )}
      {...props}
    />
  ),
);

export const MenubarContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[12rem] rounded-md border bg-white p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);

export const MenubarItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm hover:bg-gray-100",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

export const MenubarLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

export const MenubarSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  ),
);

export const MenubarCheckboxItem = React.forwardRef(
  ({ children, checked, className, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn("relative flex items-center pl-8 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <Check size={16} />
        </MenubarPrimitive.ItemIndicator>
      </span>

      {children}
    </MenubarPrimitive.CheckboxItem>
  ),
);

export const MenubarRadioItem = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn("relative flex items-center pl-8 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <Circle size={14} fill="currentColor" />
        </MenubarPrimitive.ItemIndicator>
      </span>

      {children}
    </MenubarPrimitive.RadioItem>
  ),
);

export const MenubarSubTrigger = React.forwardRef(
  ({ children, className, inset, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex items-center px-2 py-2 text-sm",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight size={16} className="ml-auto" />
    </MenubarPrimitive.SubTrigger>
  ),
);

export const MenubarSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
        className,
      )}
      {...props}
    />
  ),
);

export function MenubarShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs text-gray-500", className)}
      {...props}
    />
  );
}
