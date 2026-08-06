
import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet } = useApp();
  const [connecting, setConnecting] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnect = async (name: string) => {
    setConnecting(name);
    await connectWallet();
    setConnecting(null);
    onClose();
  };

  const providers = [
    { name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' },
    { name: 'Coinbase Wallet', icon: 'https://avatars.githubusercontent.com/u/18060234?s=280&v=4' },
    { name: 'WalletConnect', icon: 'https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg' },
    { name: 'Rabby Wallet', icon: 'https://rabby.io/static/images/logo.png' }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md glass-panel rounded-[32px] premium-border overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black uppercase tracking-widest">Connect Wallet</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-400 text-sm font-medium leading-relaxed">
            Choose an EVM wallet to connect to Voistra. You will be redirected to authorize the connection.
          </p>
        </div>

        <div className="p-6 space-y-3">
          {providers.map((p) => (
            <button
              key={p.name}
              disabled={!!connecting}
              onClick={() => handleConnect(p.name)}
              className="w-full p-4 flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-xl p-2 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src={p.icon} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-sm tracking-tight">{p.name}</span>
              </div>
              {connecting === p.name ? (
                <Loader2 size={18} className="animate-spin text-indigo-400" />
              ) : (
                <ArrowRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 bg-indigo-500/5 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            New to MegaETH? <button className="text-indigo-400 hover:underline">Get testnet assets</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
