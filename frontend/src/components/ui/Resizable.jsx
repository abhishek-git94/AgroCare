import { GripVertical } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

import { cn } from "../../lib/utils";

export function ResizablePanelGroup({ className, ...props }) {
  return (
    <PanelGroup className={cn("flex h-full w-full", className)} {...props} />
  );
}

export const ResizablePanel = Panel;

export function ResizableHandle({ withHandle, className, ...props }) {
  return (
    <PanelResizeHandle
      className={cn(
        "relative flex w-1 items-center justify-center bg-gray-200",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="flex h-5 w-5 items-center justify-center rounded border bg-white shadow">
          <GripVertical className="h-3 w-3" />
        </div>
      )}
    </PanelResizeHandle>
  );
}
