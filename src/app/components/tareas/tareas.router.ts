import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TareasComponent } from './tareas/tareas.component';

export const TAREAS_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tareas', component: TareasComponent },
];
