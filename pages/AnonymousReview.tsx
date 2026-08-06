
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ShieldAlert, Ghost, Send, CheckCircle2, ChevronDown, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AnonymousReview: React.FC = () => {
  const { isConnected, submitReview } = useApp();
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    submitReview(projectId, content, rating, true);
    setIsSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  const selectedProject = PROJECTS.find(p => p.id === projectId);

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-500/5 border border-indigo-500/20 rounded-[32px] flex items-center justify-center text-indigo-400 mb-6 premium-border shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <Ghost size={40} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Stealth Portal Locked</h2>
        <p className="text-gray-500 max-w-md mb-8 font-medium">
          You must connect your wallet to authorize an anonymous transmission. Your identity will be fully obfuscated from the public feed.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] flex items-center justify-center text-emerald-400 mb-6 premium-border shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <CheckCircle2 size={40} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Transmission Successful</h2>
        <p className="text-gray-500 max-w-md mb-8 font-medium italic">
          Your insight has been cloaked and uploaded to the MegaETH social layer. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 mb-6">
          <ShieldAlert size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Privacy Protocol Active</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Cloaked Transmission</h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto">
          Share brutally honest feedback without compromising your on-chain reputation. Redacted metadata is applied automatically.
        </p>
      </div>

      <div className="glass-panel rounded-[32px] p-8 md:p-12 premium-border shadow-2xl relative overflow-hidden">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Project Selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Target Project</label>
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-16 bg-black/40 border border-white/5 rounded-2xl px-6 flex items-center justify-between hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img src={selectedProject?.logo} className="w-8 h-8 rounded-lg" alt="" />
                  <span className="font-bold uppercase tracking-tight">{selectedProject?.name}</span>
                </div>
                <ChevronDown size={20} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-20 left-0 w-full bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {PROJECTS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setProjectId(p.id); setIsDropdownOpen(false); }}
                      className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <img src={p.logo} className="w-8 h-8 rounded-lg" alt="" />
                      <span className="font-bold text-sm uppercase tracking-tight">{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Performance Rating</label>
             <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${
                      rating >= val ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-600 hover:bg-white/10'
                    }`}
                  >
                    <Star size={18} fill={rating >= val ? 'currentColor' : 'none'} />
                  </button>
                ))}
             </div>
          </div>

          {/* Content Area */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Encrypted Insight Content</label>
            <div className="relative">
              <textarea 
                required
                placeholder="The lending pool contract has a minor re-entrancy vulnerability in the withdraw function..."
                className="w-full h-40 bg-black/40 border border-white/5 rounded-[24px] p-6 focus:outline-none focus:border-indigo-500 transition-all font-medium text-gray-200 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600">
                {content.length} CHARS
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Bypassing On-Chain Identity...</span>
             </div>
             <button 
              type="submit"
              className="px-10 h-14 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-3 active:scale-95 shadow-xl"
             >
                Initialize Upload <Send size={16} />
             </button>
          </div>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Ghost size={14} /> Zero-Knowledge Identity
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <div className="flex items-center gap-2">
          <ShieldAlert size={14} /> Anti-Sybil Shielded
        </div>
      </div>
    </div>
  );
};

export default AnonymousReview;
