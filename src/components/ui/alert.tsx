"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-red-500/50 text-red-700 dark:border-red-500 [&>svg]:text-red-600 bg-red-50 dark:bg-red-950/50",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600 bg-green-50 dark:bg-green-950/50",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50",
        info:
          "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-950/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertIcon = ({ variant }: { variant: "destructive" | "success" | "warning" | "info" }) => {
  const iconMap = {
    destructive: XCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
  }
  
  const Icon = iconMap[variant]
  return <Icon className="h-4 w-4" />
}

export { Alert, AlertTitle, AlertDescription, AlertIcon }
