export const USER_ROLES = {
  admin: 'admin',
  recruiter: 'recruiter'
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface User {
  email: string;
  role: UserRole;
  token: string;
  name: string;
}
