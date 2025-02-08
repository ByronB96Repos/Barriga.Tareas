import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TareaService } from '../../../services/tarea.service';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-tarea-create-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './tarea-create-modal.component.html',
  styleUrl: './tarea-create-modal.component.css',
})
export class TareaCreateModalComponent {
  tarea = {
    nombre: '',
    descripcion: '',
    observacion: '',
    estado: '',
    usuarioId: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<TareaCreateModalComponent>,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {}

  registrar() {
    const id: number = this.decodeToken();
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
    }
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
