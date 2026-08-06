import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, UserCheck, Briefcase, Code, Cpu, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(['creator']);
  const [niche, setNiche] = useState('AI & Technology');
  const [skills, setSkills] = useState('React, Next.js, AI Prompting');
  const [bio, setBio] = useState('Building next-gen digital experiences & creating AI content.');

  if (!isOnboardingOpen) return null;

  const roleOptions: { id: UserRole; title: string; desc: string; icon: any }[] = [
    { id: 'creator', title: 'Content Creator', desc: 'Grow audience & monetize social platforms', icon: UserCheck },
    { id: 'founder', title: 'Founder / Business', desc: 'Hire creators, tech experts & run campaigns', icon: Briefcase },
    { id: 'tech_provider', title: 'Tech Service Provider', desc: 'Offer software, web, AI or design services', icon: Code },
    { id: 'ai_manager', title: 'AI Manager', desc: 'Manage AI accounts & operations for clients', icon: Cpu },
    { id: 'tasker', title: 'AI Tasker / Freelancer', desc: 'Work under managers or independently on tasks', icon: Wrench }
  ];

  const toggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter(r => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleFinish = () => {
    completeOnboarding(selectedRoles, { niche, skills, bio });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div className="relative w-full max-w-xl p-8 glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl overflow-hidden animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Personalize Your Ecosystem</h2>
              <p className="text-xs text-gray-400">Step {step} of 2 – Tailoring your Voistra dashboard</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-white/10'}`}></div>
            <div className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-white/10'}`}></div>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Select Your Roles (Choose 1 or Multiple)</h3>
            <p className="text-xs text-gray-400 mb-6">Voistra configures your dashboard modules automatically based on your roles.</p>
            
            <div className="space-y-3 mb-8">
              {roleOptions.map(role => {
                const Icon = role.icon;
                const isSelected = selectedRoles.includes(role.id);
                return (
                  <div
                    key={role.id}
                    onClick={() => toggleRole(role.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                      ? 'bg-indigo-600/15 border-indigo-500/60 shadow-lg shadow-indigo-500/10' 
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{role.title}</h4>
                        <p className="text-xs text-gray-400">{role.desc}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-white/20'
                    }`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl text-sm shadow-lg shadow-indigo-500/25 transition-all"
            >
              Continue to Details
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Tell Us About Yourself</h3>
            <p className="text-xs text-gray-400 mb-6">This helps clients, collaborators, and AI recommendations match your profile.</p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Primary Niche / Industry</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. AI SaaS, Dev Tools, Web3, Fintech"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Key Skills & Services</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Video Editing, AI Agents, Prompting"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your background and goals..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-sm text-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl text-sm transition-all"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl text-sm shadow-lg shadow-indigo-500/25 transition-all"
              >
                Launch Dashboard
                <Check size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
