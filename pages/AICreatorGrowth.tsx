import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  ArrowUpRight, 
  Lightbulb, 
  Send 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_AI_INSIGHTS, MOCK_CONTENT_IDEAS, MOCK_CREATORS } from '../constants';
import { generateContentIdeas } from '../services/geminiService';
import { ContentIdea } from '../types';

export const AICreatorGrowth: React.FC = () => {
  const { user } = useApp();
  const [ideas, setIdeas] = useState<ContentIdea[]>(MOCK_CONTENT_IDEAS);
  const [topicInput, setTopicInput] = useState('AI Dev Tools');
  const [platformSelect, setPlatformSelect] = useState('YouTube Shorts');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    const newIdeas = await generateContentIdeas('Tech & SaaS', platformSelect, topicInput);
    setIdeas(prev => [...newIdeas, ...prev]);
    setIsGenerating(false);
  };

  const scoreMetrics = [
    { label: 'Engagement Rate', score: 92, color: 'bg-emerald-500' },
    { label: 'Audience Retention', score: 88, color: 'bg-indigo-500' },
    { label: 'Posting Consistency', score: 74, color: 'bg-amber-500' },
    { label: 'Content Quality Score', score: 95, color: 'bg-purple-500' },
    { label: 'Profile Optimization', score: 86, color: 'bg-cyan-500' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles size={16} /> Module 1 – AI Social Media Growth Engine
          </div>
          <h1 className="text-3xl font-black font-heading text-white">AI Creator Growth Suite</h1>
          <p className="text-xs text-gray-400">Personalized algorithms, social benchmarks, and Gemini AI idea generation.</p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all">
            <RefreshCw size={14} /> Sync Social Accounts
          </button>
        </div>
      </div>

      {/* Creator Score Breakdown Card */}
      <div className="p-8 glass-panel rounded-3xl border border-indigo-500/30 neon-border relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Overall Creator Score</span>
            <div className="flex items-baseline justify-center lg:justify-start gap-2 my-2">
              <span className="text-6xl font-black font-mono text-white">{user.score}</span>
              <span className="text-lg text-gray-500 font-mono">/ 100</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold mb-4">Top 6% Creator Rank in Tech & AI Niche</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your overall score is calculated from 7 social metrics. Improving your posting consistency can boost your reach by +35%.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {scoreMetrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">{m.label}</span>
                  <span className="text-white font-mono">{m.score}/100</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* AI Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: AI Natural Language Insights */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Zap size={20} className="text-indigo-400" /> AI Account Insights
          </h2>

          <div className="space-y-4">
            {MOCK_AI_INSIGHTS.map(ins => (
              <div key={ins.id} className="p-6 glass-panel rounded-3xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ins.type === 'opportunity' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    ins.type === 'weakness' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {ins.type}
                  </span>
                  <span className="text-xs font-mono text-gray-400">Impact: {ins.impactScore}%</span>
                </div>
                <h3 className="font-bold text-base text-white">{ins.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{ins.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Niche Competitor Benchmarks */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-400" /> Niche Competitor Discovery
          </h2>

          <div className="space-y-4">
            {MOCK_CREATORS.map(creator => (
              <div key={creator.id} className="p-5 glass-panel rounded-3xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={creator.avatar} alt="" className="w-11 h-11 rounded-2xl border border-white/10 object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-white">{creator.name}</h4>
                    <p className="text-[11px] text-gray-400">{creator.handle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400 font-mono">{creator.avgEngagement}% Engagement</p>
                  <p className="text-[10px] text-gray-500 font-mono">{(creator.totalFollowers/1000).toFixed(0)}k Followers</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Content Generator (Powered by Gemini) */}
      <div className="p-8 glass-panel rounded-3xl border border-purple-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
              <Lightbulb size={24} className="text-purple-400" /> Gemini AI Viral Content Generator
            </h2>
            <p className="text-xs text-gray-400">Generate personalized video scripts, reel hooks, and viral threads tailored to your account analytics.</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Target Topic</label>
            <input 
              type="text" 
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500 rounded-xl text-sm text-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Platform / Format</label>
            <select
              value={platformSelect}
              onChange={(e) => setPlatformSelect(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0c101a] border border-white/10 focus:border-purple-500 rounded-xl text-sm text-white focus:outline-none"
            >
              <option value="YouTube Shorts">YouTube Shorts</option>
              <option value="TikTok / Reels">TikTok / Reels</option>
              <option value="X (Twitter) Thread">X (Twitter) Thread</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="p-6 glass-panel rounded-2xl border border-white/10 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase rounded-full border border-purple-500/30">
                  {idea.format} • {idea.platform}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">{idea.estimatedReachMultiplier}</span>
              </div>
              <h3 className="font-bold text-base text-white">{idea.title}</h3>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-amber-300 italic">
                Hook: {idea.hook}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">{idea.scriptOutline}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AICreatorGrowth;
