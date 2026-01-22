import { canonicalizeTags } from '@app/shared/utils/tag-normalizer';
import { Offer } from '../models/offer.model';

export const mockOffers: Offer[] = [
  {
    id: 201,
    titleKey: 'frontend_engineer',
    company: 'Northwind Labs',
    location: 'Barcelona',
    tags: ['Angular', 'TypeScript', 'UI']
  },
  {
    id: 202,
    titleKey: 'frontend_engineer',
    company: 'Cloud Harbor',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['TypeScript', 'UI', 'Collaboration']
  },
  {
    id: 203,
    titleKey: 'product_designer',
    company: 'Lumen Studio',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['UX Research', 'Figma', 'Prototyping']
  },
  {
    id: 204,
    titleKey: 'people_ops',
    company: 'Blue Coast',
    location: 'Madrid',
    tags: ['Onboarding', 'HRIS', 'Benefits']
  },
  {
    id: 205,
    titleKey: 'recruiter',
    company: 'Bright Path',
    location: 'Valencia',
    tags: ['Full-cycle', 'Interviews', 'Pipeline']
  },
  {
    id: 206,
    titleKey: 'talent_sourcer',
    company: 'Orbit Talent',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Boolean search', 'Prospecting', 'CRM']
  },
  {
    id: 207,
    titleKey: 'people_analyst',
    company: 'Data Grove',
    location: 'Sevilla',
    tags: ['Reporting', 'Surveys', 'Excel']
  },
  {
    id: 208,
    titleKey: 'employer_branding',
    company: 'Signal Media',
    location: 'Barcelona',
    tags: ['Content', 'Events', 'Social media']
  },
  {
    id: 209,
    titleKey: 'talent_partner',
    company: 'Harbor Growth',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Sourcing', 'ATS', 'Stakeholder mgmt']
  },
  {
    id: 210,
    titleKey: 'people_ops',
    company: 'Blue Coast',
    location: 'Valencia',
    tags: ['Payroll', 'Culture']
  },
  {
    id: 211,
    titleKey: 'people_ops',
    company: 'Harbor Growth',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['People-first', 'Growth']
  },
  {
    id: 212,
    titleKey: 'hrbp',
    company: 'PeopleCare',
    location: 'Bilbao',
    tags: ['Coaching', 'Compliance']
  },
  {
    id: 213,
    titleKey: 'hrbp',
    company: 'PeopleCare',
    location: 'Madrid',
    tags: ['Change']
  },
  {
    id: 214,
    titleKey: 'ta_specialist',
    company: 'TalentFlow',
    location: 'Madrid',
    tags: ['Outbound', 'Pipeline', 'Screening']
  },
  {
    id: 215,
    titleKey: 'ta_specialist',
    company: 'TalentFlow',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['Outbound']
  },
  {
    id: 216,
    titleKey: 'backend_engineer',
    company: 'Northwind Labs',
    location: 'Barcelona',
    tags: ['TypeScript', 'Collaboration']
  },
  {
    id: 217,
    titleKey: 'fullstack_engineer',
    company: 'Cloud Harbor',
    location: 'Remote',
    locationKey: 'remote',
    tags: ['TypeScript', 'UI']
  },
  {
    id: 218,
    titleKey: 'data_analyst',
    company: 'Data Grove',
    location: 'Sevilla',
    tags: ['Reporting', 'Excel']
  },
  {
    id: 219,
    titleKey: 'product_manager',
    company: 'Lumen Studio',
    location: 'Barcelona',
    tags: ['People-first', 'Growth']
  },
  {
    id: 220,
    titleKey: 'frontend_engineer',
    company: 'Signal Media',
    location: 'Barcelona',
    tags: ['UI']
  }
].map((offer) => ({
  ...offer,
  tags: canonicalizeTags(offer.tags)
}));
