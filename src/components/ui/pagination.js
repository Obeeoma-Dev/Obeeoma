import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
// FIXED: Import `buttonVariants` from its correct source
import { buttonVariants } from "@/components/ui/button.styles";
// Pagination root component: wraps the entire pagination UI
function Pagination({ className, ...props }) {
  return _jsx("nav", {
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props,
  });
}
// Container for pagination items (e.g., links, arrows)
function PaginationContent({ className, ...props }) {
  return _jsx("ul", {
    "data-slot": "pagination-content",
    className: cn("flex flex-row items-center gap-1 list-none", className),
    ...props,
  });
}
// Individual pagination item wrapper
function PaginationItem({ ...props }) {
  return _jsx("li", { "data-slot": "pagination-item", ...props });
}
// Pagination link component: styled like a button
function PaginationLink({ className, isActive, ...props }) {
  return _jsx("a", {
    "aria-current": isActive ? "page" : undefined,
    "data-slot": "pagination-link",
    "data-active": isActive,
    className: cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size: "icon",
      }),
      className,
    ),
    ...props,
  });
}
// Previous page button
function PaginationPrevious({ className, ...props }) {
  return _jsxs(PaginationLink, {
    "aria-label": "Go to previous page",
    className: cn("gap-1 px-2.5 sm:pl-2.5", className),
    ...props,
    children: [
      _jsx(ChevronLeftIcon, {}),
      _jsx("span", { className: "hidden sm:block", children: "Previous" }),
    ],
  });
}
// Next page button
function PaginationNext({ className, ...props }) {
  return _jsxs(PaginationLink, {
    "aria-label": "Go to next page",
    className: cn("gap-1 px-2.5 sm:pr-2.5", className),
    ...props,
    children: [
      _jsx("span", { className: "hidden sm:block", children: "Next" }),
      _jsx(ChevronRightIcon, {}),
    ],
  });
}
// Ellipsis component for skipped pages
function PaginationEllipsis({ className, ...props }) {
  return _jsxs("span", {
    "aria-hidden": true,
    "data-slot": "pagination-ellipsis",
    className: cn("flex size-9 items-center justify-center", className),
    ...props,
    children: [
      _jsx(MoreHorizontalIcon, { className: "size-4" }),
      _jsx("span", { className: "sr-only", children: "More pages" }),
    ],
  });
}
// ✅ Export only components — ESLint and Fast Refresh happy
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
