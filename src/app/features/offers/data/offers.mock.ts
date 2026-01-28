import { canonicalizeTags } from '@app/shared/utils/tag-normalizer';
import { Offer } from '../models/offer.model';

const rawOffers: Offer[] = [
  {
    id: 201,
    titleKey: 'frontend_engineer',
    description:
      'Build and maintain Angular interfaces for a hiring dashboard. Focus on reusable UI and clean TypeScript with design partners.',
    company: 'Northwind Labs',
    location: 'Barcelona',
    tags: ['Angular', 'TypeScript', 'UI'],
    salaryMin: 38000,
    salaryMax: 48000,
    experienceLevel: 'mid',
    experienceYears: 3,
    employmentType: 'full_time'
  },
  {
    id: 202,
    titleKey: 'frontend_engineer',
    description:
      'Remote frontend role focused on UI polish and steady collaboration. Ship components and improve usability in TypeScript.',
    company: 'Cloud Harbor',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['TypeScript', 'UI', 'Collaboration'],
    salaryMin: 32000,
    salaryMax: 40000,
    experienceLevel: 'junior',
    experienceYears: 1,
    employmentType: 'full_time'
  },
  {
    id: 203,
    titleKey: 'product_designer',
    description:
      'Own end to end product design from research to prototypes. Run sessions, build flows in Figma, and test with users.',
    company: 'Lumen Studio',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['UX Research', 'Figma', 'Prototyping'],
    salaryMin: 36000,
    salaryMax: 47000,
    experienceLevel: 'mid',
    experienceYears: 4,
    employmentType: 'full_time'
  },
  {
    id: 204,
    titleKey: 'people_ops',
    description:
      'Support onboarding and HRIS updates while keeping benefits documentation accurate. Coordinate vendors and keep processes tidy.',
    company: 'Blue Coast',
    location: 'Madrid',
    tags: ['Onboarding', 'HRIS', 'Benefits'],
    salaryMin: 30000,
    salaryMax: 38000,
    experienceLevel: 'mid',
    experienceYears: 3,
    employmentType: 'full_time'
  },
  {
    id: 205,
    titleKey: 'recruiter',
    description:
      'Run full cycle recruiting for commercial roles. Screen candidates, manage pipelines, and keep stakeholders informed.',
    company: 'Bright Path',
    location: 'Valencia',
    tags: ['Full-cycle', 'Interviews', 'Pipeline'],
    salaryMin: 35000,
    salaryMax: 45000,
    experienceLevel: 'senior',
    experienceYears: 5,
    employmentType: 'full_time'
  },
  {
    id: 206,
    titleKey: 'talent_sourcer',
    description:
      'Source candidates using boolean search and CRM tagging. Build prospect lists and maintain outreach sequences.',
    company: 'Orbit Talent',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Boolean search', 'Prospecting', 'CRM'],
    salaryMin: 26000,
    salaryMax: 32000,
    experienceLevel: 'junior',
    experienceYears: 1,
    employmentType: 'contract'
  },
  {
    id: 207,
    titleKey: 'people_analyst',
    description:
      'Analyze people data and produce reports for leaders. Run surveys, clean spreadsheets, and summarize trends.',
    company: 'Data Grove',
    location: 'Sevilla',
    tags: ['Reporting', 'Surveys', 'Excel'],
    salaryMin: 28000,
    salaryMax: 36000,
    experienceLevel: 'mid',
    experienceYears: 3,
    employmentType: 'full_time'
  },
  {
    id: 208,
    titleKey: 'employer_branding',
    description:
      'Plan employer branding content and event support. Manage social stories and coordinate external partners.',
    company: 'Signal Media',
    location: 'Barcelona',
    tags: ['Content', 'Events', 'Social media'],
    salaryMin: 22000,
    salaryMax: 28000,
    experienceLevel: 'mid',
    experienceYears: 4,
    employmentType: 'part_time'
  },
  {
    id: 209,
    titleKey: 'talent_partner',
    description:
      'Partner with hiring managers on intake and sourcing strategy. Review ATS data and improve the hiring flow.',
    company: 'Harbor Growth',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Sourcing', 'ATS', 'Stakeholder mgmt'],
    salaryMin: 45000,
    salaryMax: 60000,
    experienceLevel: 'senior',
    experienceYears: 6,
    employmentType: 'full_time'
  },
  {
    id: 210,
    titleKey: 'people_ops',
    description:
      'People ops generalist focused on payroll accuracy and culture support. Handle admin tasks and improve internal rituals.',
    company: 'Blue Coast',
    location: 'Valencia',
    tags: ['Payroll', 'Culture'],
    salaryMin: 25000,
    salaryMax: 30000,
    experienceLevel: 'junior',
    experienceYears: 1,
    employmentType: 'full_time'
  },
  {
    id: 211,
    titleKey: 'people_ops',
    description:
      'Flexible people ops support role for daily requests and light projects. Scope adapts to company needs and workload.',
    company: 'Harbor Growth',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['People-first', 'Growth'],
    experienceLevel: 'na',
    experienceYears: 0,
    employmentType: 'na'
  },
  {
    id: 212,
    titleKey: 'hrbp',
    description:
      'HRBP role coaching managers and ensuring compliance. Guide performance topics and keep policies updated.',
    company: 'PeopleCare',
    location: 'Bilbao',
    tags: ['Coaching', 'Compliance'],
    salaryMin: 50000,
    salaryMax: 65000,
    experienceLevel: 'senior',
    experienceYears: 7,
    employmentType: 'full_time'
  },
  {
    id: 213,
    titleKey: 'hrbp',
    description:
      'HRBP focused on change management and org updates. Work with leaders to plan transitions and communicate clearly.',
    company: 'PeopleCare',
    location: 'Madrid',
    tags: ['Change'],
    salaryMin: 40000,
    salaryMax: 48000,
    experienceLevel: 'mid',
    experienceYears: 4,
    employmentType: 'contract'
  },
  {
    id: 214,
    titleKey: 'ta_specialist',
    description:
      'Talent acquisition specialist managing outbound, screening, and pipeline health. Keep status updates consistent and timely.',
    company: 'TalentFlow',
    location: 'Madrid',
    tags: ['Outbound', 'Pipeline', 'Screening'],
    salaryMin: 30000,
    salaryMax: 36000,
    experienceLevel: 'mid',
    experienceYears: 3,
    employmentType: 'full_time'
  },
  {
    id: 215,
    titleKey: 'ta_specialist',
    description:
      'Entry role assisting with outbound lists and first touches. Learn sourcing basics and support screening tasks.',
    company: 'TalentFlow',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Outbound'],
    salaryMin: 12000,
    salaryMax: 15000,
    experienceLevel: 'junior',
    experienceYears: 0,
    employmentType: 'internship'
  },
  {
    id: 216,
    titleKey: 'backend_engineer',
    description:
      'Backend engineer building APIs and services in TypeScript. Collaborate on integrations and improve reliability.',
    company: 'Northwind Labs',
    location: 'Barcelona',
    tags: ['TypeScript', 'Collaboration'],
    salaryMin: 48000,
    salaryMax: 62000,
    experienceLevel: 'senior',
    experienceYears: 5,
    employmentType: 'full_time'
  },
  {
    id: 217,
    titleKey: 'fullstack_engineer',
    description:
      'Fullstack engineer shipping features across UI and API. Build TypeScript services and maintain clean interfaces.',
    company: 'Cloud Harbor',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['TypeScript', 'UI'],
    salaryMin: 42000,
    salaryMax: 52000,
    experienceLevel: 'mid',
    experienceYears: 4,
    employmentType: 'full_time'
  },
  {
    id: 218,
    titleKey: 'data_analyst',
    description:
      'Data analyst role focused on reporting and spreadsheet accuracy. Maintain metrics and answer ad hoc questions.',
    company: 'Data Grove',
    location: 'Sevilla',
    tags: ['Reporting', 'Excel'],
    salaryMin: 26000,
    salaryMax: 32000,
    experienceLevel: 'junior',
    experienceYears: 2,
    employmentType: 'full_time'
  },
  {
    id: 219,
    titleKey: 'product_manager',
    description:
      'Product manager driving roadmap and growth initiatives. Align teams, write briefs, and measure outcomes.',
    company: 'Lumen Studio',
    location: 'Barcelona',
    tags: ['People-first', 'Growth'],
    salaryMin: 55000,
    salaryMax: 70000,
    experienceLevel: 'lead',
    experienceYears: 7,
    employmentType: 'full_time'
  },
  {
    id: 220,
    titleKey: 'frontend_engineer',
    description:
      'Frontend role focused on UI delivery and component cleanup. Improve visual consistency and basic UX.',
    company: 'Signal Media',
    location: 'Barcelona',
    tags: ['UI'],
    salaryMin: 30000,
    salaryMax: 36000,
    experienceLevel: 'mid',
    experienceYears: 3,
    employmentType: 'contract'
  }
];

export const mockOffers = rawOffers.map((offer) => ({
  ...offer,
  tags: canonicalizeTags(offer.tags)
}));
