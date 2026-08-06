import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Target, 
  Users, 
  Code, 
  Cpu, 
  Wrench, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentPath: string;
}

export const SidebarNavigation: React.FC<SidebarProps> = ({ currentPath }) => {
  const { user, unreadMessagesCount } = useApp();

  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/growth', label: 'AI Creator Growth', icon: Sparkles, badge: 'AI' },
    { id: '/campaigns', label: 'Campaign Marketplace', icon: Target },
    { id: '/creators', label: 'Creator Marketplace', icon: Users },
    { id: '/tech-services', label: 'Tech Services', icon: Code },
    { id: '/ai-managers', label: 'AI Managers', icon: Cpu },
    { id: '/taskers', label: 'AI Taskers', icon: Wrench },
    { id: '/messages', label: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { id: '/analytics', label: 'Analytics', icon: BarChart3 },
    { id: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] py-6 pr-4 overflow-y-auto">
      <div className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.id || (currentPath === '/' && item.id === '/dashboard');

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                isActive 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 font-bold' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.badge}
                </span>
              )}

              {item.count ? (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500 text-white">
                  {item.count}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>

      {/* Modern Creator Score Banner */}
      <div className="mt-8 p-4 glass-panel rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-indigo-500/10 blur-2xl rounded-full"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">AI Creator Score</p>
            <p className="text-lg font-black text-white font-mono">{user.score} <span className="text-xs text-gray-500 font-normal">/ 100</span></p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" 
            style={{ width: `${user.score}%` }}
          ></div>
        </div>
        <a 
          href="#/growth" 
          className="block text-center text-[10px] font-bold text-indigo-300 hover:text-indigo-200 transition-colors uppercase tracking-widest"
        >
          View AI Breakdown →
        </a>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
