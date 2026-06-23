import React from 'react';

interface NeonBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverOnly?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isDragging?: boolean;
  overlay?: React.ReactNode;
  fitContent?: boolean;
  alwaysOn?: boolean;
  rarityColor?: string;
  children: React.ReactNode;
}

const NeonBorder = React.forwardRef<HTMLDivElement, NeonBorderProps>(
  (
    {
      className = '',
      children,
      hoverOnly = true,
      backgroundColor,
      borderRadius = 0.5,
      isDragging = false,
      overlay,
      fitContent = false,
      alwaysOn = false,
      rarityColor,
      style,
      ...rest
    },
    ref,
  ) => {
    const stateClass =
      isDragging || alwaysOn
        ? 'neon-border-always'
        : hoverOnly
          ? 'neon-border-hover'
          : 'neon-border-always';

    return (
      <div
        ref={ref}
        className={[
          'neon-border-wrapper',
          stateClass,
          'neon-border-tight',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          {
            '--neon-border-radius': `${borderRadius}rem`,
            '--neon-bg-color': backgroundColor,
            '--neon-rarity-color': rarityColor,
            '--neon-content-width': fitContent ? 'auto' : '100%',
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        <div className="neon-border-content">{children}</div>
        {overlay}
      </div>
    );
  },
);

NeonBorder.displayName = 'NeonBorder';
export { NeonBorder };