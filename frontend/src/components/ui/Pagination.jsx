import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../../lib/utils";

export function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export const PaginationContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  ),
);

export const PaginationItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  ),
);

export function PaginationLink({ className, isActive, ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        `inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm transition-colors
        ${isActive ? "border bg-white text-black" : "hover:bg-gray-100"}`,
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Previous Page"
      className={cn("gap-1 pl-2.5 flex items-center", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Next Page"
      className={cn("gap-1 pr-2.5 flex items-center", className)}
      {...props}
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
    </span>
  );
}
