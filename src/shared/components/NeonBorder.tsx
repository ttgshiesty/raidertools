import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../shared/utils/cn';

interface NeonBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverOnly?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isDragging?: boolean;
  overlay?: ReactNode;
  fitContent?: boolean;
}

export const NeonBorder = forwardRef<HTMLDivElement, NeonBorderProps>(
  (
    {
      className,
      children,
      hoverOnly = true,
      backgroundColor,
      borderRadius = 0.5,
      isDragging = false,
      overlay,
      fitContent = false,
      style,
      ...props
    },
    ref
  ) => {
    const neonClass = isDragging ? 'neon-border-always' : hoverOnly ? 'neon-border-hover' : 'neon-border-always';

    return (
      <div
        ref={ref}
        className={cn('neon-border-wrapper', neonClass, 'neon-border-tight', className)}
        style={
          {
            '--neon-border-radius': `${borderRadius}rem`,
            '--neon-bg-color': backgroundColor,
            '--neon-content-width': fitContent ? 'auto' : '100%',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="neon-border-content">{children}</div>
        {overlay}
      </div>
    );
  }
);

NeonBorder.displayName = 'NeonBorder';
