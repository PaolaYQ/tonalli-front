import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario SÍ está autenticado, redirígelo a /clases
  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/clases']);
  }

  // Si NO está autenticado, déjalo pasar (a /welcome o /auth)
  return true;
};
