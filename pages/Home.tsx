
import React from 'react';
import AnnouncementBoard from '../components/AnnouncementBoard';
import ReviewFeed from '../components/ReviewFeed';
import { PROJECTS } from '../constants';
import { TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { user, rewards, ownedRewardIds } = useApp();

  const nextGoal = 2500;
  const progress = Math.min((user.xp / nextGoal) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative">
      <AnnouncementBoard />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <ReviewFeed />
        </div>
        
        <div className="lg:col-span-4 space-y-10">
          {/* Enhanced User Stats Card */}
          <div className="glass-panel rounded-[32px] p-8 premium-border relative group overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
            
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-[24px] border border-white/10 p-1 bg-black" />
                <div className="absolute -bottom-1 -right-1 bg-black border border-indigo-500/50 rounded-lg px-1.5 py-0.5">
                   <span className="text-[10px] font-black text-indigo-400">LVL 4</span>
                </div>
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tight mb-1">{user.name.toUpperCase()}</h3>
                <div className="flex items-center gap-2 text-indigo-400">
                  <TrendingUp size={14} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{user.multiplier}x BOOST</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Ecosystem XP</span>
                  <span className="text-white font-mono font-black text-lg">{user.xp.toLocaleString()} <span className="text-gray-600 text-xs">/ {nextGoal.toLocaleString()}</span></span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden premium-border">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                  On-chain ID
                </button>
                <button className="py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-indigo-500/20">
                  Claim Daily
                </button>
              </div>
            </div>
          </div>

          {/* Premium Trending Projects */}
          <div className="glass-panel rounded-[32px] p-8 premium-border shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
              <Users size={14} /> Ecosystem Trends
            </h3>
            <div className="space-y-5">
              {PROJECTS.map(project => (
                <div key={project.id} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                  <div className="flex items-center gap-4">
                    <img src={project.logo} alt={project.name} className="w-12 h-12 rounded-2xl border border-white/5 p-1 bg-black" />
                    <div>
                      <p className="font-black text-sm tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{project.name}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{(Math.random() * 5 + 1).toFixed(1)}k Reviewers</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-700 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Rewards Sidebar */}
          <div className="glass-panel rounded-[32px] p-8 premium-border relative overflow-hidden shadow-2xl">
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 blur-[60px]"></div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
              <Award size={14} className="text-amber-500" /> Exclusive Perks
            </h3>
            {rewards.slice(0, 1).map(reward => {
              const isOwned = ownedRewardIds.includes(reward.id);
              return (
                <div key={reward.id} className="relative group/card">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 premium-border">
                    <img src={reward.image} alt="" className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                  </div>
                  <p className="text-[10px] text-amber-500/80 mb-1 uppercase tracking-widest font-black">{reward.category}</p>
                  <p className="font-black text-sm mb-4 tracking-tight uppercase">{reward.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-black text-white">{reward.costXP.toLocaleString()} <span className="text-[10px] text-gray-500">XP</span></span>
                    <button 
                      disabled={isOwned || user.xp < reward.costXP}
                      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        isOwned 
                        ? 'bg-white/10 text-gray-600' 
                        : user.xp >= reward.costXP 
                        ? 'bg-amber-500 hover:bg-amber-400 text-black' 
                        : 'bg-white/5 text-gray-600 border border-white/5'
                      }`}
                    >
                      {isOwned ? 'COLLECTED' : 'REDEEM'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
