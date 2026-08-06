import { 
  User, 
  CreatorProfile, 
  TechProviderProfile, 
  AIManagerProfile, 
  TaskerProfile, 
  Campaign, 
  AIInsight, 
  ContentIdea,
  Review 
} from './types';

export const INITIAL_USER: User = {
  id: 'u-1',
  name: 'Alex Vance',
  email: 'alex@vancemedia.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  roles: ['creator', 'founder', 'tech_provider'],
  activeRole: 'creator',
  bio: 'Tech founder & Content Creator building AI tools. 120k+ audience across YouTube & X.',
  location: 'San Francisco, CA',
  verified: true,
  walletAddress: '0x71C...89A2',
  score: 88,
  xp: 14850,
  joinedDate: 'Jan 2025',
  socials: {
    x: 'https://x.com/alexvance',
    youtube: 'https://youtube.com/@alexvance',
    github: 'https://github.com/alexvance',
    linkedin: 'https://linkedin.com/in/alexvance'
  }
};

export const MOCK_CREATORS: CreatorProfile[] = [
  {
    id: 'c-1',
    name: 'Elena Rostova',
    handle: '@elenacreates',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    niche: 'AI & Tech Workflows',
    platforms: ['YouTube', 'X', 'LinkedIn'],
    totalFollowers: 245000,
    avgEngagement: 6.4,
    creatorScore: 94,
    verified: true,
    location: 'Austin, TX',
    hourlyRate: 150,
    startingCampaignRate: 1200,
    bio: 'Educating founders and dev teams on AI agents, automation, and modern web apps.',
    portfolio: [
      { id: 'p1', title: 'Top 5 AI Tools for Developers in 2026', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', type: 'Video' },
      { id: 'p2', title: 'Building a Fullstack App with Gemini 3.5', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600', type: 'Review' }
    ],
    audienceDemographics: { topCountry: 'United States (42%)', topAgeGroup: '25-34', maleRatio: 65, femaleRatio: 35 },
    reviewsCount: 38,
    rating: 4.9
  },
  {
    id: 'c-2',
    name: 'Marcus Chen',
    handle: '@marcus_builds',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    niche: 'SaaS Growth & Design',
    platforms: ['Instagram', 'TikTok', 'X'],
    totalFollowers: 180000,
    avgEngagement: 8.1,
    creatorScore: 91,
    verified: true,
    location: 'London, UK',
    hourlyRate: 125,
    startingCampaignRate: 950,
    bio: 'Product designer & SaaS breakdown specialist. Transforming clunky UI into slick experiences.',
    portfolio: [
      { id: 'p3', title: 'Redesigning Linear Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', type: 'Carousel' }
    ],
    audienceDemographics: { topCountry: 'United Kingdom (38%)', topAgeGroup: '20-28', maleRatio: 58, femaleRatio: 42 },
    reviewsCount: 29,
    rating: 4.85
  },
  {
    id: 'c-3',
    name: 'Sophia Martinez',
    handle: '@sophiacodes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    niche: 'Web3 & Fintech',
    platforms: ['X', 'LinkedIn', 'YouTube'],
    totalFollowers: 95000,
    avgEngagement: 5.8,
    creatorScore: 88,
    verified: true,
    location: 'Miami, FL',
    hourlyRate: 110,
    startingCampaignRate: 800,
    bio: 'Web3 developer advocate. Deep dives into smart contracts, high-speed L1s, and crypto infrastructure.',
    portfolio: [
      { id: 'p4', title: 'MegaETH Architecture breakdown', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600', type: 'Article' }
    ],
    audienceDemographics: { topCountry: 'United States (55%)', topAgeGroup: '22-35', maleRatio: 72, femaleRatio: 28 },
    reviewsCount: 19,
    rating: 5.0
  }
];

export const MOCK_TECH_PROVIDERS: TechProviderProfile[] = [
  {
    id: 'tp-1',
    name: 'Kaito Tanaka',
    title: 'Senior AI & Fullstack Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    category: 'AI & Prompt Eng',
    skills: ['React', 'Next.js', 'Python', 'PyTorch', 'Gemini API', 'TypeScript', 'TailwindCSS'],
    experienceYears: 7,
    hourlyRate: 95,
    projectStartingRate: 2500,
    location: 'Tokyo, Japan (Remote)',
    verified: true,
    bio: 'Building production AI agents, LLM integrations, and ultra-fast web apps. Ex-Vercel contractor.',
    portfolio: [
      { id: 'port1', title: 'Autonomous Code Review Bot', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600', description: 'Built LLM pipeline processing 10k+ PRs monthly.' },
      { id: 'port2', title: 'Realtime Financial AI Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', description: 'Next.js 15 app with live WebSocket streaming.' }
    ],
    completedProjects: 44,
    rating: 4.98,
    reviewsCount: 41,
    availability: 'Full-time'
  },
  {
    id: 'tp-2',
    name: 'Sarah Jenkins',
    title: 'Lead UI/UX & Motion Designer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    category: 'UI/UX Design',
    skills: ['Figma', 'Design Systems', 'Framer', 'Prototyping', 'User Research', 'CSS Animations'],
    experienceYears: 6,
    hourlyRate: 85,
    projectStartingRate: 1800,
    location: 'Toronto, Canada',
    verified: true,
    bio: 'Crafting pixel-perfect dark mode interfaces and interactive Framer sites for high-growth tech startups.',
    portfolio: [
      { id: 'port3', title: 'Neon SaaS Design System', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600', description: 'Complete component library in Figma & Tailwind.' }
    ],
    completedProjects: 36,
    rating: 4.95,
    reviewsCount: 32,
    availability: 'Part-time'
  },
  {
    id: 'tp-3',
    name: 'David O\'Connor',
    title: 'DevOps & Cloud Architect',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    category: 'DevOps & Cloud',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'PostgreSQL'],
    experienceYears: 9,
    hourlyRate: 110,
    projectStartingRate: 3000,
    location: 'Dublin, Ireland',
    verified: true,
    bio: 'Architecting zero-downtime cloud infrastructure and automated deployment pipelines.',
    portfolio: [
      { id: 'port4', title: 'Global Multi-Region K8s Cluster', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600', description: '99.999% uptime infra scaling to 2M DAU.' }
    ],
    completedProjects: 52,
    rating: 5.0,
    reviewsCount: 48,
    availability: 'Contract'
  }
];

export const MOCK_AI_MANAGERS: AIManagerProfile[] = [
  {
    id: 'am-1',
    name: 'Liam Thorne',
    title: 'Certified AI Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    platformsManaged: ['Midjourney', 'ElevenLabs', 'Make.com', 'OpenAI Workspaces', 'HeyGen'],
    experienceYears: 4,
    successRate: 98.2,
    activeClients: 6,
    monthlyRate: 1800,
    verified: true,
    languages: ['English', 'Spanish'],
    bio: 'Managing automated content engines and AI account operations for top digital brands.',
    rating: 4.9,
    reviewsCount: 24,
    teamSize: 5
  },
  {
    id: 'am-2',
    name: 'Aria Montgomery',
    title: 'AI Social & Avatar Operations Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    platformsManaged: ['RunwayML', 'ChatGPT Enterprise', 'Zapier Central', 'Captions.ai'],
    experienceYears: 3,
    successRate: 96.5,
    activeClients: 4,
    monthlyRate: 1500,
    verified: true,
    languages: ['English', 'French'],
    bio: 'Specializing in synthetic media workflows, automated viral clipping, and AI brand ambassadors.',
    rating: 4.88,
    reviewsCount: 18,
    teamSize: 3
  }
];

export const MOCK_TASKERS: TaskerProfile[] = [
  {
    id: 't-1',
    name: 'Devon Brooks',
    title: 'AI Video Editor & Prompt Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    skills: ['CapCut', 'Runway Gen-3', 'Midjourney v6', 'Subtitles', 'Voice Cloning'],
    platformsWorked: ['YouTube Shorts', 'TikTok', 'Instagram Reels'],
    hourlyRate: 35,
    completedTasks: 120,
    rating: 4.92,
    reviewsCount: 45,
    availability: 'Immediate',
    bio: 'Fast turnarounds on AI short-form videos, sound design, and prompt engineering.'
  },
  {
    id: 't-2',
    name: 'Nadia Patel',
    title: 'AI Data Annotator & Script Generator',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    skills: ['Prompt Fine-Tuning', 'Copywriting', 'ChatGPT', 'Notion AI', 'Research'],
    platformsWorked: ['LinkedIn', 'X Threads', 'Blog Posts'],
    hourlyRate: 30,
    completedTasks: 85,
    rating: 4.85,
    reviewsCount: 30,
    availability: 'Within 1 Week',
    bio: 'Polishing AI scripts, organizing research databases, and managing social queues.'
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    companyName: 'Aetheria AI Studio',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    title: 'Launch Campaign: Next-Gen AI Video Generator',
    description: 'We are seeking tech & creator influencers to produce 60-second review videos demonstrating Aetheria AI.',
    category: 'Influencer Marketing',
    budget: 3500,
    deadline: 'Aug 25, 2026',
    targetNiche: 'AI & Tech',
    minFollowers: 10000,
    requiredPlatforms: ['YouTube', 'TikTok', 'X'],
    deliverables: ['1x Short-form Video', '1x X Thread', 'Raw Video Rights'],
    status: 'Open',
    applicantsCount: 18
  },
  {
    id: 'camp-2',
    companyName: 'Veloce Web3 Cloud',
    companyLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=150',
    title: 'Fullstack Next.js Developer for Developer Portal',
    description: 'Looking for a senior frontend dev to build out our dark-mode API docs & dashboard with interactive code sandboxes.',
    category: 'Tech Service',
    budget: 6000,
    deadline: 'Sep 01, 2026',
    targetNiche: 'Software Dev',
    requiredPlatforms: ['GitHub', 'Vercel'],
    deliverables: ['Next.js App', 'Tailwind Components', 'API Docs Integration'],
    status: 'Open',
    applicantsCount: 12
  },
  {
    id: 'camp-3',
    companyName: 'Hyperion Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150',
    title: 'AI Prompt Manager & Automated Workflow Setup',
    description: 'Need an experienced AI Operations Manager to configure Make.com + Gemini workflows for customer support ticketing.',
    category: 'Beta Testing',
    budget: 2200,
    deadline: 'Aug 20, 2026',
    targetNiche: 'Automation',
    requiredPlatforms: ['Make.com', 'Zapier'],
    deliverables: ['Automated Scenario', 'Documentation', '1-on-1 Onboarding Call'],
    status: 'Open',
    applicantsCount: 9
  }
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    type: 'opportunity',
    title: 'Strong Initial Hook Retention',
    description: 'Your videos retain 74% of viewers past the 5-second mark, which is 18% higher than average tech creators.',
    impactScore: 92
  },
  {
    id: 'ins-2',
    type: 'weakness',
    title: 'Inconsistent Posting Cadence',
    description: 'Posting gaps of more than 4 days are lowering algorithmic reach by ~32% on YouTube Shorts & TikTok.',
    impactScore: 68
  },
  {
    id: 'ins-3',
    type: 'strength',
    title: 'High Developer & Founder Audience Concentration',
    description: '62% of your audience consists of founders, engineers, and product leads, making your sponsorship conversion rate top-tier.',
    impactScore: 95
  }
];

export const MOCK_CONTENT_IDEAS: ContentIdea[] = [
  {
    id: 'ci-1',
    platform: 'YouTube Shorts / TikTok',
    format: 'Reel / Short',
    title: 'How I Automate 80% of My Code Reviews in 2026',
    hook: '"If you are still manually line-checking PRs in 2026, you are wasting 10 hours every week..."',
    scriptOutline: '1. Show terminal popup. 2. Demonstrate Gemini CLI agent catching edge cases. 3. Show instant summary output.',
    estimatedReachMultiplier: '3.2x Viral Potential'
  },
  {
    id: 'ci-2',
    platform: 'X (Twitter)',
    format: 'Thread',
    title: '10 AI Tools That Are Secretly Replacing $100k SaaS Subscriptions',
    hook: 'The AI stack for solo founders in 2026 is absurd. Here are 10 tools replacing whole teams:',
    scriptOutline: 'Break down tool names, pricing comparison, open-source alternatives, and key use cases.',
    estimatedReachMultiplier: '2.5x Engagement'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    reviewerName: 'Marcus Vance (CEO @ PulseTech)',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    reviewerRole: 'Client / Founder',
    targetId: 'c-1',
    rating: 5.0,
    comment: 'Elena delivered exceptional results for our AI launch campaign! Over 140k targeted video views and 450+ signups.',
    date: 'July 28, 2026',
    projectTitle: 'PulseTech AI Campaign'
  },
  {
    id: 'rev-2',
    reviewerName: 'Sarah Jenkins',
    reviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    reviewerRole: 'Design Lead',
    targetId: 'tp-1',
    rating: 5.0,
    comment: 'Kaito is a wizard with Next.js and LLM integrations. Delivered ahead of schedule with spotless code.',
    date: 'July 15, 2026',
    projectTitle: 'Interactive Sandbox Build'
  }
];
