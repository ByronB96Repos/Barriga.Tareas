import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TareaService } from '../../../services/tarea.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../../models/tarea';

@Component({
  selector: 'app-tarea-edit-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './tarea-edit-modal.component.html',
  styleUrl: './tarea-edit-modal.component.css',
})
export class TareaEditModalComponent {
  tarea: Tarea = {
    id: 0,
    nombre: '',
    descripcion: '',
    observacion: '',
    estado: '',
    usuarioId: 0,
  } as Tarea;
  public id: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TareaEditModalComponent>,
    private tareaService: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.tareaService.getTarea(this.id).subscribe((data) => {
      this.tarea = data;
    });
  }

  registrar() {
    /*const id: number = this.decodeToken();
    if (id !== -1) {
      const tareaobj = {
        nombre: this.tarea.nombre,
        descripcion: this.tarea.descripcion,
        observacion: this.tarea.observacion,
        usuarioId: id,
      };
      this.tareaService.createTarea(tareaobj).subscribe((data) => {
        console.log('Tarea creado', data);
        this.dialogRef.close();
        window.location.reload();
      });
    } else {
      console.warn('No se pudo obtener el ID del usuario del token.');
    }*/
  }

  cancelar(): void {
    this.dialogRef.close();
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
