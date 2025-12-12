import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Toast Provider
const ToastProvider = ToastPrimitives.Provider;

// Viewport (where toasts appear)
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport asChild ref={ref} {...props}>
    <motion.div
      className={cn(
        "fixed bottom-4 right-4 z-[100] flex flex-col gap-3 p-2 w-[380px] max-w-full sm:w-[420px]",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  </ToastPrimitives.Viewport>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// Toast variants (premium Apple style)
const toastVariants = cva(
  "group relative flex w-full items-start justify-between rounded-2xl border p-4 shadow-lg bg-black transition-all " +
    "hover:scale-[1.02] hover:shadow-2xl",
  {
    variants: {
      variant: {
        default: "border border-white/10 bg-white/5 text-white",
        destructive: "border border-red-400 bg-red-600 text-white",
        success: "border border-green-400 bg-green-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Toast Root
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root asChild ref={ref} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={cn(toastVariants({ variant }), className)}
      >
        {variant === "success" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-4 top-4 rounded-full bg-green-500 p-1"
          >
            <Check className="h-5 w-5 text-white animate-checkmark" />
          </motion.div>
        )}
        {variant === "destructive" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-4 top-4 rounded-full bg-red-500 p-1"
          >
            <AlertCircle className="h-5 w-5 text-white" />
          </motion.div>
        )}
        <div className="pl-10">{props.children}</div>
      </motion.div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

// Toast Action
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-xl border border-white/20 px-3 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

// Toast Close
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-white/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// Toast Title
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

// Toast Description
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// ✅ Success tick animation
const ToastSuccessTick = () => (
  <span className="ml-1 inline-block w-5 h-5">
    <Check className="w-5 h-5 text-white animate-checkmark" />
    <style>{`
      @keyframes checkmark {
        0% { stroke-dashoffset: 20; opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
        100% { stroke-dashoffset: 0; transform: scale(1); }
      }
      .animate-checkmark {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: checkmark 0.5s ease-out forwards;
      }
    `}</style>
  </span>
);

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastSuccessTick,
};
