import React, { useState } from 'react';
import { Users, Search, Star, MessageSquare, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreatorProfile } from '../types';

export const CreatorMarketplace: React.FC = () => {
  const { creators, setSelectedRecipient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);

  const filteredCreators = creators.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users size={16} /> Module 3 – Creator Discovery Directory
          </div>
          <h1 className="text-3xl font-black font-heading text-white">Creator Marketplace</h1>
          <p className="text-xs text-gray-400">Searchable directory of verified creators with AI scores and social demographics.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 glass-panel rounded-2xl border border-white/10">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search creators by name, handle, or niche (e.g. AI Workflows, SaaS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map(creator => (
          <div key={creator.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={creator.avatar} alt="" className="w-14 h-14 rounded-2xl border border-indigo-500/40 p-0.5 bg-black object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                      {creator.name}
                      {creator.verified && <ShieldCheck size={16} className="text-indigo-400" />}
                    </h3>
                    <p className="text-xs text-indigo-400 font-mono">{creator.handle}</p>
                    <p className="text-[11px] text-gray-400">{creator.niche}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/[0.03] rounded-2xl text-center">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Followers</p>
                  <p className="text-xs font-bold text-white font-mono">{(creator.totalFollowers / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">Engagement</p>
                  <p className="text-xs font-bold text-indigo-400 font-mono">{creator.avgEngagement}%</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">AI Score</p>
                  <p className="text-xs font-bold text-emerald-400 font-mono">{creator.creatorScore}/100</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">{creator.bio}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {creator.platforms.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded-md text-[10px] font-mono border border-indigo-500/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Campaign Starting</span>
                <p className="text-base font-black text-white font-mono">${creator.startingCampaignRate}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCreator(creator)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"
                >
                  View Details
                </button>
                <a
                  href="#/messages"
                  onClick={() => setSelectedRecipient({ id: creator.id, name: creator.name, avatar: creator.avatar })}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <MessageSquare size={14} /> Message
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl p-8 glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-4 mb-6">
              <img src={selectedCreator.avatar} alt="" className="w-16 h-16 rounded-2xl border border-indigo-500/50 object-cover" />
              <div>
                <h2 className="text-xl font-bold font-heading text-white">{selectedCreator.name}</h2>
                <p className="text-xs text-indigo-400 font-mono">{selectedCreator.handle} • {selectedCreator.location}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedCreator.niche}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Biography</h4>
                <p className="text-xs text-gray-200 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                  {selectedCreator.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Audience Demographics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/[0.03] rounded-2xl border border-white/10 text-center text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Top Region</span>
                    <span className="font-bold text-white">{selectedCreator.audienceDemographics.topCountry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Age Range</span>
                    <span className="font-bold text-white">{selectedCreator.audienceDemographics.topAgeGroup}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Male Ratio</span>
                    <span className="font-bold text-white">{selectedCreator.audienceDemographics.maleRatio}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Female Ratio</span>
                    <span className="font-bold text-white">{selectedCreator.audienceDemographics.femaleRatio}%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white"
                >
                  Close
                </button>
                <a
                  href="#/messages"
                  onClick={() => {
                    setSelectedRecipient({ id: selectedCreator.id, name: selectedCreator.name, avatar: selectedCreator.avatar });
                    setSelectedCreator(null);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Start Campaign Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreatorMarketplace;
