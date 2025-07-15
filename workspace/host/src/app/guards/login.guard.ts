// login.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const LoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('authToken');

  if (token) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
