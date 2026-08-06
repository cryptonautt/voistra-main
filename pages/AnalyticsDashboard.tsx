import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnalyticsDashboard: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BarChart3 size={16} /> Performance & Revenue Insights
        </div>
        <h1 className="text-3xl font-black font-heading text-white">Ecosystem Analytics</h1>
        <p className="text-xs text-gray-400">Track your audience reach, campaign earnings, tech services revenue, and AI scores.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <span className="text-xs text-gray-400 font-bold uppercase">Total Revenue Earned</span>
          <p className="text-3xl font-black text-white font-mono my-2">$14,850</p>
          <span className="text-xs text-emerald-400 font-semibold">+24.5% vs last month</span>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <span className="text-xs text-gray-400 font-bold uppercase">Total Audience Reach</span>
          <p className="text-3xl font-black text-white font-mono my-2">420,000</p>
          <span className="text-xs text-indigo-400 font-semibold">+18,400 new viewers</span>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <span className="text-xs text-gray-400 font-bold uppercase">Completed Collaborations</span>
          <p className="text-3xl font-black text-white font-mono my-2">19 Projects</p>
          <span className="text-xs text-purple-400 font-semibold">100% Client Satisfaction</span>
        </div>

        <div className="p-6 glass-panel rounded-3xl border border-white/10">
          <span className="text-xs text-gray-400 font-bold uppercase">AI Creator Score</span>
          <p className="text-3xl font-black text-emerald-400 font-mono my-2">{user.score}/100</p>
          <span className="text-xs text-emerald-400 font-semibold">Top Tier Creator Rank</span>
        </div>
      </div>

      {/* Chart Visual Mock */}
      <div className="p-8 glass-panel rounded-3xl border border-indigo-500/30 neon-border space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h3 className="font-bold text-lg text-white">Monthly Growth & Campaign Income</h3>
          <span className="text-xs font-mono text-indigo-400">Jan 2026 – Aug 2026</span>
        </div>

        <div className="h-64 flex items-end justify-between gap-4 pt-8">
          {[40, 55, 65, 80, 75, 90, 110, 135].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-xl transition-all duration-500 hover:opacity-80"
                style={{ height: `${val * 1.5}px` }}
              ></div>
              <span className="text-[10px] font-mono text-gray-400 uppercase">M{idx+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
