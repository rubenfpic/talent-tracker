import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { UserRole } from './user.model';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as UserRole[] | undefined;

  if (!auth.currentUser) {
    return router.createUrlTree(['/login']);
  }

  if (!allowedRoles || allowedRoles.includes(auth.currentUser.role)) {
    return true;
  }

  return router.createUrlTree(['/candidates']);
};
