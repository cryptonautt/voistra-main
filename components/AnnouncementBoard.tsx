
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { ACTIVITIES } from '../constants';

const AnnouncementBoard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const featured = ACTIVITIES.filter(a => a.image);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % featured.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div className="relative group mb-12">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-10 bg-indigo-600/10 blur-[100px] opacity-50"></div>
      
      <div className="relative aspect-[21/9] md:aspect-[21/7] rounded-[32px] overflow-hidden premium-border shadow-2xl">
        {featured.map((item, idx) => (
          <div 
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === current ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-1'}`}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/40 to-transparent"></div>
            
            <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-center p-12 md:p-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Zap size={12} className="text-indigo-400 fill-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100">Hot Alpha</span>
                </div>
                <div className="h-px w-8 bg-white/20"></div>
                <span className="text-[11px] font-mono font-bold text-indigo-400">
                  +{item.rewardXP} XP
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter max-w-2xl">
                {item.title}
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-10 opacity-80">
                {item.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button className="px-8 h-14 bg-white text-black hover:bg-indigo-500 hover:text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                  Enter Phase <ArrowRight size={18} />
                </button>
                <button className="px-8 h-14 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="absolute bottom-10 right-10 flex items-center gap-6">
          <div className="flex gap-2">
            {featured.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${idx === current ? 'w-12 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrent(prev => (prev - 1 + featured.length) % featured.length)}
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrent(prev => (prev + 1) % featured.length)}
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBoard;
