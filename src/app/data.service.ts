import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, ApiResponse, UpdateAlmacen, deleteAlmacenes } from './models/almacen.model';
import{Clientes, UpdateClientes,deleteClientes} from './models/cliente.model';
import{articulos,updateArticulos,deleteCArticulos} from './models/articulo.model';
import { Personas,UpdatePersonas,DeletePersonas } from './models/personas.model';
import { Rutas,UpdateRutas,deleteRutas } from './models/rutas.model';

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
@Injectable({
  providedIn: 'root'
})
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
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getArticulos(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/articulos/Get`)
  }


insertarArticulos(ArticulosData: { descripcion: string; codigo: string;UM:string;costo:number;precio:number;Usuario: number }): Observable<ApiResponse> {
  
  const body = {
    descripcion: ArticulosData.descripcion,
    codigo: ArticulosData.codigo,
    um:ArticulosData.UM,
    Usuario: ArticulosData.Usuario,
    costo: ArticulosData.costo,
    precio: ArticulosData.precio ,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/articulos/Insert`, body)
}

deleteArticulos(Id : number): Observable<any> {
    return this.http.put(`${this.apiUrl}/articulos/Delete`, { Id });
  }

  updateArticulos(ArticulosData: updateArticulos): Observable<ApiResponse> {
    const body ={
      id:ArticulosData.Id,
      descripcion: ArticulosData.Descripcion,
      codigo: ArticulosData.Codigo,
      um:ArticulosData.UM,
      Usuario: ArticulosData.Usuario,
      costo: ArticulosData.Costo,
      precio: ArticulosData.Precio ,
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/articulos/Update`, body);
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getPersonas(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Personas/Get`)
  }


insertarClientes(PersonasData: { nombre: string;ApPaterno: string;ApMaterno: string; direccion: string; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombre: PersonasData.nombre,
    ApPaterno: PersonasData.ApPaterno,
    ApMaterno: PersonasData.ApMaterno,
    direccion: PersonasData.direccion,
    usuario: PersonasData.usuario ,
    Direccion: PersonasData.direccion,
    Usuario: PersonasData.usuario  ,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Personas/Insert`, body)
}

deletePersonas(Id : number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
  }

  updatePersonas(PersonasData: UpdatePersonas): Observable<ApiResponse> {
    const body ={
      id: PersonasData.Id,
      nombre: PersonasData.Nombre,
      ApPaterno: PersonasData.ApPaterno,
      ApMaterno: PersonasData.ApMaterno,
      direccion: PersonasData.Direccion,
      usuario: PersonasData.Usuario,
      Direccion: PersonasData.Direccion,

    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Personas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getRutas(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Rutas/Get`)
  }


insertarRutas(RutasData: { nombre: string;  usuario: number }): Observable<ApiResponse> {
  const body = {
    nombre: RutasData.nombre,
    usuario: RutasData.usuario  ,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Rutas/Insert`, body)
}

deleteRutas(Id : number): Observable<any> {
    // Asegúrate de que el endpoint y la forma en que pasas el ID son correctos según tu API
    return this.http.put(`${this.apiUrl}/Rutas/Delete`, { Id });
  }

  updateRutas(RutasData: UpdateRutas): Observable<ApiResponse> {
    const body ={
      Id: RutasData.Id,
      Nombre: RutasData.Nombre,
      Usuario:RutasData.Usuario
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Rutas/Update`, body);
  }
}