import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TareaService } from '../../../../services/tarea.service';
import { Router } from '@angular/router';
import { Tarea } from '../../../../models/tarea';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css',
})
export class GraficoComponent {
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private tareasService: TareaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 142,
        width: '100%',
        stacked: false,
        stackType: '100%',
      },
      dataLabels: {
        enabled: true, // Habilita las etiquetas de los datos
        style: {
          colors: ['#fff'], // Color de las etiquetas
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Configura las barras apiladas verticales
        },
      },
      responsive: [
        {
          breakpoint: 1024, // Para pantallas de 1024px o más pequeñas
          options: {
            chart: {
              height: 250, // Ajusta la altura a 300px
            },
            legend: {
              position: 'bottom', // Cambia la posición de la leyenda en pantallas más pequeñas
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
        {
          breakpoint: 480, // Para pantallas de 480px o más pequeñas
          options: {
            chart: {
              height: 250, // Ajusta la altura a 250px
            },
            xaxis: {
              labels: {
                show: false, // Oculta las etiquetas del eje X en pantallas muy pequeñas
              },
            },
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: ['Completas', 'Pendientes'],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50,
      },
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
          (tarea: any) => tarea.estado === 'Pendiente'
        );

        // Actualiza la propiedad `series` con los nuevos datos
        this.chartOptions.series = [
          {
            name: 'Completas',
            data: [tareasCompletadas.length, 0],
          },
          {
            name: 'Incompletas',
            data: [0, tareasIncompletas.length],
          },
        ];

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
