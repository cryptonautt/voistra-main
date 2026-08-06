
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Zap, Award, Users, Share2, Plus, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROJECTS } from '../constants';

const data = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 550 },
  { name: 'Wed', xp: 600 },
  { name: 'Thu', xp: 850 },
  { name: 'Fri', xp: 920 },
  { name: 'Sat', xp: 1100 },
  { name: 'Sun', xp: 1250 },
];

const Dashboard: React.FC = () => {
  const { user, isConnected, participatedIds, activities } = useApp();

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-center text-gray-600 mb-6 premium-border">
          <Wallet size={40} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Dashboard Locked</h2>
        <p className="text-gray-500 max-w-md mb-8">
          Please connect your EVM wallet to view your personal on-chain contribution metrics and XP progress.
        </p>
        <div className="p-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
           <div className="bg-[#05070a] px-8 py-4 rounded-xl">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Connect to unlock Phase 1 rewards</span>
           </div>
        </div>
      </div>
    );
  }

  const history = participatedIds.map(id => {
    const act = activities.find(a => a.id === id);
    return {
      action: act?.type === 'BETA_TEST' ? 'Beta Test Phase 1' : 'Survey Completed',
      project: PROJECTS.find(p => p.id === act?.projectId)?.name || 'Voistra',
      xp: `+${(act?.rewardXP || 0) * user.multiplier}`,
      time: 'Recently'
    };
  }).reverse();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-3xl mx-auto mb-4 border-2 border-white/10" />
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.wallet}</p>
            
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {user.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-medium">
                  {skill}
                </span>
              ))}
              <button className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-colors">
                <Plus size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="block text-[10px] font-bold uppercase text-gray-500 mb-1">XP Points</span>
                <span className="text-xl font-bold">{user.xp.toLocaleString()}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Rank</span>
                <span className="text-xl font-bold">#42</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-400" />
              Achievements
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Early Adopter', date: 'May 12, 2024', icon: <Zap size={14} /> },
                { name: 'Top Reviewer', date: 'May 18, 2024', icon: <Award size={14} /> },
                participatedIds.length > 2 ? { name: 'Beta Legend', date: 'Just now', icon: <Users size={14} /> } : null
              ].filter(Boolean).map((ach: any) => (
                <div key={ach.name} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {ach.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{ach.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{ach.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold">XP Growth Curve</h3>
                <p className="text-gray-500 text-sm">Your on-chain contribution history for the last 7 days.</p>
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold">Recent History</h3>
              <button className="text-sm text-indigo-400 font-medium hover:underline">See All</button>
            </div>
            <div className="divide-y divide-white/5">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <div>
                        <p className="font-bold text-sm">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{item.xp} XP</p>
                      <p className="text-[10px] text-gray-500 uppercase">{item.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500 text-sm">No activity recorded on-chain yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
