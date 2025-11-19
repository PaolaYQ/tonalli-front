import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta a tu servicio
import { ToastService } from '../services/toast.service';

export const appGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  // Si el usuario SÍ está autenticado, déjalo pasar
  if (authService.isAuthenticated()) {
    return true;
  }

  toastService.showError('Debes iniciar sesión para acceder a esta sección.');

  // Si NO está autenticado, redirige a /welcome
  return router.createUrlTree(['/welcome']);
};
