import { Candidate, CandidateAbout } from '../models/candidate.model';

export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqresListResponse {
  data: ReqresUser[];
}

export interface ReqresItemResponse {
  data: ReqresUser;
}

/** Convierte un usuario de la API reqres en nuestro modelo de candidato. */
export function mapReqresUserToCandidate(user: ReqresUser, offset = 0): Candidate {
  const titleKeys = ['frontend_engineer', 'talent_partner', 'people_ops', 'product_designer'];
  const locations = ['Madrid', 'Barcelona', 'Valencia', 'Remote'];
  const titleKey = titleKeys[(user.id + offset) % titleKeys.length];
  const location = locations[(user.id + offset) % locations.length];
  const name = `${user.first_name} ${user.last_name}`;

  return {
    id: user.id,
    name,
    email: user.email,
    avatar: user.avatar,
    titleKey,
    location,
    locationKey: location === 'Remote' ? 'remote' : undefined,
    tags: tagsForTitleKey(titleKey),
    about: aboutFor(titleKey, name, location === 'Remote' ? 'remote' : 'onsite')
  };
}

/** Genera etiquetas por título para datos remotos (cuando la API no las trae). */
function tagsForTitleKey(titleKey: string): string[] {
  const mapping: Record<string, string[]> = {
    frontend_engineer: ['Angular', 'TypeScript', 'UI'],
    talent_partner: ['Sourcing', 'Stakeholder mgmt', 'ATS'],
    people_ops: ['Onboarding', 'Payroll', 'Culture'],
    product_designer: ['UX Research', 'Figma', 'Prototyping'],
    recruiter: ['Full-cycle', 'LinkedIn', 'Interviews'],
    people_analyst: ['Reporting', 'Surveys', 'Excel'],
    hrbp: ['Coaching', 'Change', 'Compliance'],
    ta_specialist: ['Outbound', 'Pipeline', 'Screening'],
    employer_branding: ['Content', 'Events', 'Social media'],
    talent_sourcer: ['Boolean search', 'Prospecting', 'CRM']
  };

  return mapping[titleKey] ?? ['People-first', 'Collaboration', 'Growth'];
}

/** Genera descripciones para datos remotos (cuando la API no las trae). */
function aboutFor(titleKey: string, name: string, workStyle: 'remote' | 'onsite'): CandidateAbout {
  const locationNote = workStyle === 'remote' ? 'async-first setups' : 'hybrid teams';
  const softByTitleKey: Record<string, string> = {
    talent_partner: `${name} builds trust quickly with hiring managers, keeping search updates tight and transparent so teams feel supported.`,
    people_ops: `${name} keeps rituals smooth and people informed, balancing employee needs with process discipline.`,
    frontend_engineer: `${name} collaborates closely with design and product, clarifying requirements and sharing early UI drafts for feedback.`,
    recruiter: `${name} listens carefully to hiring signals and sets clear expectations with candidates to ensure a respectful process.`,
    people_analyst: `${name} translates data into plain language so leaders can act without drowning in dashboards.`,
    product_designer: `${name} facilitates workshops and user reviews with empathy, keeping stakeholders aligned.`,
    hrbp: `${name} coaches managers through change with a calm, pragmatic tone.`,
    ta_specialist: `${name} keeps stakeholders looped in with concise pipeline notes and clear next steps.`,
    employer_branding: `${name} brings energy to events and internal comms, amplifying authentic stories from the team.`,
    talent_sourcer: `${name} nurtures long-term relationships and shares market intel proactively.`
  };

  const techByTitleKey: Record<string, string> = {
    talent_partner: `Strong with outbound sourcing, structured intake, and ATS hygiene; comfortable adapting playbooks for ${locationNote}.`,
    people_ops: `Experienced with onboarding flows, payroll vendors, and HRIS data integrity; keeps audits tight for ${locationNote}.`,
    frontend_engineer: `Builds accessible, performant UIs in Angular and TypeScript; pairs often and optimizes bundle size for ${locationNote}.`,
    recruiter: `Runs full-cycle recruiting with robust intake docs, calibrated scorecards, and sourcing in LinkedIn and niche communities.`,
    people_analyst: `Builds clean datasets, survey instrumentation, and exec-ready visuals; automates reporting to reduce manual drift.`,
    product_designer: `Researches, prototypes in Figma, and iterates quickly with engineers; ensures handoffs include states and token usage.`,
    hrbp: `Aligns org design, performance cycles, and comp guidance; maintains compliance checklists suited to ${locationNote}.`,
    ta_specialist: `Excels at outbound, pipeline reporting, and structured screening; tunes funnels to remove friction for ${locationNote}.`,
    employer_branding: `Produces content calendars, event kits, and social narratives; measures campaign impact with clear KPIs.`,
    talent_sourcer: `Crafts boolean strings, sequences, and CRM tags; experiments with new channels while keeping data tidy.`
  };

  return {
    soft: softByTitleKey[titleKey] ?? `${name} values clear communication and steady follow-through to keep teams confident.`,
    tech: techByTitleKey[titleKey] ?? `Comfortable adapting tooling and processes to support ${locationNote} without slowing delivery.`
  };
}
