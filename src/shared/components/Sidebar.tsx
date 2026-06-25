import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useCognitoAuth } from '../context/CognitoAuthContext';
import { assetUrl } from '../../data/assetUrl';
import { trackNavigation } from '../utils/analytics';

const NAV_ITEMS = [
  { path: "/", icon: "trends.webp", labelKey: "shared.tools.home" },
  {
    path: "/schedule",
    icon: "bombardier.png",
    labelKey: "shared.tools.schedule"
  },
  {
    path: "/craft-calculator",
    icon: "matriarch256.png",
    labelKey: "shared.tools.craftCalculator"
  },
  { path: "/quests", icon: "bison_mf.png", labelKey: "shared.tools.quests" },
  {
    path: "/loot-helper",
    icon: "tick_mf.png",
    labelKey: "shared.tools.lootHelper"
  },
  {
    path: "/quartermaster",
    icon: "wasp_mf.png",
    labelKey: "shared.tools.quartermaster"
  },
  {
    path: "/stats",
    icon: "rocketeer_mf.png",
    labelKey: "shared.tools.stats"
  },
  {
    path: "/blueprints",
    icon: "firefly_mf.png",
    labelKey: "shared.tools.blueprints"
  },
  {
    path: "/market",
    icon: "pop256.png",
    labelKey: "shared.tools.market"
  },
  {
    path: "/skill-tree",
    icon: "trends.webp",
    labelKey: "shared.tools.skillTree"
  }
];

const BOTTOM_NAV_ITEM = {
  path: '/profile',
  icon: 'hornet_mf.png',
  labelKey: 'shared.sidebar.profile',
};

const SIDEBAR_STORAGE_KEY = 'shiesty:sidebar-collapsed';

export function Sidebar() {
  const { t } = useLocale();
  const cognito = useCognitoAuth();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      console.error('Failed to load sidebar state:', e);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(collapsed));
    } catch (e) {
      console.error('Failed to save sidebar state:', e);
    }
  }, [collapsed]);

  return (
    <div className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <h2 className="sidebar-title">{t('shared.sidebar.title')}</h2>
        )}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={
            collapsed
              ? t('shared.sidebar.expand')
              : t('shared.sidebar.collapseTitle')
          }
        >
          <img
            src={assetUrl(
              `/arcicon/${collapsed ? 'rocketeer_mf.png' : 'bastion_mf.png'}`,
            )}
            alt={collapsed ? 'Expand' : 'Collapse'}
            className="sidebar-toggle-icon"
            width="16"
            height="16"
          />
          {!collapsed && (
            <span className="sidebar-toggle-text">
              {t('shared.sidebar.collapse')}
            </span>
          )}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {NAV_ITEMS.map((item) => {
            const label = t(item.labelKey);
            return (
              <li key={item.path} className="sidebar-nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  title={collapsed ? label : undefined}
                  onClick={() => trackNavigation(label, 'sidebar')}
                >
                  <img
                    src={assetUrl(`/arcicon/${item.icon}`)}
                    alt={label}
                    className="sidebar-nav-icon"
                    width="18"
                    height="18"
                  />
                  {!collapsed && (
                    <span className="sidebar-nav-text">{label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {cognito.user && (
          <ul className="sidebar-nav-list sidebar-nav-list--bottom">
            {(() => {
              const label = t(BOTTOM_NAV_ITEM.labelKey);
              return (
                <li key={BOTTOM_NAV_ITEM.path} className="sidebar-nav-item">
                  <NavLink
                    to={BOTTOM_NAV_ITEM.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    title={collapsed ? label : undefined}
                    onClick={() => trackNavigation(label, 'sidebar')}
                  >
                    <img
                      src={assetUrl(`/arcicon/${BOTTOM_NAV_ITEM.icon}`)}
                      alt={label}
                      className="sidebar-nav-icon"
                      width="18"
                      height="18"
                    />
                    {!collapsed && (
                      <span className="sidebar-nav-text">{label}</span>
                    )}
                  </NavLink>
                </li>
              );
            })()}
          </ul>
        )}
      </nav>
    </div>
  );
}
