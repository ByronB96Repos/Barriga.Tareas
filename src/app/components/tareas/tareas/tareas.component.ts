import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TareaService } from '../../../services/tarea.service';
import { Router } from '@angular/router';
import { Tarea } from '../../../models/tarea';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaCreateModalComponent } from '../tarea-create-modal/tarea-create-modal.component';
import { TareaEditModalComponent } from '../tarea-edit-modal/tarea-edit-modal.component';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
})
export class TareasComponent implements OnInit {
  usuarioId: number | null = null;
  tareas: Tarea[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'estado',
    'acciones',
  ];
  estadoSeleccionado = 'todas';
  dataSource: MatTableDataSource<Tarea> = new MatTableDataSource<Tarea>([]); // Inicializa MatTableDataSource
  constructor(
    private tareasService: TareaService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id: number = this.decodeToken();
    if (id !== -1) {
      //console.log(id);
      this.tareasService.getTareasUsuario(id).subscribe((data) => {
        this.tareas = data;
        this.dataSource.data = this.tareas;
        //console.log(this.tareas);
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

  deleteTarea(id: number): void {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar la tarea?'
    );
    if (confirmDelete) {
      this.tareasService.deleteTarea(id).subscribe(() => {
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
        // this.dataSourceOriginal = [...this.usuarios];
        this.dataSource.data = this.tareas;
      });
    }
  }
  applyFilter(): void {
    if (this.estadoSeleccionado === 'todas') {
      this.dataSource.data = this.tareas;
    } else {
      this.dataSource.data = this.tareas.filter(
        (tarea) => tarea.estado === this.estadoSeleccionado
      );
    }
  }

  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(TareaCreateModalComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró', result);
    });
  }
  openEditUserModal(id: number): void {
    const dialogRef = this.dialog.open(TareaEditModalComponent, {
      width: '600px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró', result);
    });
  }
}
