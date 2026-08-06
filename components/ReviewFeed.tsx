
import React from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Star, ShieldCheck, Ghost } from 'lucide-react';
import { PROJECTS } from '../constants';
import { useApp } from '../context/AppContext';
import { Review } from '../types';

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  const { user } = useApp();
  const project = PROJECTS.find(p => p.id === review.projectId);
  
  const displayName = review.isAnonymous ? "CLOAKED AGENT" : user.name.toUpperCase();
  const displayAvatar = review.isAnonymous ? null : user.avatar;

  return (
    <div className={`p-8 hover:bg-white/[0.01] transition-all cursor-pointer group relative overflow-hidden ${review.isAnonymous ? 'bg-indigo-500/[0.02]' : ''}`}>
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      {review.isAnonymous && (
        <div className="absolute top-0 right-0 p-4">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
            <Ghost size={10} /> Redacted Metadata
          </div>
        </div>
      )}

      <div className="flex gap-6 relative z-10">
        <div className="flex-shrink-0 relative">
          {review.isAnonymous ? (
            <div className="w-14 h-14 rounded-2xl bg-black border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[inset_0_0_15px_rgba(99,102,241,0.2)]">
              <Ghost size={24} />
            </div>
          ) : (
            <>
              <img src={displayAvatar!} alt="User" className="w-14 h-14 rounded-2xl object-cover premium-border" />
              <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-lg p-1 border-2 border-black">
                <ShieldCheck size={12} className="text-white fill-white/20" />
              </div>
            </>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className={`font-black text-sm tracking-tight hover:text-indigo-400 transition-colors ${review.isAnonymous ? 'text-indigo-300' : ''}`}>
                {displayName}
              </span>
              {!review.isAnonymous && (
                <div className="flex gap-1.5">
                  {user.skills.map(skill => (
                    <span key={skill} className="text-[9px] px-2 py-0.5 rounded bg-black/50 border border-white/10 text-gray-400 font-bold tracking-widest uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {review.isAnonymous && (
                <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20 text-indigo-500 font-bold tracking-widest uppercase">
                  Verified MegaETH User
                </span>
              )}
              <span className="text-gray-600 text-[11px] font-mono font-bold tracking-tighter">/ {review.timestamp}</span>
            </div>
            <button className="text-gray-600 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <p className={`text-gray-400 text-sm leading-relaxed mb-6 font-medium max-w-2xl ${review.isAnonymous ? 'italic' : ''}`}>
            {review.content}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 py-2 px-4 rounded-xl bg-white/5 border border-white/5">
               <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors">
                <MessageSquare size={16} />
                <span className="text-[10px] font-black">{review.replies}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
                <Heart size={16} />
                <span className="text-[10px] font-black">{review.likes}</span>
              </button>
              <button className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Share2 size={16} />
              </button>
            </div>

            {project && (
              <div className="flex items-center gap-2 bg-indigo-500/5 px-3 py-1.5 rounded-xl border border-indigo-500/10 group/project">
                <img src={project.logo} className="w-4 h-4 rounded-md filter grayscale group-hover/project:grayscale-0 transition-all" alt="" />
                <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">Insights on {project.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewFeed: React.FC = () => {
  const { reviews } = useApp();
  
  return (
    <div className="glass-panel rounded-[32px] overflow-hidden premium-border shadow-2xl">
      <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Social Insight Feed</h3>
        <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">Live Update</button>
      </div>
      <div className="divide-y divide-white/5">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div className="p-20 text-center">
            <div className="inline-flex w-16 h-16 rounded-3xl bg-white/5 items-center justify-center text-gray-600 mb-4 border border-white/10">
              <Star size={32} />
            </div>
            <p className="text-gray-500 font-bold text-sm tracking-tight uppercase tracking-widest">Awaiting first on-chain review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewFeed;
