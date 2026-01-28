export interface Offer {
  id: number;
  titleKey: string;
  description: string;
  tags?: string[];
  company: string;
  location: string;
  locationKey?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'lead' | 'na';
  experienceYears: number;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship' | 'na';
}
