import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  CreatorProfile, 
  TechProviderProfile, 
  AIManagerProfile, 
  TaskerProfile, 
  Campaign, 
  Message 
} from '../types';
import { 
  INITIAL_USER, 
  MOCK_CREATORS, 
  MOCK_TECH_PROVIDERS, 
  MOCK_AI_MANAGERS, 
  MOCK_TASKERS, 
  MOCK_CAMPAIGNS 
} from '../constants';

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  creators: CreatorProfile[];
  techProviders: TechProviderProfile[];
  aiManagers: AIManagerProfile[];
  taskers: TaskerProfile[];
  campaigns: Campaign[];
  messages: Message[];
  unreadMessagesCount: number;
  notificationsCount: number;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  selectedRecipient: { id: string; name: string; avatar: string } | null;
  setSelectedRecipient: (recipient: { id: string; name: string; avatar: string } | null) => void;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'applicantsCount'>) => void;
  applyToCampaign: (campaignId: string) => void;
  sendMessage: (recipientId: string, recipientName: string, recipientAvatar: string, text: string) => void;
  completeOnboarding: (selectedRoles: UserRole[], details: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('voistra_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [creators] = useState<CreatorProfile[]>(MOCK_CREATORS);
  const [techProviders] = useState<TechProviderProfile[]>(MOCK_TECH_PROVIDERS);
  const [aiManagers] = useState<AIManagerProfile[]>(MOCK_AI_MANAGERS);
  const [taskers] = useState<TaskerProfile[]>(MOCK_TASKERS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      senderId: 'c-1',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      recipientId: user.id,
      content: 'Hey Alex! Loved your recent video on Gemini CLI. Are you open for a collaboration?',
      timestamp: '10:42 AM',
      read: false
    },
    {
      id: 'm2',
      senderId: 'tp-1',
      senderName: 'Kaito Tanaka',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      recipientId: user.id,
      content: 'I checked your Next.js project spec. We can start onboarding tomorrow!',
      timestamp: 'Yesterday',
      read: true
    }
  ]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{ id: string; name: string; avatar: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('voistra_user', JSON.stringify(user));
  }, [user]);

  const setActiveRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, activeRole: role }));
  };

  const addCampaign = (newCamp: Omit<Campaign, 'id' | 'applicantsCount'>) => {
    const created: Campaign = {
      ...newCamp,
      id: `camp-${Date.now()}`,
      applicantsCount: 0
    };
    setCampaigns(prev => [created, ...prev]);
  };

  const applyToCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => c.id === campaignId ? { ...c, applicantsCount: c.applicantsCount + 1 } : c)
    );
  };

  const sendMessage = (recipientId: string, recipientName: string, recipientAvatar: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      recipientId,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const completeOnboarding = (selectedRoles: UserRole[], details: any) => {
    setUser(prev => ({
      ...prev,
      roles: selectedRoles,
      activeRole: selectedRoles[0] || 'creator',
      bio: details.bio || prev.bio
    }));
    setIsOnboardingOpen(false);
  };

  const unreadMessagesCount = messages.filter(m => m.recipientId === user.id && !m.read).length;

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      activeRole: user.activeRole,
      setActiveRole,
      creators,
      techProviders,
      aiManagers,
      taskers,
      campaigns,
      messages,
      unreadMessagesCount,
      notificationsCount: 3,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isOnboardingOpen,
      setIsOnboardingOpen,
      selectedRecipient,
      setSelectedRecipient,
      addCampaign,
      applyToCampaign,
      sendMessage,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
