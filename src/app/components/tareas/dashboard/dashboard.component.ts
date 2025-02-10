import { Component } from '@angular/core';
import { TareaService } from '../../../services/tarea.service';
import { Router } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Tarea } from '../../../models/tarea';
import { jwtDecode } from 'jwt-decode';
import { GraficoPastelComponent } from '../../_shared/graphics/grafico-pastel/grafico-pastel.component';
import { GraficoComponent } from '../../_shared/graphics/grafico/grafico.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GraficoPastelComponent,
    GraficoComponent,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tareas: Tarea[] = [];
  constructor(private tareasService: TareaService, private router: Router) {}
  // Llama a `cdr.detectChanges()` después de modificar `series`
  ngOnInit() {
    const id: number = this.decodeToken();
    if (id !== -1) {
      this.tareasService.getTareasUsuario(id).subscribe((data) => {
        this.tareas = data;
        console.log(data);
        const tareasCompletadas = this.tareas.filter(
          (tarea: any) => tarea.estado === 'Completada'
        );
        const tareasIncompletas = this.tareas.filter(
          (tarea: any) => tarea.estado === 'Incompleto'
        );
      });
    } else {
      console.warn('No se pudo obtener el ID del usuario del token.');
    }
  }
  decodeToken(): number {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const claimKey =
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
        const usuarioId = decodedToken[claimKey]
          ? parseInt(decodedToken[claimKey], 10)
          : null;

        return usuarioId ?? -1;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return -1;
      }
    } else {
      console.warn('No se encontró un token en localStorage.');
      return -1;
    }
  }
}
