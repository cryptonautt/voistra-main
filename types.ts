export type UserRole = 'creator' | 'founder' | 'tech_provider' | 'ai_manager' | 'tasker';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  activeRole: UserRole;
  bio: string;
  location: string;
  verified: boolean;
  walletAddress?: string;
  score: number;
  xp: number;
  joinedDate: string;
  socials?: {
    instagram?: string;
    tiktok?: string;
    x?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  platforms: ('Instagram' | 'TikTok' | 'X' | 'YouTube' | 'LinkedIn')[];
  totalFollowers: number;
  avgEngagement: number; // percentage
  creatorScore: number; // 0-100
  verified: boolean;
  location: string;
  hourlyRate: number;
  startingCampaignRate: number;
  bio: string;
  portfolio: { id: string; title: string; image: string; type: string; url?: string }[];
  audienceDemographics: { topCountry: string; topAgeGroup: string; maleRatio: number; femaleRatio: number };
  reviewsCount: number;
  rating: number; // 1-5
}

export interface TechProviderProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: 'Software Dev' | 'Web Dev' | 'Mobile Dev' | 'UI/UX Design' | 'AI & Prompt Eng' | 'DevOps & Cloud' | 'Data & ML';
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  projectStartingRate: number;
  location: string;
  verified: boolean;
  bio: string;
  portfolio: { id: string; title: string; image: string; description: string; link?: string }[];
  completedProjects: number;
  rating: number;
  reviewsCount: number;
  availability: 'Full-time' | 'Part-time' | 'Contract';
}

export interface AIManagerProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  platformsManaged: string[];
  experienceYears: number;
  successRate: number; // percentage
  activeClients: number;
  monthlyRate: number;
  verified: boolean;
  languages: string[];
  bio: string;
  rating: number;
  reviewsCount: number;
  teamSize: number;
}

export interface TaskerProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  skills: string[];
  platformsWorked: string[];
  hourlyRate: number;
  completedTasks: number;
  rating: number;
  reviewsCount: number;
  availability: 'Immediate' | 'Within 1 Week' | 'Busy';
  managerId?: string;
  bio: string;
}

export interface Campaign {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  category: 'Influencer Marketing' | 'Product Launch' | 'Beta Testing' | 'Tech Service' | 'Content Creation';
  budget: number;
  deadline: string;
  targetNiche: string;
  minFollowers?: number;
  requiredPlatforms: string[];
  deliverables: string[];
  status: 'Open' | 'In Progress' | 'Completed';
  applicantsCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; url: string; size: string }[];
  read: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerRole: string;
  targetId: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle: string;
}

export interface AIInsight {
  id: string;
  type: 'strength' | 'weakness' | 'opportunity' | 'risk';
  title: string;
  description: string;
  impactScore: number;
}

export interface ContentIdea {
  id: string;
  platform: string;
  format: string;
  title: string;
  hook: string;
  scriptOutline: string;
  estimatedReachMultiplier: string;
}
