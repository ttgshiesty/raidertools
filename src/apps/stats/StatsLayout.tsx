import { Activity, Hammer } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLocale } from '../../shared/context/LocaleContext';
import './styles/layout.scss';

const SECTIONS = [
  { path: 'arctracker', labelKey: 'stats.sections.arctracker', icon: Activity },
  { path: 'metaforge', labelKey: 'stats.sections.metaforge', icon: Hammer },
];

export function StatsLayout() {
  const { t } = useLocale();
  return (
    <div className="stats-shell">
      <aside className="stats-sidebar">
        <div className="stats-sidebar__heading">{t('stats.sections.title')}</div>
        <nav className="stats-sidebar__nav">
          {SECTIONS.map((section) => (
            <NavLink
              to={section.path}
              className={({ isActive }) => `stats-sidebar__link${isActive ? ' stats-sidebar__link--active' : ''}`}
              key={section.path}
            >
              <section.icon size={17} />
              <span>{t(section.labelKey)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="stats-shell__content"><Outlet /></div>
    </div>
  );
}
