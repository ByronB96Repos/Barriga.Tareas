import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', // Redirige al login si no hay sesión
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/usuario/auth.router').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'tareas',
    loadChildren: () =>
      import('./components/tareas/tareas.router').then((m) => m.TAREAS_ROUTES),
  },
];
