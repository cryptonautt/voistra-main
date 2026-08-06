import React, { useState } from 'react';
import { Wrench, Search, MessageSquare, CheckCircle2, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskerProfile } from '../types';

export const TaskerMarketplace: React.FC = () => {
  const { taskers, setSelectedRecipient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTaskers = taskers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Wrench size={16} /> Module 6 – AI Tasker & Freelancer Directory
          </div>
          <h1 className="text-3xl font-black font-heading text-white">AI Tasker Marketplace</h1>
          <p className="text-xs text-gray-400">Hire specialized AI freelancers for prompt editing, video clipping, annotations, and social workflow execution.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 glass-panel rounded-2xl border border-white/10">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search taskers by skill or tool (e.g. CapCut, Midjourney, Subtitles)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-amber-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Tasker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTaskers.map(tasker => (
          <div key={tasker.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={tasker.avatar} alt="" className="w-12 h-12 rounded-2xl border border-amber-500/40 p-0.5 bg-black object-cover" />
                <div>
                  <h3 className="font-bold text-sm text-white">{tasker.name}</h3>
                  <p className="text-xs text-amber-400 font-semibold">{tasker.title}</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-3">{tasker.bio}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {tasker.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded-md text-[10px] font-mono border border-amber-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Hourly Rate</span>
                <p className="text-base font-black text-white font-mono">${tasker.hourlyRate}/hr</p>
              </div>

              <a
                href="#/messages"
                onClick={() => setSelectedRecipient({ id: tasker.id, name: tasker.name, avatar: tasker.avatar })}
                className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <UserPlus size={14} /> Hire / Add to Team
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TaskerMarketplace;
