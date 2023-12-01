import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, ApiResponse, UpdateAlmacen, deleteAlmacenes } from './models/almacen.model';
import { UpdateExistencia } from './models/existencia.model';
import { UpdateMovInventario } from './models/movInventario.model';
import { UpdateDetalleTicket } from './models/detalleTicket.model';

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

@Injectable({
  providedIn: 'root'
})
export class ExistenciasService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getExistencias(IdAlmacen : 0): Observable<ApiResponse>{
  return this.http.post<ApiResponse>(`${this.apiUrl}/Existencias/Get?Almacen=0`, { IdAlmacen });
  }


insertExistencias(ExistenciasData: { codigo: string; almacen: number; cantidad: number; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    codigo: ExistenciasData.codigo,
    almacen: ExistenciasData.almacen,  
    cantidad: ExistenciasData.cantidad,
    usuario: ExistenciasData.usuario
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Existencias/Insert`, body)
}

deleteExistencias(id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.post(`${this.apiUrl}/Existencias/Delete`, { id });
  }

  updateExistencias(ExistenciasData: UpdateExistencia): Observable<ApiResponse> {
    const body ={
      id: ExistenciasData.Id,
      codigo: ExistenciasData.Codigo,
      almacen: ExistenciasData.Almacen,  
      cantidad: ExistenciasData.Cantidad,
      usuario: ExistenciasData.Usuario
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Existencias/Update`, body);
  }
}

@Injectable({
  providedIn: 'root'
})
export class movInventarioService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getMovInventario(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/MovInventario/Get`);
  }


insertMovInventario(MovInvData: { idTipoMov: number; idAlmacen: number; usuarioActualiza: number }): Observable<ApiResponse> {
  
  const body = {
    idTipoMov: MovInvData.idTipoMov,
    idAlmacen: MovInvData.idAlmacen,  
    usuarioActualiza: MovInvData.usuarioActualiza
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/MovInventario/Insert`, body)
}

deleteMovInventario(id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.post(`${this.apiUrl}/MovInventario/Delete`, { id });
  }

  updateMovInventario(MovInvData: UpdateMovInventario): Observable<ApiResponse> {
    const body ={
      Id: MovInvData.Id,
      idTipoMov: MovInvData.idTipoMov,
      idAlmacen: MovInvData.idAlmacen,  
      usuario: MovInvData.usuarioActualiza
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/MovInventario/Update`, body);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DetalleTicketService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getDetalleTicket(IdTicket : 0): Observable<ApiResponse>{
  return this.http.post<ApiResponse>(`${this.apiUrl}/DetalleTicket/Get?idTicket=0`, { IdTicket });
  }


insertDetalleTicket(DTData: { idTicket: number ;codigo: string; cantidad: number; precioVenta: number;usuario: number }): Observable<ApiResponse> {
  
  const body = {
    idTicket: DTData.codigo,
    codigo: DTData.codigo,  
    cantidad: DTData.cantidad,
    precioVenta: DTData.precioVenta,
    usuario: DTData.usuario
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/DetalleTicket/Insert`, body)
}

deleteDetalleTicket(id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.post(`${this.apiUrl}/DetalleTicket/Delete`, { id });
  }

  updateDetalleTicket(DTData: UpdateDetalleTicket): Observable<ApiResponse> {
    const body ={
      id: DTData.Id,
      idTicket: DTData.IdTicket,
      codigo: DTData.Codigo,  
      cantidad: DTData.Cantidad,
      precioVenta: DTData.PrecioVenta,
      usuario: DTData.Usuario,
      estatus: DTData.Estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/DetalleTicket/Update`, body);
  }
}