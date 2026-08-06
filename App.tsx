import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SidebarNavigation from './components/SidebarNavigation';
import AuthModal from './components/AuthModal';
import OnboardingModal from './components/OnboardingModal';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import AICreatorGrowth from './pages/AICreatorGrowth';
import CampaignMarketplace from './pages/CampaignMarketplace';
import CreatorMarketplace from './pages/CreatorMarketplace';
import TechServicesMarketplace from './pages/TechServicesMarketplace';
import AIManagerMarketplace from './pages/AIManagerMarketplace';
import TaskerMarketplace from './pages/TaskerMarketplace';
import MessagingCenter from './pages/MessagingCenter';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import SettingsPage from './pages/SettingsPage';
import { AppProvider } from './context/AppContext';

const MainApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/landing':
        return <LandingPage />;
      case '/dashboard':
        return <DashboardHome />;
      case '/growth':
        return <AICreatorGrowth />;
      case '/campaigns':
        return <CampaignMarketplace />;
      case '/creators':
        return <CreatorMarketplace />;
      case '/tech-services':
        return <TechServicesMarketplace />;
      case '/ai-managers':
        return <AIManagerMarketplace />;
      case '/taskers':
        return <TaskerMarketplace />;
      case '/messages':
        return <MessagingCenter />;
      case '/analytics':
        return <AnalyticsDashboard />;
      case '/settings':
        return <SettingsPage />;
      case '/':
      default:
        return <LandingPage />;
    }
  };

  const isPublicLanding = currentPath === '/' || currentPath === '/landing';

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <AuthModal />
      <OnboardingModal />

      {isPublicLanding ? (
        <main className="flex-grow">
          {renderPage()}
        </main>
      ) : (
        <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 flex gap-8">
          <SidebarNavigation currentPath={currentPath} />
          <main className="flex-grow py-8 overflow-hidden">
            {renderPage()}
          </main>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
