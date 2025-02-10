import { Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TareasComponent } from './tareas/tareas.component';
import { AuthGuard } from '../../guards/auth.guard';

export const TAREAS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Solo si está autenticado
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tareas', component: TareasComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
