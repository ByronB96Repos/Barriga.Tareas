import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = `${environment.apiUrl}Tareas/`;

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getTareasUsuario(id: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}T/${id}`);
  }
  deleteTarea(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
  createTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }
  getTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}${id}/`);
  }
}
