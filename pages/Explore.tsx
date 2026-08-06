
import React, { useState } from 'react';
import { PROJECTS, getAccessIcon, getActivityTypeIcon } from '../constants';
import { Search, Filter, Lock, CheckCircle2 } from 'lucide-react';
import { AccessType, ActivityType } from '../types';
import { useApp } from '../context/AppContext';

const Explore: React.FC = () => {
  const { activities, participatedIds, participateInActivity } = useApp();
  const [filter, setFilter] = useState<ActivityType | 'ALL'>('ALL');
  const [participatingId, setParticipatingId] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const filtered = filter === 'ALL' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const handleParticipate = async (id: string) => {
    const res = await participateInActivity(id, accessCode);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setParticipatingId(null);
      setAccessCode('');
    } else {
      setMessage({ type: 'error', text: res.message });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-20 right-6 z-[60] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-right duration-300 ${
          message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <Lock size={20} />}
          <span className="font-bold text-sm">{message.text}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Activities</h1>
          <p className="text-gray-400">Participate in surveys, tests, and tasks to earn XP and rewards.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter by keyword..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {(Object.values(ActivityType) as string[]).concat(['ALL']).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              filter === type 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            {type.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(activity => {
          const project = PROJECTS.find(p => p.id === activity.projectId);
          const isParticipated = participatedIds.includes(activity.id);
          const isLocked = participatingId === activity.id;

          return (
            <div key={activity.id} className="glass-panel rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-all group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={activity.image || `https://picsum.photos/seed/${activity.id}/800/450`} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-2 border border-white/10">
                    {getAccessIcon(activity.access)}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {activity.access.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                {isParticipated && (
                  <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="px-4 py-2 bg-emerald-500 rounded-full font-bold text-xs shadow-lg flex items-center gap-2">
                      <CheckCircle2 size={14} /> Completed
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={project?.logo} alt={project?.name} className="w-8 h-8 rounded-lg" />
                  <span className="text-sm font-medium text-indigo-400">{project?.name}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  {getActivityTypeIcon(activity.type)}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{activity.type.replace('_', ' ')}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{activity.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6">{activity.description}</p>
                
                <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold uppercase">Reward</span>
                      <span className="text-lg font-bold text-white">{activity.rewardXP} XP</span>
                    </div>
                    {isParticipated ? (
                      <span className="text-xs text-gray-500 font-medium italic">XP Added to Wallet</span>
                    ) : activity.access === AccessType.CODE_GATED && !isLocked ? (
                      <button 
                        onClick={() => setParticipatingId(activity.id)}
                        className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                      >
                        <Lock size={14} /> Unlock
                      </button>
                    ) : isLocked ? (
                      <div className="flex items-center gap-2">
                         <input 
                          autoFocus
                          type="text" 
                          placeholder="Enter Code" 
                          className="bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-indigo-500 w-24"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                        />
                        <button 
                          onClick={() => handleParticipate(activity.id)}
                          className="p-1.5 bg-indigo-600 rounded-lg hover:bg-indigo-500"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleParticipate(activity.id)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                      >
                        Start Task
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
