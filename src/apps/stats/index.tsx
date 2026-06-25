import { useState } from 'react';
import { Crosshair, Layers, ListTree } from 'lucide-react';
import ArcTrackerStats from './components/ArcTrackerStats';
import MetaForgeStats from './components/MetaForgeStats';
import { RaidHistoryPage } from './components/RaidHistoryPage';
import './styles/layout.scss';
import './styles/main.scss';
import './styles/metaforge.scss';

type StatsTab = 'arctracker' | 'metaforge' | 'raidhistory';

const TABS: { id: StatsTab; label: string; icon: typeof Crosshair }[] = [
  { id: 'arctracker', label: 'ArcTracker', icon: Crosshair },
  { id: 'raidhistory', label: 'Raid History', icon: ListTree },
  { id: 'metaforge', label: 'MetaForge', icon: Layers },
];

export default function Stats() {
  const [activeTab, setActiveTab] = useState<StatsTab>('raidhistory');

  return (
    <div className="stats-shell">
      <aside className="stats-sidebar">
        <div className="stats-sidebar__heading">Stats</div>
        <nav className="stats-sidebar__nav">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`stats-sidebar__link${activeTab === id ? ' stats-sidebar__link--active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="stats-shell__content">
        {activeTab === 'arctracker' ? (
          <ArcTrackerStats />
        ) : activeTab === 'raidhistory' ? (
          <RaidHistoryPage />
        ) : (
          <MetaForgeStats />
        )}
      </div>
    </div>
  );
}
