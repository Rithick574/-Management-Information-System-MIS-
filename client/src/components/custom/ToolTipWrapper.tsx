import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../ui/tooltip";
  
  export function ToolTipWrapper({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }