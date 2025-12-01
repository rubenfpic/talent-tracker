import { Candidate } from '../models/candidate.model';

export const mockCandidates: Candidate[] = [
  {
    id: 101,
    name: 'Alex Demo',
    email: 'alex.demo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    title: 'Talent Partner',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Sourcing', 'Stakeholder mgmt', 'ATS'],
    about: {
      soft: 'Alex Demo builds trust quickly with hiring managers, keeping search updates tight and transparent so teams feel supported.',
      tech: 'Strong with outbound sourcing, structured intake, and ATS hygiene; comfortable adapting playbooks for async-first setups.'
    }
  },
  {
    id: 102,
    name: 'Jamie Rivers',
    email: 'jamie.rivers@example.com',
    avatar: '',
    title: 'People Ops',
    location: 'Madrid',
    tags: ['Onboarding', 'Payroll', 'Culture'],
    about: {
      soft: 'Jamie Rivers keeps rituals smooth and people informed, balancing employee needs with process discipline.',
      tech: 'Experienced with onboarding flows, payroll vendors, and HRIS data integrity; keeps audits tight for hybrid teams.'
    }
  },
  {
    id: 103,
    name: 'Taylor Brooks',
    email: 'taylor.brooks@example.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    title: 'Frontend Engineer',
    location: 'Barcelona',
    tags: ['Angular', 'TypeScript', 'UI'],
    about: {
      soft: 'Taylor Brooks collaborates closely with design and product, clarifying requirements and sharing early UI drafts for feedback.',
      tech: 'Builds accessible, performant UIs in Angular and TypeScript; pairs often and optimizes bundle size for hybrid teams.'
    }
  },
  {
    id: 104,
    name: 'Morgan Lee',
    email: 'morgan.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?img=45',
    title: 'Recruiter',
    location: 'Valencia',
    tags: ['Full-cycle', 'LinkedIn', 'Interviews'],
    about: {
      soft: 'Morgan Lee listens carefully to hiring signals and sets clear expectations with candidates to ensure a respectful process.',
      tech: 'Runs full-cycle recruiting with robust intake docs, calibrated scorecards, and sourcing in LinkedIn and niche communities.'
    }
  },
  {
    id: 105,
    name: 'Jordan Vega',
    email: 'jordan.vega@example.com',
    avatar: 'https://i.pravatar.cc/150?img=47',
    title: 'People Analyst',
    location: 'Sevilla',
    tags: ['Reporting', 'Surveys', 'Excel'],
    about: {
      soft: 'Jordan Vega translates data into plain language so leaders can act without drowning in dashboards.',
      tech: 'Builds clean datasets, survey instrumentation, and exec-ready visuals; automates reporting to reduce manual drift.'
    }
  },
  {
    id: 106,
    name: 'Sam Carter',
    email: 'sam.carter@example.com',
    avatar: 'https://i.pravatar.cc/150?img=56',
    title: 'Product Designer',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['UX Research', 'Figma', 'Prototyping'],
    about: {
      soft: 'Sam Carter facilitates workshops and user reviews with empathy, keeping stakeholders aligned.',
      tech: 'Researches, prototypes in Figma, and iterates quickly with engineers; ensures handoffs include states and token usage.'
    }
  },
  {
    id: 107,
    name: 'Casey Morgan',
    email: 'casey.morgan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=64',
    title: 'HRBP',
    location: 'Bilbao',
    tags: ['Coaching', 'Change', 'Compliance'],
    about: {
      soft: 'Casey Morgan coaches managers through change with a calm, pragmatic tone.',
      tech: 'Aligns org design, performance cycles, and comp guidance; maintains compliance checklists suited to hybrid teams.'
    }
  },
  {
    id: 108,
    name: 'Riley Chen',
    email: 'riley.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    title: 'TA Specialist',
    location: 'Madrid',
    tags: ['Outbound', 'Pipeline', 'Screening'],
    about: {
      soft: 'Riley Chen keeps stakeholders looped in with concise pipeline notes and clear next steps.',
      tech: 'Excels at outbound, pipeline reporting, and structured screening; tunes funnels to remove friction for hybrid teams.'
    }
  },
  {
    id: 109,
    name: 'Avery Stone',
    email: 'avery.stone@example.com',
    avatar: 'https://i.pravatar.cc/150?img=21',
    title: 'Employer Branding',
    location: 'Barcelona',
    tags: ['Content', 'Events', 'Social media'],
    about: {
      soft: 'Avery Stone brings energy to events and internal comms, amplifying authentic stories from the team.',
      tech: 'Produces content calendars, event kits, and social narratives; measures campaign impact with clear KPIs.'
    }
  },
  {
    id: 110,
    name: 'Quinn Parker',
    email: 'quinn.parker@example.com',
    avatar: 'https://i.pravatar.cc/150?img=25',
    title: 'People Ops',
    location: 'Valencia',
    tags: ['People programs', 'HRIS', 'Benefits'],
    about: {
      soft: 'Quinn Parker keeps rituals smooth and people informed, balancing employee needs with process discipline.',
      tech: 'Experienced with onboarding flows, payroll vendors, and HRIS data integrity; keeps audits tight for hybrid teams.'
    }
  },
  {
    id: 111,
    name: 'Drew Navarro',
    email: 'drew.navarro@example.com',
    avatar: '',
    title: 'Talent Sourcer',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Boolean search', 'Prospecting', 'CRM'],
    about: {
      soft: 'Drew Navarro nurtures long-term relationships and shares market intel proactively.',
      tech: 'Crafts boolean strings, sequences, and CRM tags; experiments with new channels while keeping data tidy.'
    }
  }
];
