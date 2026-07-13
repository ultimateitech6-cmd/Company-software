import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className, size = 24 }: LucideIconProps) {
  const IconComponent = (Icons as unknown as Record<
    string,
    React.ComponentType<{ className?: string; size?: number }>
  >)[name];

  if (!IconComponent) {
    // Return a default icon if not found
    const HelpIcon = Icons.HelpCircle;
    return <HelpIcon className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
