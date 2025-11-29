import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { Candidate, CandidateAbout } from '../models/candidate.model';

interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ReqresListResponse {
  data: ReqresUser[];
}

interface ReqresItemResponse {
  data: ReqresUser;
}

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://reqres.in/api/users';
  // Set to false to avoid hitting the public API (prevents console 401s in locked-down envs).
  private readonly useRemote = false;
  private readonly cache$ = new BehaviorSubject<Candidate[]>([]);

  readonly candidates$ = this.cache$.asObservable();

  load(force = false) {
    if (!force && this.cache$.value.length) {
      return this.candidates$;
    }

    if (!this.useRemote) {
      const fallback = this.fallbackCandidates();
      this.cache$.next(fallback);
      return of(fallback);
    }

    return this.http
      .get<ReqresListResponse>(`${this.api}?per_page=12`, { withCredentials: false })
      .pipe(
        map((response) => response.data.map((user, index) => this.toCandidate(user, index))),
        tap((candidates) => this.cache$.next(candidates)),
        catchError(() => {
          const fallback = this.fallbackCandidates();
          this.cache$.next(fallback);
          return of(fallback);
        })
      );
  }

  getCandidate(id: number) {
    return this.load().pipe(
      switchMap((list) => {
        const candidate = list.find((c) => c.id === id);
        if (candidate) {
          return of(candidate);
        }
        return this.http.get<ReqresItemResponse>(`${this.api}/${id}`).pipe(
          map((response) => this.toCandidate(response.data, id)),
          tap((item) => this.cache$.next([...this.cache$.value, item]))
        );
      })
    );
  }

  deleteLocal(id: number) {
    this.cache$.next(this.cache$.value.filter((candidate) => candidate.id !== id));
  }

  private fallbackCandidates(): Candidate[] {
    return [
      {
        id: 101,
        name: 'Alex Demo',
        email: 'alex.demo@example.com',
        avatar: 'https://i.pravatar.cc/150?img=13',
        title: 'Talent Partner',
        location: 'Remote',
        locationKey: 'remote',
        tags: ['Sourcing', 'Stakeholder mgmt', 'ATS'],
        about: this.aboutFor('Talent Partner', 'Alex Demo', 'remote')
      },
      {
        id: 102,
        name: 'Jamie Rivers',
        email: 'jamie.rivers@example.com',
        avatar: '/assets/avatars/jamie-rivers-missing.png',
        title: 'People Ops',
        location: 'Madrid',
        tags: ['Onboarding', 'Payroll', 'Culture'],
        about: this.aboutFor('People Ops', 'Jamie Rivers', 'onsite')
      },
      {
        id: 103,
        name: 'Taylor Brooks',
        email: 'taylor.brooks@example.com',
        avatar: 'https://i.pravatar.cc/150?img=32',
        title: 'Frontend Engineer',
        location: 'Barcelona',
        tags: ['Angular', 'TypeScript', 'UI'],
        about: this.aboutFor('Frontend Engineer', 'Taylor Brooks', 'onsite')
      },
      {
        id: 104,
        name: 'Morgan Lee',
        email: 'morgan.lee@example.com',
        avatar: 'https://i.pravatar.cc/150?img=45',
        title: 'Recruiter',
        location: 'Valencia',
        tags: ['Full-cycle', 'LinkedIn', 'Interviews'],
        about: this.aboutFor('Recruiter', 'Morgan Lee', 'onsite')
      },
      {
        id: 105,
        name: 'Jordan Vega',
        email: 'jordan.vega@example.com',
        avatar: 'https://i.pravatar.cc/150?img=47',
        title: 'People Analyst',
        location: 'Sevilla',
        tags: ['Reporting', 'Surveys', 'Excel'],
        about: this.aboutFor('People Analyst', 'Jordan Vega', 'onsite')
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
        about: this.aboutFor('Product Designer', 'Sam Carter', 'remote')
      },
      {
        id: 107,
        name: 'Casey Morgan',
        email: 'casey.morgan@example.com',
        avatar: 'https://i.pravatar.cc/150?img=64',
        title: 'HRBP',
        location: 'Bilbao',
        tags: ['Coaching', 'Change', 'Compliance'],
        about: this.aboutFor('HRBP', 'Casey Morgan', 'onsite')
      },
      {
        id: 108,
        name: 'Riley Chen',
        email: 'riley.chen@example.com',
        avatar: 'https://i.pravatar.cc/150?img=68',
        title: 'TA Specialist',
        location: 'Madrid',
        tags: ['Outbound', 'Pipeline', 'Screening'],
        about: this.aboutFor('TA Specialist', 'Riley Chen', 'onsite')
      },
      {
        id: 109,
        name: 'Avery Stone',
        email: 'avery.stone@example.com',
        avatar: 'https://i.pravatar.cc/150?img=21',
        title: 'Employer Branding',
        location: 'Barcelona',
        tags: ['Content', 'Events', 'Social media'],
        about: this.aboutFor('Employer Branding', 'Avery Stone', 'onsite')
      },
      {
        id: 110,
        name: 'Quinn Parker',
        email: 'quinn.parker@example.com',
        avatar: 'https://i.pravatar.cc/150?img=25',
        title: 'People Ops',
        location: 'Valencia',
        tags: ['People programs', 'HRIS', 'Benefits'],
        about: this.aboutFor('People Ops', 'Quinn Parker', 'onsite')
      },
      {
        id: 111,
        name: 'Drew Navarro',
        email: 'drew.navarro@example.com',
        avatar: '/assets/avatars/drew-navarro-missing.png',
        title: 'Talent Sourcer',
        location: 'Remote',
        locationKey: 'remote',
        tags: ['Boolean search', 'Prospecting', 'CRM'],
        about: this.aboutFor('Talent Sourcer', 'Drew Navarro', 'remote')
      }
    ];
  }

  private toCandidate(user: ReqresUser, offset = 0): Candidate {
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
      tags: this.tagsForTitle(title),
      about: this.aboutFor(title, name, location === 'Remote' ? 'remote' : 'onsite')
    };
  }

  private tagsForTitle(title: string): string[] {
    const mapping: Record<string, string[]> = {
      'Frontend Engineer': ['Angular', 'TypeScript', 'UI'],
      'Talent Partner': ['Sourcing', 'Stakeholder mgmt', 'ATS'],
      'People Ops': ['Onboarding', 'Payroll', 'Culture'],
      'Product Designer': ['UX Research', 'Figma', 'Prototyping']
    };

    return mapping[title] ?? ['People-first', 'Collaboration', 'Growth'];
  }

  private aboutFor(title: string, name: string, workStyle: 'remote' | 'onsite'): CandidateAbout {
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
}
