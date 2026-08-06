import React, { useState } from 'react';
import { Target, Search, Plus, Filter, CheckCircle2, ArrowRight, DollarSign, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Campaign } from '../types';

export const CampaignMarketplace: React.FC = () => {
  const { campaigns, addCampaign, applyToCampaign } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Campaign Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(2500);
  const [category, setCategory] = useState<'Influencer Marketing' | 'Product Launch' | 'Beta Testing' | 'Tech Service' | 'Content Creation'>('Influencer Marketing');

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (id: string) => {
    applyToCampaign(id);
    setAppliedIds([...appliedIds, id]);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign({
      companyName: 'My Startup Studio',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
      title,
      description,
      category,
      budget: Number(budget),
      deadline: 'Sep 15, 2026',
      targetNiche: 'AI & Tech',
      requiredPlatforms: ['YouTube', 'X'],
      deliverables: ['1x Product Review Video', '1x Launch Thread'],
      status: 'Open'
    });
    setIsCreateOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Target size={16} /> Module 2 – Brand & Tech Campaign Marketplace
          </div>
          <h1 className="text-3xl font-black font-heading text-white">Campaign Marketplace</h1>
          <p className="text-xs text-gray-400">Discover paid brand campaigns, product launches, beta tests, and tech contracts.</p>
        </div>

        <button 
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Plus size={16} />
          Create New Campaign
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-panel rounded-2xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search campaigns, skills, niches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Influencer Marketing', 'Tech Service', 'Beta Testing', 'Content Creation'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(camp => {
          const isApplied = appliedIds.includes(camp.id);
          return (
            <div key={camp.id} className="p-6 glass-panel glass-panel-hover rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={camp.companyLogo} alt="" className="w-10 h-10 rounded-xl border border-white/10 object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-white">{camp.companyName}</h4>
                      <p className="text-[10px] text-gray-400">{camp.targetNiche}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold uppercase">
                    {camp.category}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-2 leading-snug">{camp.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">{camp.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {camp.requiredPlatforms.map(p => (
                    <span key={p} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-indigo-300 font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Budget</span>
                  <p className="text-lg font-black text-white font-mono">${camp.budget.toLocaleString()}</p>
                </div>

                <button
                  disabled={isApplied}
                  onClick={() => handleApply(camp.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isApplied 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  }`}
                >
                  {isApplied ? 'Applied ✓' : 'Apply to Campaign'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Campaign Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-8 glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl">
            <h2 className="text-xl font-bold font-heading text-white mb-4">Create New Campaign</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next.js SaaS Video Review Campaign"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0c101a] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="Influencer Marketing">Influencer Marketing</option>
                  <option value="Tech Service">Tech Service</option>
                  <option value="Beta Testing">Beta Testing</option>
                  <option value="Content Creation">Content Creation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Budget ($ USD)</label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description & Deliverables</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project requirements..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="w-1/3 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-lg"
                >
                  Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CampaignMarketplace;
