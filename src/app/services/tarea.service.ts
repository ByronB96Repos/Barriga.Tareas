import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}

  getTarea() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // Obtén el token desde localStorage

      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado
        });

        return this.http.get('http://localhost:5067/api/Tareas').subscribe({
          next: (response) => console.log('Respuesta:', response),
          error: (err) => console.error('Error:', err),
        });
      } else {
        return console.error('Token no encontrado');
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }
}
