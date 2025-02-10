import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from '../../guards/noauth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    component: RegistroComponent,
    canActivate: [NoAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
];
