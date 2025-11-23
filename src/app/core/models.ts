export type UserRole = 'admin' | 'recruiter';

export interface User {
  email: string;
  role: UserRole;
  token: string;
  name: string;
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
}
