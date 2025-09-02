
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { motion, AnimatePresence } from "framer-motion"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// Animate the content when it's opened/closed
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & {
    forceMount?: boolean;
  }
>(({ children, forceMount, ...props }, ref) => {
  // Use optional chaining to safely access the open property
  // from CollapsiblePrimitive.CollapsibleContentProps
  const isOpen = (props as { open?: boolean }).open || forceMount;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <CollapsiblePrimitive.Content
          ref={ref}
          {...props}
          asChild
        >
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        </CollapsiblePrimitive.Content>
      )}
    </AnimatePresence>
  );
})
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
