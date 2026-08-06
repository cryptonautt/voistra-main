import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Paperclip, CheckCheck, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Message } from '../types';

export const MessagingCenter: React.FC = () => {
  const { user, messages, sendMessage, selectedRecipient, setSelectedRecipient } = useApp();
  
  // Unique chat contacts
  const contactsMap = new Map<string, { id: string; name: string; avatar: string }>();
  messages.forEach(m => {
    if (m.senderId !== user.id) {
      contactsMap.set(m.senderId, { id: m.senderId, name: m.senderName, avatar: m.senderAvatar });
    } else {
      contactsMap.set(m.recipientId, { id: m.recipientId, name: 'Contact', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' });
    }
  });

  const contacts = Array.from(contactsMap.values());
  const [activeContact, setActiveContact] = useState<{ id: string; name: string; avatar: string }>(
    selectedRecipient || contacts[0] || { id: 'c-1', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150' }
  );

  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (selectedRecipient) {
      setActiveContact(selectedRecipient);
    }
  }, [selectedRecipient]);

  const activeMessages = messages.filter(
    m => (m.senderId === user.id && m.recipientId === activeContact.id) ||
         (m.senderId === activeContact.id && m.recipientId === user.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(activeContact.id, activeContact.name, activeContact.avatar, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black font-heading text-white">Messaging & Proposals</h1>
        <p className="text-xs text-gray-400">Real-time collaboration between creators, founders, tech providers & managers.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        
        {/* Contact List */}
        <div className="md:col-span-4 border-r border-white/10 p-4 space-y-2 bg-black/20">
          <div className="text-xs font-bold uppercase text-gray-500 tracking-wider px-3 mb-2">Conversations</div>
          {contacts.map(c => (
            <div
              key={c.id}
              onClick={() => {
                setActiveContact(c);
                setSelectedRecipient(c);
              }}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                activeContact.id === c.id ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <img src={c.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-xs text-white">{c.name}</h4>
                <p className="text-[11px] text-gray-400 truncate">Click to view chat history...</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Chat Window */}
        <div className="md:col-span-8 flex flex-col justify-between p-6">
          
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <img src={activeContact.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-sm text-white">{activeContact.name}</h3>
              <p className="text-[10px] text-emerald-400 font-mono">● Online & Ready</p>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="py-6 space-y-4 overflow-y-auto max-h-[380px] pr-2">
            {activeMessages.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                No messages yet. Send a message to start collaboration!
              </div>
            ) : (
              activeMessages.map(m => {
                const isMe = m.senderId === user.id;
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                      isMe 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                    }`}>
                      <p>{m.content}</p>
                      <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">{m.timestamp}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Type your proposal or message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow px-4 py-3 bg-white/5 border border-white/10 focus:border-indigo-500 rounded-2xl text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <Send size={16} /> Send
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default MessagingCenter;
