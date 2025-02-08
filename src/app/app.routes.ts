import { Routes } from '@angular/router';

export const routes: Routes = [
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
