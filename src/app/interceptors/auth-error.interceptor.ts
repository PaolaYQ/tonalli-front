import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const errorMessage =
          error.error.mensaje || 'Correo o contraseña inválidos';

        toastService.showError(errorMessage);
      }

      return throwError(() => error);
    })
  );
};
