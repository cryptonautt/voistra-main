import React, { useState } from 'react';
import { User as UserIcon, ShieldCheck, Check, Globe, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { user, setUser, setIsOnboardingOpen } = useApp();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      bio,
      location
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black font-heading text-white">Account & Profile Settings</h1>
        <p className="text-xs text-gray-400">Manage your connected roles, social handles, and public marketplace profile.</p>
      </div>

      <form onSubmit={handleSave} className="p-8 glass-panel rounded-3xl border border-white/10 space-y-6">
        
        <div className="flex items-center gap-6 pb-6 border-b border-white/10">
          <img src={user.avatar} alt="" className="w-20 h-20 rounded-2xl border-2 border-indigo-500/40 object-cover" />
          <div>
            <h3 className="font-bold text-lg text-white">{user.name}</h3>
            <p className="text-xs text-gray-400">{user.email}</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
              <ShieldCheck size={14} /> Verified Member
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Bio / Headline</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all"
          >
            Re-run Onboarding Survey
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2"
          >
            {saved && <Check size={16} />}
            {saved ? 'Saved Changes!' : 'Save Settings'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SettingsPage;
