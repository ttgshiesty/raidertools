import { BackgroundEffects } from './components/BackgroundEffects';
import { BuildSummary } from './components/BuildSummary';
import { Header } from './components/Header';
import { RadarChart } from './components/RadarChart';
import { SkillTreeView } from './components/SkillTreeView';
import './styles/main.scss';

export function SkillTreeApp() {
  return (
    <div className="skill-tree-root">
      <BackgroundEffects />
      <Header />
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        <div className="flex-1">
          <SkillTreeView />
        </div>
        <div className="w-80 space-y-6">
          <RadarChart />
          <BuildSummary />
        </div>
      </div>
    </div>
  );
}
