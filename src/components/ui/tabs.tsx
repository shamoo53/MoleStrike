import * as React from "react";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className = "", defaultValue, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full ${className}`}
        data-default-value={defaultValue}
        {...props}
      />
    );
  }
);

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    />
  );
});

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className = "", value, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
      data-value={value}
      {...props}
    />
  );
});

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className = "", value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        data-value={value}
        {...props}
      />
    );
  }
);
