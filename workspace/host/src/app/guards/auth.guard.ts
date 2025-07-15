import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authToken = sessionStorage.getItem('authToken');

  if (authToken) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
