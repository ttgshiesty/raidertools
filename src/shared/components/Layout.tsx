import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { SyncErrorBanner } from './SyncErrorBanner';
import { usePageTitle } from '../hooks/usePageTitle';
import BouncingScrappy from '../../pages/BouncingScrappy';

export function Layout() {
  usePageTitle();

  return (
    <div className="min-h-screen bg-shiesty-black">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/main/backdrop.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Header />
      <SyncErrorBanner />
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <BouncingScrappy />
      </div>
    </div>
  );
}
