import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './models/almacen.model';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getAlmacenes(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Almacenes/Get`)
  }


insertarAlmacenes(AlmacenesData: { nombre: string; direccion: string; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombre: AlmacenesData.nombre,
    direccion: AlmacenesData.direccion,
    usuario: AlmacenesData.usuario  ,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Almacenes/Insert`, body)
}

}
