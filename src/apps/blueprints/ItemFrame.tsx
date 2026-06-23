import React, { useMemo } from 'react';

const RARITY_COLORS: Record<string, string> = {
  Legendary: '#ffc600',
  Epic: '#cc3099',
  Rare: '#00a8f2',
  Uncommon: '#26bf57',
  Common: '#6c6c6c',
};

const CATEGORY_ICON_BASE = '/icons/items/category/';

const CATEGORY_ICONS: Record<string, string> = {
  'Quick Use': 'Icon_QuickUse.png',
  'Quick use': 'Icon_QuickUse.png',
  Consumable: 'Icon_QuickUse.png',
  Gadget: 'Icon_Gadget.png',
  Utility: 'Icon_Utility.png',
  'Topside Material': 'Icon_Material.png',
  'Refined Material': 'Icon_Material.png',
  'Basic Material': 'Icon_Material.png',
  'Advanced Material': 'Icon_Material.png',
  Recyclable: 'Icon_Material.png',
  Material: 'Icon_Material.png',
  Refinement: 'Icon_Material.png',
  Nature: 'Icon_Nature.png',
  Healing: 'Icon_Regenerative.png',
  Medical: 'Icon_Medical.png',
  Regenerative: 'Icon_Regenerative.png',
  Weapon: 'Icon_Weapon.png',
  Modification: 'Icon_WeaponMod.png',
  Mods: 'Icon_WeaponMod.png',
  WeaponMod: 'Icon_WeaponMod.png',
  Attachment: 'Icon_WeaponMod.png',
  Ammunition: 'Icon_Ammo.png',
  Ammo: 'Icon_Ammo.png',
  Shield: 'Icon_Shield.png',
  Augment: 'Icon_Augment.png',
  Grenade: 'Icon_Grenade.png',
  Trap: 'Icon_Trap.png',
  Throwable: 'Icon_Grenade.png',
  Key: 'Icon_Key.png',
  Trinket: 'Icon_Trinket.png',
  'Quest Item': 'Icon_Key.png',
  Blueprint: 'Icon_Misc.png',
  Cosmetic: 'Icon_Trinket.png',
  Misc: 'Icon_Misc.png',
  Miscellaneous: 'Icon_Misc.png',
};

const FALLBACK_CATEGORY_ICON = 'Icon_AllItems.png';

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
  xl: 96,
} as const;

type ItemFrameSize = keyof typeof SIZE_MAP;

interface ItemFrameItem {
  name: string;
  rarity?: string;
  icon?: string | null;
  item_type?: string;
  category?: string;
}

interface ItemFrameProps {
  item: ItemFrameItem;
  quantity?: number;
  size?: ItemFrameSize;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  disableHover?: boolean;
  showBottomBar?: boolean;
  showNameBar?: boolean;
  displayName?: string;
  showItemName?: boolean;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function getRarityColor(rarity?: string) {
  return RARITY_COLORS[rarity || 'Common'] || RARITY_COLORS.Common;
}

function getCategoryIcon(type?: string) {
  return `${CATEGORY_ICON_BASE}${type ? CATEGORY_ICONS[type] || FALLBACK_CATEGORY_ICON : FALLBACK_CATEGORY_ICON}`;
}

export const ItemFrame = React.forwardRef<HTMLDivElement, ItemFrameProps>(
  (
    {
      item,
      quantity,
      size = 'md',
      className,
      onClick,
      disableHover = false,
      showBottomBar = true,
      showNameBar = false,
      displayName,
      showItemName = false,
    },
    ref,
  ) => {
    const frameSize = SIZE_MAP[size];
    const rarityColor = getRarityColor(item.rarity || 'Common');
    const itemType = item.item_type || item.category || '';
    const categoryIcon = getCategoryIcon(itemType);
    const hasQuantity = quantity !== undefined && quantity > 0;
    const gradientId = useMemo(
      () => `if-${Math.random().toString(36).substring(2, 11)}`,
      [],
    );

    const label = displayName || item.name;
    const shortLabel = label.length > 10 ? `${label.substring(0, 9)}…` : label;

    return (
      <div
        ref={ref}
        className={cn(
          'relative block leading-none',
          'transition-all duration-200',
          onClick && 'cursor-pointer',
          onClick && !disableHover && 'group/frame hover:brightness-110',
          className,
        )}
        style={{ width: frameSize, height: frameSize }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }
            : undefined
        }
      >
        {showNameBar && (
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: 'url(/icons/blueprints/blueprint-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 0.082 * frameSize,
            }}
          />
        )}

