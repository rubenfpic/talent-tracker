export type UserRole = 'admin' | 'recruiter';

export interface User {
  email: string;
  role: UserRole;
  token: string;
  name: string;
}
