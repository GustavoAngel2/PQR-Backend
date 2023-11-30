import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, ApiResponse, UpdateAlmacen, deleteAlmacenes } from './models/almacen.model';
import{Clientes, UpdateClientes,deleteClientes} from './models/cliente.model';

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

deleteAlmacenes(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/Almacenes/Delete`, { Id });
  }

  updateAlmacenes(AlmacenesData: UpdateAlmacen): Observable<ApiResponse> {
    const body ={
      id: AlmacenesData.Id,
      nombre: AlmacenesData.Nombre,
      direccion: AlmacenesData.Direccion,
      usuario:AlmacenesData.Usuario
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Almacenes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
export class ClientesService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getClientes(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Clientes/Get`)
  }


insertarClientes(ClientesData: { nombre: string; direccion: string; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombre: ClientesData.nombre,
    direccion: ClientesData.direccion,
    usuario: ClientesData.usuario  ,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Clientes/Insert`, body)
}

deleteClientes(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/Clientes/Delete`, { Id });
  }

  updateClientes(ClientesData: UpdateClientes): Observable<ApiResponse> {
    const body ={
      id: ClientesData.Id,
      nombre: ClientesData.Nombre,
      direccion: ClientesData.Direccion,
      usuario:ClientesData.Usuario
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Clientes/Update`, body);
  }
}
