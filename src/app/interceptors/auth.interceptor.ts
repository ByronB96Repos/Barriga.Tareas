import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = `${environment.apiUrl}Auth`;
  const excludedRoutes = [`${apiUrl}/login`, `${apiUrl}/registro`]; // Rutas excluidas

  const token = localStorage.getItem('token');

  // Si la URL está en las rutas excluidas, deja pasar la petición sin modificar
  if (excludedRoutes.some((route) => req.url.includes(route))) {
    return next(req);
  }

  // Si hay un token, lo agrega al header
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedReq);
};
