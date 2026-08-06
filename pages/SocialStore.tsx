
import React, { useState } from 'react';
import { ShoppingBag, Zap, Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SocialStore: React.FC = () => {
  const { user, rewards, ownedRewardIds, redeemReward } = useApp();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleRedeem = async (id: string) => {
    const res = await redeemReward(id);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
    } else {
      setMessage({ type: 'error', text: res.message });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-20 right-6 z-[60] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-right duration-300 ${
          message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
          <span className="font-bold text-sm">{message.text}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 bg-indigo-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Social Store</h1>
          <p className="text-indigo-100 max-w-lg mb-8">
            Redeem your hard-earned XP for exclusive project allocations, NFT whitelists, and private community perks.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-100">Your Balance</span>
              <span className="text-3xl font-black">{user.xp.toLocaleString()} XP</span>
            </div>
            <button className="p-4 bg-white text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-colors">
              <ShoppingBag size={24} />
            </button>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-end">
          <div className="flex items-center gap-2 mb-4 bg-black/20 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider">
            <Zap size={14} fill="currentColor" className="text-yellow-400" />
            MegaETH Testnet Rewards Active
          </div>
          <p className="text-indigo-100 text-sm text-right max-w-xs">
            New rewards are added every 48 hours. Connect with projects to unlock exclusive tiers.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Rewards</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">All</button>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">Allocations</button>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">NFTs</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map(reward => {
            const isOwned = ownedRewardIds.includes(reward.id);
            const canAfford = user.xp >= reward.costXP;

            return (
              <div key={reward.id} className="glass-panel rounded-3xl overflow-hidden hover:scale-[1.02] transition-all group border border-white/5">
                <div className="relative h-48 overflow-hidden">
                  <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                      {reward.category}
                    </span>
                  </div>
                  {isOwned && (
                    <div className="absolute inset-0 bg-indigo-500/20 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2">
                        <CheckCircle2 size={18} /> REDEEMED
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10 line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest">Price</span>
                      <span className={`text-xl font-black ${canAfford || isOwned ? 'text-white' : 'text-red-400'}`}>
                        {reward.costXP.toLocaleString()} XP
                      </span>
                    </div>
                    {isOwned ? (
                      <button className="px-6 py-3 rounded-xl font-bold bg-white/5 text-gray-400 cursor-not-allowed border border-white/10">
                        Unlocked
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleRedeem(reward.id)}
                        disabled={!canAfford}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                          canAfford 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                            : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                        }`}
                      >
                        {canAfford ? 'Redeem' : 'Insufficient XP'}
                      </button>
                    )}
                  </div>
                </div>
                <div className="bg-white/[0.02] border-t border-white/5 p-4 flex items-center gap-2 text-xs text-gray-500">
                  <Info size={14} />
                  {isOwned ? 'Redemption code sent to your wallet profile.' : 'One-time redemption only.'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialStore;
