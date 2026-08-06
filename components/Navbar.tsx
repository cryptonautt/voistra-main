import React, { useState } from 'react';
import { Sparkles, Bell, MessageSquare, Plus, User as UserIcon, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    user, 
    activeRole, 
    setActiveRole, 
    unreadMessagesCount, 
    notificationsCount, 
    setIsAuthModalOpen, 
    setIsOnboardingOpen 
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    creator: { label: 'Creator Mode', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    founder: { label: 'Founder Mode', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    tech_provider: { label: 'Tech Provider', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    ai_manager: { label: 'AI Manager', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    tasker: { label: 'Tasker Mode', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-6 py-3.5 backdrop-blur-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-black font-heading tracking-tight text-white flex items-center gap-1.5">
              VOISTRA <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono border border-indigo-500/30 font-semibold">AI Ecosystem</span>
            </span>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all ${roleLabels[activeRole].color}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
              {roleLabels[activeRole].label}
              <ChevronDown size={14} />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute top-11 left-0 w-52 p-2 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] uppercase font-bold text-gray-500 px-3 py-1 tracking-wider">Switch View Mode</div>
                {user.roles.map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                      activeRole === role ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {roleLabels[role].label}
                    {activeRole === role && <CheckCircle2 size={14} className="text-indigo-400" />}
                  </button>
                ))}
                <div className="border-t border-white/10 my-1"></div>
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    setIsOnboardingOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  + Add / Manage Roles
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons & User Profile */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAuthModalOpen(true)} 
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Plus size={16} />
            New Campaign
          </button>

          <a 
            href="#/messages" 
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
          >
            <MessageSquare size={18} />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadMessagesCount}
              </span>
            )}
          </a>

          <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all">
            <Bell size={18} />
            {notificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 transition-all"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-xl border border-indigo-500/40 p-0.5 bg-black object-cover" 
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-indigo-400 font-mono">{user.xp.toLocaleString()} XP</p>
              </div>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-12 w-56 p-2 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                </div>
                <a 
                  href="#/settings" 
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                >
                  <UserIcon size={16} />
                  Profile & Settings
                </a>
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-all text-left"
                >
                  <LogOut size={16} />
                  Switch Account
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
