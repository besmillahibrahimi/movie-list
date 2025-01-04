"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const ToastVaraints = cva(
  "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "group-[.toaster]:bg-destructive/70 group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
        success:
          "group-[.toaster]:bg-primary/70 group-[.toaster]:text-primary-foreground group-[.toaster]:border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type ToasterProps = React.ComponentProps<typeof Sonner> & VariantProps<typeof ToastVaraints>;

const Toaster = ({ variant, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          error: ToastVaraints({ variant: "destructive" }),
          success: ToastVaraints({ variant: "success" }),

          toast: ToastVaraints({ variant }),
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
