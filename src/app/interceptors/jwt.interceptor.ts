import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const reqClone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(reqClone);
};