        <svg
          width={frameSize}
          height={frameSize}
          viewBox="0 0 96 96"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <defs>
            <linearGradient
              id={`bg-gradient-${gradientId}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="96"
              x2="95.375"
              y2="0.625"
            >
              <stop offset="0" style={{ stopColor: rarityColor, stopOpacity: 0.5 }} />
              <stop offset="1" style={{ stopColor: rarityColor, stopOpacity: 0 }} />
            </linearGradient>

            <linearGradient
              id={`border-gradient-${gradientId}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="96"
              x2="95.375"
              y2="0.625"
            >
              <stop offset="0" style={{ stopColor: rarityColor, stopOpacity: 1 }} />
              <stop offset="1" style={{ stopColor: rarityColor, stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>

          {!showNameBar && (
            <rect
              x="0.625"
              y="0.625"
              width="94.75"
              height="94.75"
              rx="7.91"
              ry="7.91"
              fill="#0b0e1b"
            />
          )}

          {!showNameBar && (
            <rect
              x="0.625"
              y="0.625"
              width="94.75"
              height="94.75"
              rx="7.91"
              ry="7.91"
              fill={`url(#bg-gradient-${gradientId})`}
            />
          )}

          {showBottomBar && (
            <path
              d="M 0.625,71.980469 V 87.4628906 C 0.625,91.846083 4.1539194,95.375 8.5371094,95.375 H 87.462891 c 4.383192,0 7.912109,-3.528917 7.912109,-7.9121094 V 71.980469 Z"
              fill="#0b0e1b"
            />
          )}

          {!showNameBar && showBottomBar && (
            <path
              d="M 45.167793,71.980469 H 50.832207 1.2287736 v -32.987308 c 0,0 7.3939389,32.987308 43.9390194,32.987308 z"
              fill={rarityColor}
            />
          )}

          <rect
            x="0.625"
            y="0.625"
            width="94.75"
            height="94.75"
            rx="7.91"
            ry="7.91"
            fill="none"
            stroke={`url(#border-gradient-${gradientId})`}
            strokeWidth="1.25"
          />

          {showBottomBar && !showNameBar && !showItemName && hasQuantity && (
            <text
              x="90"
              y="88"
              textAnchor="end"
              fill="white"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
              fontSize="12"
            >
              <tspan fontSize="9">x</tspan>
              {quantity}
            </text>
          )}

          {showBottomBar && showItemName && hasQuantity && (
            <text
              x="91"
              y="87"
              textAnchor="end"
              fill="white"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
              fontSize="11"
            >
              <tspan fontSize="8">x</tspan>
              {quantity}
            </text>
          )}

          {showBottomBar && showItemName && (
            <text
              x="22"
              y="86"
              textAnchor="start"
              fill="#fff"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
              fontSize="9"
            >
              {shortLabel}
            </text>
          )}

          {showNameBar && (
            <text
              x="26"
              y="86"
              textAnchor="start"
              fill="#fff"
              fontFamily="system-ui, sans-serif"
              fontWeight="400"
              fontSize="9"
            >
              {shortLabel}
            </text>
          )}
        </svg>

        {item.icon ? (
          <img
            src={item.icon}
            alt={item.name}
            className="absolute pointer-events-none"
            style={{
              width: 0.726 * frameSize,
              height: 0.726 * frameSize,
              left: 0.137 * frameSize,
              top: showBottomBar || showNameBar ? 0.01 * frameSize : 0.137 * frameSize,
              objectFit: 'contain',
              filter: 'none',
            }}
            loading="lazy"
          />
        ) : (
          <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              width: 0.726 * frameSize,
              height: 0.726 * frameSize,
              left: 0.137 * frameSize,
              top: showBottomBar || showNameBar ? 0.01 * frameSize : 0.137 * frameSize,
            }}
          >
            <span className="text-beige">?</span>
          </div>
        )}

        {showBottomBar && !showNameBar && !showItemName && (
          <img
            src={categoryIcon}
            alt={itemType || 'item'}
            className="absolute pointer-events-none"
            style={{
              width: 0.156 * frameSize,
              height: 0.156 * frameSize,
              left: 0.059 * frameSize,
              bottom: 0.051 * frameSize,
              objectFit: 'contain',
              filter: 'brightness(1.3)',
              opacity: 0.95,
            }}
            loading="lazy"
          />
        )}

        {showBottomBar && showItemName && (
          <img
            src={categoryIcon}
            alt={itemType || 'item'}
            className="absolute pointer-events-none"
            style={{
              width: 0.156 * frameSize,
              height: 0.156 * frameSize,
              left: 0.052 * frameSize,
              bottom: 0.042 * frameSize,
              objectFit: 'contain',
              filter: 'brightness(1.3)',
              opacity: 0.95,
            }}
            loading="lazy"
          />
        )}

        {showNameBar && (
          <img
            src="/icons/items/category/Icon_Blueprint.png"
            alt="blueprint"
            className="absolute pointer-events-none"
            style={{
              width: 0.156 * frameSize,
              height: 0.156 * frameSize,
              left: 0.059 * frameSize,
              bottom: 0.051 * frameSize,
              objectFit: 'contain',
              filter: 'brightness(1.3)',
              opacity: 0.95,
            }}
            loading="lazy"
          />
        )}
      </div>
    );
  },
);

ItemFrame.displayName = 'ItemFrame';