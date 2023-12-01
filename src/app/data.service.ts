import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, ApiResponse, UpdateAlmacen, deleteAlmacenes } from './models/almacen.model';
import { UpdateDetalleMov } from './models/detalleMov.model';
import { UpdateTickets } from './models/tickets.model';
import { UpdateUsuario } from './models/usuarios.models';

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
export class DetalleMovService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getDetalleMov(Id: 0): Observable<ApiResponse>{
  return  this.http.put<ApiResponse>(`${this.apiUrl}/DetalleMovimiento/Get?Id=0`, {Id});
  }


insertarDetalleMov(DetalleMovData: { idMovimiento: number; codigo: string; cantidad: number; costo: number;  usuarioActualiza: number }): Observable<ApiResponse> {
  
  const body = {
    idMovimiento: DetalleMovData.idMovimiento,
    codigo: DetalleMovData.codigo,
    cantidad: DetalleMovData.cantidad,
    costo: DetalleMovData.costo,
    usuarioActualiza: DetalleMovData.usuarioActualiza
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/DetalleMovimiento/Insert`, body)
}

deleteDetalleMov(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/DetalleMovimiento/Delete`, { Id });
  }

  updateDetalleMov(DetalleMovData: UpdateDetalleMov): Observable<ApiResponse> {
    const body ={
      Id: DetalleMovData.Id,
      idMovimiento: DetalleMovData.idMovimiento,
      codigo: DetalleMovData.codigo,
      cantidad: DetalleMovData.cantidad,
      costo: DetalleMovData.costo,
      usuarioActualiza:DetalleMovData.usuarioActualiza
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/DetalleMovimiento/Update`, body);
  }

}


@Injectable({
  providedIn: 'root'
})
export class TicketsSevice {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getTickets(IdSucursal: 0): Observable<ApiResponse>{
  return  this.http.put<ApiResponse>(`${this.apiUrl}/Tickets/Get?IdSucursal=0`, {IdSucursal});
  }


insertarTickets(TicketsData: { IdSucursal: number; IdCliente: number; IdVendedor: number;  usuario: number }): Observable<ApiResponse> {
  
  const body = {
    IdSucursal: TicketsData.IdSucursal,
    IdCliente: TicketsData.IdCliente,
    IdVendedor: TicketsData.IdVendedor,
    usuario: TicketsData.usuario,
   
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Tickets/Insert`, body)
}

deleteTickets(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/Tickets/Delete`, { Id });
  }

  updateTickets(TicketsData: UpdateTickets): Observable<ApiResponse> {
    const body ={
      Id: TicketsData.Id ,
      Estatus: TicketsData.estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Tickets/Update`, body);
  }

}

@Injectable({
  providedIn: 'root'
})
export class UsuarioSevice {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getUsuarios(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Usuarios/Get`);
  }


insertarUsuario(UsuarioData: { nombre: string; contrasena: string; rol: number;  usuario: number }): Observable<ApiResponse> {

  const body = {
    Nombre: UsuarioData.nombre,
    Contrasena: UsuarioData.contrasena,
    Rol: UsuarioData.rol,
    Usuario: UsuarioData.usuario,
   
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Usuarios/Insert`, body)
}

deleteUsuarios(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/Usuarios/Delete`, { Id });
  }

  updateUsuarios(UsuarioData: UpdateUsuario): Observable<ApiResponse> {
    const body ={
      Id: UsuarioData.Id ,
      Nombre: UsuarioData.Nombre,
      Contrasena: UsuarioData.Contrasena,
      Rol: UsuarioData.Rol,
      Usuario: UsuarioData.Usuario
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Usuarios/Update`, body);
  }

}

