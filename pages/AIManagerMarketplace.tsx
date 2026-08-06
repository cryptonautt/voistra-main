import React, { useState } from 'react';
import { Cpu, Search, Star, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AIManagerProfile } from '../types';

export const AIManagerMarketplace: React.FC = () => {
  const { aiManagers, setSelectedRecipient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredManagers = aiManagers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.platformsManaged.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu size={16} /> Module 5 – Verified AI Manager Directory
          </div>
          <h1 className="text-3xl font-black font-heading text-white">AI Manager Marketplace</h1>
          <p className="text-xs text-gray-400">Vetted AI Operations Managers who run synthetic media, automated social engines, and AI work accounts.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 glass-panel rounded-2xl border border-white/10">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search AI managers by platform (e.g. Midjourney, Make.com, HeyGen)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* AI Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredManagers.map(manager => (
          <div key={manager.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={manager.avatar} alt="" className="w-14 h-14 rounded-2xl border border-purple-500/40 p-0.5 bg-black object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                      {manager.name}
                      {manager.verified && <ShieldCheck size={16} className="text-purple-400" />}
                    </h3>
                    <p className="text-xs text-purple-400 font-semibold">{manager.title}</p>
                    <p className="text-[11px] text-gray-400">{manager.experienceYears} Years AI Operations Experience</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">{manager.bio}</p>

              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold block mb-2">Platforms Managed</span>
                <div className="flex flex-wrap gap-1.5">
                  {manager.platformsManaged.map(p => (
                    <span key={p} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-[10px] font-mono border border-purple-500/20">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Monthly Retainer</span>
                <p className="text-lg font-black text-white font-mono">${manager.monthlyRate.toLocaleString()}<span className="text-xs text-gray-500 font-normal">/mo</span></p>
              </div>

              <a
                href="#/messages"
                onClick={() => setSelectedRecipient({ id: manager.id, name: manager.name, avatar: manager.avatar })}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/20"
              >
                <MessageSquare size={14} /> Hire AI Manager
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AIManagerMarketplace;
