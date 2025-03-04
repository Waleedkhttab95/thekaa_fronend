import * as React from "react";

import { cn } from "@/lib/utils";

import { useFormField } from "./form";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className = "", type, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <input
        type={type}
        className={cn(
          "flex h-[42px] w-full rounded-[40px] p-[10px] border border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500 focus-visible:ring-0",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
