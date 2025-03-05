import * as React from "react";

import { cn } from "@/lib/utils";

type CardVariant = "default" | "transparent";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-card border",
      transparent:
        "bg-card-transparent backdrop-blur-sm border border-muted/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full sm:w-auto md:w-auto sm:rounded-[40px] text-card-foreground mb-14",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

interface CardComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
