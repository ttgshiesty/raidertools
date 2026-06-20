/**
 * Sidebar Navigation Component
 * See specification section 7.1.1
 */

import { assetUrl } from '../../../data/assetUrl';
import { useLocale } from '../../../shared/context/LocaleContext';

export type ViewId =
  | 'welcome'
  | 'stash'
  | 'weapons'
  | 'lists'
  | 'hideout'
  | 'projects'
  | 'quests'
  | 'in-raid'
  | 'crafting';

interface SidebarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
  hideoutAvailableUpgradeCount?: number;
  projectAvailableSubmitCount?: number;
  inRaidMissingCount?: number;
  craftingActionsCount?: number;
}

export function Sidebar({
  activeView,
  onViewChange,
  hideoutAvailableUpgradeCount = 0,
  projectAvailableSubmitCount = 0,
  inRaidMissingCount = 0,
  craftingActionsCount = 0,
}: SidebarProps) {
  const { t } = useLocale();
  const navItems: { id: ViewId; label: string; icon: string }[] = [
    {
      id: 'welcome',
      label: t('quartermaster.nav.welcome'),
      icon: 'fireball_new256.png',
    },
    {
      id: 'stash',
      label: t('quartermaster.nav.stash'),
      icon: 'bastion_mf.png',
    },
    {
      id: 'weapons',
      label: t('quartermaster.nav.weapons'),
      icon: 'rocketeer_mf.png',
    },
    {
      id: 'lists',
      label: t('quartermaster.nav.lists'),
      icon: 'snitch_mf.png',
    },
    {
      id: 'hideout',
      label: t('quartermaster.nav.hideout'),
      icon: 'matriarch256.png',
    },
    {
      id: 'projects',
      label: t('quartermaster.nav.projects'),
      icon: 'bison_mf.png',
    },
    {
      id: 'quests',
      label: t('quartermaster.nav.quests'),
      icon: 'bombardier.png',
    },
    {
      id: 'in-raid',
      label: t('quartermaster.nav.inRaid'),
      icon: 'wasp_mf.png',
    },
    {
      id: 'crafting',
      label: t('quartermaster.nav.crafting'),
      icon: 'tick_mf.png',
    },
  ];

  return (
    <div className="qm-sidebar">
      <nav className="qm-sidebar__nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`qm-sidebar__item ${activeView === item.id ? 'qm-sidebar__item--active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <img
              src={assetUrl(`/arcicon/${item.icon}`)}
              alt={item.label}
              className="qm-sidebar__icon"
              width="18"
              height="18"
            />
            <span>{item.label}</span>
            {item.id === 'hideout' && hideoutAvailableUpgradeCount > 0 && (
              <span
                className="qm-sidebar__badge"
                title={t('quartermaster.hideout.availableUpgradesTooltip')}
              >
                {hideoutAvailableUpgradeCount}
              </span>
            )}
            {item.id === 'projects' && projectAvailableSubmitCount > 0 && (
              <span
                className="qm-sidebar__badge"
                title={t('quartermaster.projects.availableSubmitTooltip')}
              >
                {projectAvailableSubmitCount}
              </span>
            )}
            {item.id === 'in-raid' && inRaidMissingCount > 0 && (
              <span
                className="qm-sidebar__badge"
                title={t('quartermaster.nav.inRaidMissingTooltip')}
              >
                {inRaidMissingCount}
              </span>
            )}
            {item.id === 'crafting' && craftingActionsCount > 0 && (
              <span
                className="qm-sidebar__badge"
                title={t('quartermaster.nav.craftingActionsTooltip')}
              >
                {craftingActionsCount}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
