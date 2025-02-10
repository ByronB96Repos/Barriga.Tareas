import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChangeDetectorRef } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { Tarea } from '../../../../models/tarea';
import { TareaService } from '../../../../services/tarea.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart; // Cambia aquí, eliminando el | undefined
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-grafico-pastel',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './grafico-pastel.component.html',
  styleUrl: './grafico-pastel.component.css',
})
export class GraficoPastelComponent {
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private tareasService: TareaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      series: [0, 0], // Valores iniciales
      chart: {
        width: 320,
        type: 'pie',
      },
      labels: ['Completadas', 'Incompletas'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  tareas: Tarea[] = [];
  // Llama a `cdr.detectChanges()` después de modificar `series`
  ngOnInit() {
    const id: number = this.decodeToken();
    if (id !== -1) {
      this.tareasService.getTareasUsuario(id).subscribe((data) => {
        this.tareas = data;
        const tareasCompletadas = this.tareas.filter(
          (tarea: any) => tarea.estado === 'Completada'
        );
        const tareasIncompletas = this.tareas.filter(
          (tarea: any) => tarea.estado === 'Incompleto'
        );

        // Actualiza la propiedad `series` con los nuevos datos
        this.chartOptions.series = [
          tareasCompletadas.length,
          tareasIncompletas.length,
        ];

        console.log('Tareas completadas:', tareasCompletadas.length);
        console.log('Tareas incompletas:', tareasIncompletas.length);

        // Detecta cambios para actualizar el gráfico
        this.cdr.detectChanges();
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
