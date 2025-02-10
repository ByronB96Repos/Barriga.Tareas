import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');

    if (isLoggedIn) {
      this.router.navigate(['tareas/dashboard']); // Redirigir si ya está autenticado
      return false;
    }

    return true;
  }
}
