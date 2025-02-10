import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Simula autenticación

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirigir si no está autenticado
      return false;
    }

    return true;
  }
}
