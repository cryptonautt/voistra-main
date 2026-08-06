import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target, 
  Code, 
  Cpu, 
  Wrench, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardHome: React.FC = () => {
  const { user, activeRole, campaigns, creators, techProviders, messages, setIsAuthModalOpen } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="p-8 glass-panel rounded-3xl border border-indigo-500/30 relative overflow-hidden neon-border">
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-20 h-20 rounded-2xl border-2 border-indigo-500/40 p-1 bg-black object-cover shadow-xl" 
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-black font-heading text-white">Welcome back, {user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Verified Profile
                </span>
              </div>
              <p className="text-xs text-gray-300 max-w-lg leading-relaxed">{user.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#/growth" 
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Sparkles size={16} />
              AI Growth Report
            </a>
            <button 
              onClick={() => setIsAuthModalOpen(true)} 
              className="flex items-center gap-2 px-5 py-3 glass-panel hover:bg-white/10 text-white font-bold rounded-2xl text-xs transition-all border border-white/10"
            >
              Post Opportunity
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Creator Score</span>
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Zap size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono mb-2">{user.score} <span className="text-xs text-gray-500 font-sans font-normal">/ 100</span></p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 w-11/12"></div>
          </div>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ecosystem XP</span>
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono mb-1">{user.xp.toLocaleString()}</p>
          <p className="text-[11px] text-purple-400 font-semibold">+1,250 XP earned this week</p>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Active Campaigns</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Target size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono mb-1">{campaigns.length}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">$11,700 Budget Available</p>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Messages</span>
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <MessageSquare size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono mb-1">{messages.length}</p>
          <p className="text-[11px] text-cyan-400 font-semibold">1 Unread Thread</p>
        </div>
      </div>

      {/* Main Grid: Marketplace Highlights & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Columns: Recommended Opportunities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Recommended Campaigns for You</h2>
              <p className="text-xs text-gray-400">Based on your creator score and tech skills</p>
            </div>
            <a href="#/campaigns" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View All ({campaigns.length}) →</a>
          </div>

          <div className="space-y-4">
            {campaigns.map(camp => (
              <div key={camp.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={camp.companyLogo} alt="" className="w-12 h-12 rounded-2xl border border-white/10 object-cover" />
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">{camp.category}</span>
                    <h3 className="font-bold text-base text-white">{camp.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{camp.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold">Budget</p>
                    <p className="text-base font-bold text-white font-mono">${camp.budget.toLocaleString()}</p>
                  </div>
                  <a 
                    href="#/campaigns" 
                    className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-xl text-xs font-bold transition-all"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Top Vetted Tech Pros & AI Managers */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white">Featured Tech Pros</h2>
            <a href="#/tech-services" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">View Directory →</a>
          </div>

          <div className="space-y-4">
            {techProviders.slice(0, 2).map(provider => (
              <div key={provider.id} className="p-5 glass-panel rounded-3xl border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={provider.avatar} alt="" className="w-10 h-10 rounded-xl border border-white/10 object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-white">{provider.name}</h4>
                    <p className="text-[11px] text-emerald-400 font-semibold">{provider.title}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {provider.skills.slice(0, 3).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] text-gray-300 font-mono">{s}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs font-mono font-bold text-white pt-2 border-t border-white/10">
                  <span>${provider.hourlyRate}/hr</span>
                  <a href="#/tech-services" className="text-emerald-400 hover:underline">Hire Talent →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;
