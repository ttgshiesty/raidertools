/**
 * NeonBorder.tsx
 *
 * Renders the animated neon-glow border used on every blueprint card.
 * The border is a CSS conic-gradient that spins continuously on hover
 * (or always, when `alwaysOn` is true).  The rarity colour is injected
 * as a CSS custom property so each card gets its own tint.
 *
 * Usage:
 *   <NeonBorder rarityColor="#a855f7" alwaysOn={false}>
 *     <div style={{ width: 80, height: 80 }}>…</div>
 *   </NeonBorder>
 */

import React from 'react';

interface NeonBorderProps {
  /** Hex / rgb colour that matches the blueprint's rarity */
  rarityColor?: string;
  /** When true the animation plays continuously; when false only on hover */
  alwaysOn?: boolean;
  /** Extra class names forwarded to the wrapper */
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title?: string;
}

const NeonBorder = React.forwardRef<HTMLDivElement, NeonBorderProps>(
  (
    {
      rarityColor = '#6b7280',
      alwaysOn = false,
      className = '',
      children,
      style,
      onClick,
      title,
    },
    ref,
  ) => {
    const wrapperClass = [
      'neon-border-wrapper',
      'neon-border-tight',
      alwaysOn ? 'neon-border-always' : 'neon-border-hover',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={wrapperClass}
        style={
          {
            '--neon-border-radius': '0.5rem',
            '--neon-bg-color': '#1a1a1a',
            '--neon-rarity-color': rarityColor,
            '--neon-content-width': 'auto',
            ...style,
          } as React.CSSProperties
        }
        onClick={onClick}
        title={title}
      >
        <div className="neon-border-content">{children}</div>
      </div>
    );
  },
);

NeonBorder.displayName = 'NeonBorder';
export { NeonBorder };
