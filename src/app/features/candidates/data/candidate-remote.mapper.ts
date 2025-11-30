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
  const titles = ['Frontend Engineer', 'Talent Partner', 'People Ops', 'Product Designer'];
  const locations = ['Madrid', 'Barcelona', 'Valencia', 'Remote'];
  const title = titles[(user.id + offset) % titles.length];
  const location = locations[(user.id + offset) % locations.length];
  const name = `${user.first_name} ${user.last_name}`;

  return {
    id: user.id,
    name,
    email: user.email,
    avatar: user.avatar,
    title,
    location,
    locationKey: location === 'Remote' ? 'remote' : undefined,
    tags: tagsForTitle(title),
    about: aboutFor(title, name, location === 'Remote' ? 'remote' : 'onsite')
  };
}

/** Genera etiquetas por título para datos remotos (cuando la API no las trae). */
function tagsForTitle(title: string): string[] {
  const mapping: Record<string, string[]> = {
    'Frontend Engineer': ['Angular', 'TypeScript', 'UI'],
    'Talent Partner': ['Sourcing', 'Stakeholder mgmt', 'ATS'],
    'People Ops': ['Onboarding', 'Payroll', 'Culture'],
    'Product Designer': ['UX Research', 'Figma', 'Prototyping'],
    Recruiter: ['Full-cycle', 'LinkedIn', 'Interviews'],
    'People Analyst': ['Reporting', 'Surveys', 'Excel'],
    HRBP: ['Coaching', 'Change', 'Compliance'],
    'TA Specialist': ['Outbound', 'Pipeline', 'Screening'],
    'Employer Branding': ['Content', 'Events', 'Social media'],
    'Talent Sourcer': ['Boolean search', 'Prospecting', 'CRM']
  };

  return mapping[title] ?? ['People-first', 'Collaboration', 'Growth'];
}

/** Genera descripciones para datos remotos (cuando la API no las trae). */
function aboutFor(title: string, name: string, workStyle: 'remote' | 'onsite'): CandidateAbout {
  const locationNote = workStyle === 'remote' ? 'async-first setups' : 'hybrid teams';
  const softByTitle: Record<string, string> = {
    'Talent Partner': `${name} builds trust quickly with hiring managers, keeping search updates tight and transparent so teams feel supported.`,
    'People Ops': `${name} keeps rituals smooth and people informed, balancing employee needs with process discipline.`,
    'Frontend Engineer': `${name} collaborates closely with design and product, clarifying requirements and sharing early UI drafts for feedback.`,
    Recruiter: `${name} listens carefully to hiring signals and sets clear expectations with candidates to ensure a respectful process.`,
    'People Analyst': `${name} translates data into plain language so leaders can act without drowning in dashboards.`,
    'Product Designer': `${name} facilitates workshops and user reviews with empathy, keeping stakeholders aligned.`,
    HRBP: `${name} coaches managers through change with a calm, pragmatic tone.`,
    'TA Specialist': `${name} keeps stakeholders looped in with concise pipeline notes and clear next steps.`,
    'Employer Branding': `${name} brings energy to events and internal comms, amplifying authentic stories from the team.`,
    'Talent Sourcer': `${name} nurtures long-term relationships and shares market intel proactively.`
  };

  const techByTitle: Record<string, string> = {
    'Talent Partner': `Strong with outbound sourcing, structured intake, and ATS hygiene; comfortable adapting playbooks for ${locationNote}.`,
    'People Ops': `Experienced with onboarding flows, payroll vendors, and HRIS data integrity; keeps audits tight for ${locationNote}.`,
    'Frontend Engineer': `Builds accessible, performant UIs in Angular and TypeScript; pairs often and optimizes bundle size for ${locationNote}.`,
    Recruiter: `Runs full-cycle recruiting with robust intake docs, calibrated scorecards, and sourcing in LinkedIn and niche communities.`,
    'People Analyst': `Builds clean datasets, survey instrumentation, and exec-ready visuals; automates reporting to reduce manual drift.`,
    'Product Designer': `Researches, prototypes in Figma, and iterates quickly with engineers; ensures handoffs include states and token usage.`,
    HRBP: `Aligns org design, performance cycles, and comp guidance; maintains compliance checklists suited to ${locationNote}.`,
    'TA Specialist': `Excels at outbound, pipeline reporting, and structured screening; tunes funnels to remove friction for ${locationNote}.`,
    'Employer Branding': `Produces content calendars, event kits, and social narratives; measures campaign impact with clear KPIs.`,
    'Talent Sourcer': `Crafts boolean strings, sequences, and CRM tags; experiments with new channels while keeping data tidy.`
  };

  return {
    soft: softByTitle[title] ?? `${name} values clear communication and steady follow-through to keep teams confident.`,
    tech: techByTitle[title] ?? `Comfortable adapting tooling and processes to support ${locationNote} without slowing delivery.`
  };
}
