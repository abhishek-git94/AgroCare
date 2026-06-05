import React from "react";

const Breadcrumb = React.forwardRef(({ className = "", ...props }, ref) => (
  <nav
    ref={ref}
    className={`breadcrumb ${className}`}
    aria-label="Breadcrumb"
    {...props}
  />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = React.forwardRef(({ className = "", ...props }, ref) => (
  <span ref={ref} className={`breadcrumb-item ${className}`} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(({ className = "", ...props }, ref) => (
  <a ref={ref} className={`breadcrumb-link ${className}`} {...props} />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink };
