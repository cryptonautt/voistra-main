import React, { useState } from 'react';
import { Code, Search, Star, MessageSquare, ShieldCheck, Briefcase, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TechProviderProfile } from '../types';

export const TechServicesMarketplace: React.FC = () => {
  const { techProviders, setSelectedRecipient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState<TechProviderProfile | null>(null);

  const categories = ['All', 'AI & Prompt Eng', 'UI/UX Design', 'DevOps & Cloud', 'Software Dev', 'Web Dev'];

  const filteredProviders = techProviders.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Code size={16} /> Module 4 – Tech Services Marketplace
          </div>
          <h1 className="text-3xl font-black font-heading text-white">Tech Services Marketplace</h1>
          <p className="text-xs text-gray-400">Connect with expert developers, UI/UX designers, AI prompt engineers, and DevOps architects.</p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-panel rounded-2xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by skill, title, or name (e.g. Next.js, PyTorch)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white/5 border border-white/10 focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map(provider => (
          <div key={provider.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={provider.avatar} alt="" className="w-14 h-14 rounded-2xl border border-emerald-500/40 p-0.5 bg-black object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                      {provider.name}
                      {provider.verified && <ShieldCheck size={16} className="text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-emerald-400 font-semibold">{provider.title}</p>
                    <p className="text-[11px] text-gray-400">{provider.location}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">{provider.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {provider.skills.slice(0, 5).map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-white/5 text-gray-300 rounded-lg text-[10px] font-mono border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-white/[0.03] rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold block">Experience</span>
                  <span className="font-bold text-white font-mono">{provider.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold block">Completed</span>
                  <span className="font-bold text-emerald-400 font-mono">{provider.completedProjects} Projects</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Hourly Rate</span>
                <p className="text-base font-black text-white font-mono">${provider.hourlyRate}/hr</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProvider(provider)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"
                >
                  Portfolio
                </button>
                <a
                  href="#/messages"
                  onClick={() => setSelectedRecipient({ id: provider.id, name: provider.name, avatar: provider.avatar })}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-lg shadow-emerald-500/20"
                >
                  <MessageSquare size={14} /> Hire Talent
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Provider Detail Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl p-8 glass-panel rounded-3xl border border-emerald-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-4 mb-6">
              <img src={selectedProvider.avatar} alt="" className="w-16 h-16 rounded-2xl border border-emerald-500/50 object-cover" />
              <div>
                <h2 className="text-xl font-bold font-heading text-white">{selectedProvider.name}</h2>
                <p className="text-xs text-emerald-400 font-semibold">{selectedProvider.title}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedProvider.location} • {selectedProvider.availability}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">About & Skills</h4>
                <p className="text-xs text-gray-200 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/10 mb-3">
                  {selectedProvider.bio}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProvider.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-xl text-xs font-mono border border-emerald-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Featured Projects</h4>
                <div className="space-y-3">
                  {selectedProvider.portfolio.map(p => (
                    <div key={p.id} className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 flex items-center gap-4">
                      <img src={p.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-white">{p.title}</h5>
                        <p className="text-[11px] text-gray-400 mt-0.5">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white"
                >
                  Close
                </button>
                <a
                  href="#/messages"
                  onClick={() => {
                    setSelectedRecipient({ id: selectedProvider.id, name: selectedProvider.name, avatar: selectedProvider.avatar });
                    setSelectedProvider(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Direct Contact & Hire
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TechServicesMarketplace;
