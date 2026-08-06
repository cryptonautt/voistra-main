import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Zap, 
  Users, 
  Code, 
  Cpu, 
  Wrench, 
  Star, 
  ChevronDown, 
  Globe 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_CREATORS, MOCK_TECH_PROVIDERS, MOCK_CAMPAIGNS } from '../constants';

export const LandingPage: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'creators' | 'tech' | 'campaigns'>('creators');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'What is Voistra?', a: 'Voistra is an all-in-one platform combining AI social media growth tools, a creator campaign marketplace, a tech services directory, and an AI workforce marketplace into a single ecosystem.' },
    { q: 'How does the AI Creator Growth score work?', a: 'Our Gemini AI analyzes engagement rates, audience retention, posting consistency, and content quality to give you a 0-100 Creator Score along with natural language action plans.' },
    { q: 'Who can join Voistra?', a: 'Creators, tech professionals (software devs, UI/UX designers, AI prompt engineers), founders, AI operations managers, and taskers looking for opportunities.' },
    { q: 'Are transactions and reviews verified?', a: 'Yes! Every collaboration produces verified ratings and client reviews, helping professionals build an unforgeable reputation.' }
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-glow">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-bounce">
            <Sparkles size={16} />
            Next-Gen AI & Professional Marketplace Ecosystem
          </div>

          <h1 className="text-5xl sm:text-7xl font-black font-heading tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Grow your audience. <br />
            <span className="shimmer-text">Monetize your skills.</span> <br />
            Connect with opportunities.
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            The intelligent platform where content creators, tech professionals, AI managers, and founders build reputational authority and collaborate seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Create Free Account
              <ArrowRight size={20} />
            </button>
            
            <a
              href="#explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass-panel hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl text-base transition-all"
            >
              Explore Marketplace
            </a>
          </div>

          {/* Interactive Feature Preview Card */}
          <div className="relative max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-indigo-500/30 shadow-2xl overflow-hidden neon-border">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-gray-400 ml-2">app.voistra.io/creator-growth</span>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1">
                <Zap size={14} /> Gemini 3.5 AI Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Overall Creator Score</div>
                <div className="text-4xl font-black text-white font-mono mb-2">94 <span className="text-xs text-emerald-400 font-sans font-normal">+6 this week</span></div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 w-11/12"></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">AI Growth Insight</div>
                <p className="text-xs text-gray-200 leading-normal">
                  "Your video hook retention past 8 seconds is 74% above average. Post 2x weekly to double monthly reach."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Active Opportunities</div>
                <p className="text-xl font-bold text-white mb-1">14 Tech Campaigns</p>
                <p className="text-xs text-emerald-400 font-semibold">$18,500 Total Budget Available</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Overview Pillars */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#07090e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">Four Marketplaces. One Unified Platform.</h2>
            <p className="text-gray-400 text-sm sm:text-base">Designed for modern digital professionals and growth-focused businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 glass-panel glass-panel-hover rounded-3xl border border-white/10">
              <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-2xl w-fit mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Creator Growth & Directory</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                AI analytics, Creator Scores, competitor benchmarks, and direct campaign hiring for influencers.
              </p>
              <span className="text-xs font-bold text-indigo-400">Explore Creators →</span>
            </div>

            <div className="p-8 glass-panel glass-panel-hover rounded-3xl border border-white/10">
              <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-6">
                <Code size={28} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Tech Services Marketplace</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Hire vetted engineers, UI/UX designers, AI prompt experts, and DevOps specialists.
              </p>
              <span className="text-xs font-bold text-emerald-400">Find Tech Talent →</span>
            </div>

            <div className="p-8 glass-panel glass-panel-hover rounded-3xl border border-white/10">
              <div className="p-4 bg-purple-500/20 text-purple-400 rounded-2xl w-fit mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">AI Manager Directory</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Connect with verified operators who run synthetic media, automation pipelines, and AI accounts.
              </p>
              <span className="text-xs font-bold text-purple-400">Hire AI Managers →</span>
            </div>

            <div className="p-8 glass-panel glass-panel-hover rounded-3xl border border-white/10">
              <div className="p-4 bg-amber-500/20 text-amber-400 rounded-2xl w-fit mb-6">
                <Wrench size={28} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">AI Tasker Marketplace</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Freelancers for video editing, prompt fine-tuning, annotations, and social workflow execution.
              </p>
              <span className="text-xs font-bold text-amber-400">Browse Taskers →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Marketplace Interactive Showcase */}
      <section id="explore" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-2">Explore Active Talent & Opportunities</h2>
              <p className="text-xs text-gray-400">Live profiles and campaigns ready for instant connection.</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0 p-1 glass-panel rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('creators')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'creators' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                Top Creators
              </button>
              <button
                onClick={() => setActiveTab('tech')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'tech' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                Tech Pros
              </button>
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'campaigns' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                Brand Campaigns
              </button>
            </div>
          </div>

          {activeTab === 'creators' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_CREATORS.map(creator => (
                <div key={creator.id} className="p-6 glass-panel rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={creator.avatar} alt="" className="w-14 h-14 rounded-2xl border border-white/10 object-cover" />
                    <div>
                      <h4 className="font-bold text-base text-white">{creator.name}</h4>
                      <p className="text-xs text-indigo-400 font-mono">{creator.handle}</p>
                      <p className="text-[11px] text-gray-400">{creator.niche}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-white/[0.03] rounded-2xl text-center">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Followers</p>
                      <p className="text-sm font-bold text-white font-mono">{(creator.totalFollowers / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">AI Score</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">{creator.creatorScore}/100</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all"
                  >
                    View Profile & Connect
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TECH_PROVIDERS.map(provider => (
                <div key={provider.id} className="p-6 glass-panel rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={provider.avatar} alt="" className="w-14 h-14 rounded-2xl border border-white/10 object-cover" />
                    <div>
                      <h4 className="font-bold text-base text-white">{provider.name}</h4>
                      <p className="text-xs text-emerald-400 font-semibold">{provider.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {provider.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-white/5 rounded-lg text-[10px] text-gray-300 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-white pt-3 border-t border-white/10">
                    <span>${provider.hourlyRate}/hr</span>
                    <button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black rounded-lg transition-all"
                    >
                      Hire Talent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_CAMPAIGNS.map(camp => (
                <div key={camp.id} className="p-6 glass-panel rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                    {camp.category}
                  </span>
                  <h4 className="font-bold text-base text-white mb-2">{camp.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">{camp.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Budget</p>
                      <p className="text-base font-bold text-white font-mono">${camp.budget.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#07090e]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">Transparent Pricing for Everyone</h2>
            <p className="text-gray-400 text-sm">Start free and scale as your social presence or team expands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 glass-panel rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Free Starter</h3>
              <p className="text-xs text-gray-400 mb-6">For emerging creators & casual freelancers.</p>
              <div className="text-4xl font-black font-mono text-white mb-6">$0 <span className="text-xs text-gray-500">/ forever</span></div>
              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Basic Creator Score</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Browse All Marketplaces</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Apply to 3 Campaigns/mo</li>
              </ul>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl text-xs transition-all"
              >
                Get Started Free
              </button>
            </div>

            <div className="p-8 glass-panel rounded-3xl border-2 border-indigo-500 relative shadow-2xl shadow-indigo-500/20">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pro Creator & Pro Tech</h3>
              <p className="text-xs text-gray-400 mb-6">For active creators, tech pros & AI managers.</p>
              <div className="text-4xl font-black font-mono text-white mb-6">$29 <span className="text-xs text-gray-500">/ month</span></div>
              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Advanced Gemini AI Growth Insights</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Unlimited Campaign Applications</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Verified Profile Badge & Top Ranking</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Competitor Benchmarking Suite</li>
              </ul>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            <div className="p-8 glass-panel rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Business & Enterprise</h3>
              <p className="text-xs text-gray-400 mb-6">For brands, agencies & hiring teams.</p>
              <div className="text-4xl font-black font-mono text-white mb-6">$99 <span className="text-xs text-gray-500">/ month</span></div>
              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Unlimited Campaign Publishing</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Direct Hire Escrow & Contracts</li>
              </ul>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl text-xs transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="p-6 glass-panel rounded-2xl border border-white/10 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center font-bold text-base text-white">
                <span>{faq.q}</span>
                <ChevronDown size={20} className={`transform transition-transform ${openFaq === index ? 'rotate-180 text-indigo-400' : 'text-gray-500'}`} />
              </div>
              {openFaq === index && (
                <p className="mt-4 text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <p>© 2026 Voistra AI Ecosystem. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
