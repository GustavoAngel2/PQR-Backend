//se importan las dependencias necesarias, al igual que los componentes

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, UpdateAlmacen } from './models/almacen.model';
import{ UpdateClientes } from './models/cliente.model';
import{ updateArticulos } from './models/articulo.model';
import { UpdatePersonas } from './models/personas.model';
import { UpdateRutas } from './models/rutas.model';
import { UpdateDetallePerfil } from './models/detallePerfil.model';
import { UpdateDetalleMov } from './models/detalleMov.model';
import { UpdateTickets } from './models/tickets.model';
import { UpdateUsuario } from './models/usuarios.models';
import { UpdateExistencia } from './models/existencia.model';
import { UpdateMovInventario } from './models/movInventario.model';
import { UpdateDetalleTicket } from './models/detalleTicket.model';
import { UpdateModulo } from './models/modulo.model';
import { updateEmpleado } from "./models/empleados.model";
import { UpdatePuesto } from "./models/puestos.model";
import { UpdateCategoriaModulo } from './models/categoriaModulo.model';

@Injectable({
  providedIn: "root",
})
export class AlmacenesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getAlmacenes(): Observable<ApiResponse> {
    // regresa una lista de los almacenes de la base de datos
    return this.http.get<ApiResponse>(`${this.apiUrl}/Almacenes/Get`);
  }

  //esta funcion se utiliza para insertar un almacen, contiene un cuerpo de nombre, direccion y el usuario (su id) que lo crea
  insertarAlmacenes(AlmacenesData: {
    nombre: string;
    direccion: string;
    usuario: number;
    encargado: number;
  }): Observable<ApiResponse> {
    const body = {
      nombre: AlmacenesData.nombre,
      direccion: AlmacenesData.direccion,
      usuario: AlmacenesData.usuario,
      encargado: AlmacenesData.encargado
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Almacenes/Insert`, body);
  }

  //esta funcion borra un almacen pidiendo el id del almacen a borrar
  deleteAlmacenes(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Almacenes/Delete`, { Id });
  }

  //esta funcion sirve para modificar la informacion de un almacen
  updateAlmacenes(AlmacenesData: UpdateAlmacen): Observable<ApiResponse> {
    const body = {
      id: AlmacenesData.Id,
      nombre: AlmacenesData.Nombre,
      direccion: AlmacenesData.Direccion,
      usuario: AlmacenesData.Usuario,
      encargado: AlmacenesData.Encargado
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Almacenes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ClientesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  //Esta funcion enlista los Clientes de la base de datos
  getClientes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Clientes/Get`);
  }

  //Esta funcion inserta clientes
  insertarClientes(ClientesData: {
    nombre: string;
    direccion: string;
    usuario: number;
    telefono:number;
    rfc: string;
    curp: string;
    email:string;
    coordenadas: string;
  }): Observable<ApiResponse> {
    const body = {
      nombre: ClientesData.nombre,
      direccion: ClientesData.direccion,
      usuario: ClientesData.usuario,
      telefono: ClientesData.telefono,
      rfc: ClientesData.rfc,
      curp:ClientesData.curp,
      email: ClientesData.email,
      coordenadas: ClientesData.coordenadas,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Clientes/Insert`, body);
  }

  deleteClientes(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Clientes/Delete`, { Id });
  }

  updateClientes(ClientesData: UpdateClientes): Observable<ApiResponse> {
    const body = {
      id: ClientesData.Id,
      nombre: ClientesData.Nombre,
      direccion: ClientesData.Direccion,
      usuario: ClientesData.Usuario,
      telefono: ClientesData.telefono,
      rfc: ClientesData.rfc,
      curp:ClientesData.curp,
      email: ClientesData.email,
      coordenadas: ClientesData.coordenadas,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Clientes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ArticulosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getArticulos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/articulos/Get`);
  }

  insertarArticulos(ArticulosData: {
    descripcion: string;
    codigo: string;
    UM: number;
    costo: number;
    precio: number;
    Usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      descripcion: ArticulosData.descripcion,
      codigo: ArticulosData.codigo,
      um: ArticulosData.UM,
      Usuario: ArticulosData.Usuario,
      costo: ArticulosData.costo,
      precio: ArticulosData.precio,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/articulos/Insert`, body);
  }

  deleteArticulos(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/articulos/Delete`, { Id });
  }

  updateArticulos(ArticulosData: updateArticulos): Observable<ApiResponse> {
    const body = {
      id: ArticulosData.Id,
      descripcion: ArticulosData.Descripcion,
      codigo: ArticulosData.Codigo,
      um: ArticulosData.UM,
      Usuario: ArticulosData.Usuario,
      costo: ArticulosData.Costo,
      precio: ArticulosData.Precio,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/articulos/Update`, body);
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getPersonas(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Personas/Get`);
  }

  insertarClientes(PersonasData: {
    nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    direccion: string;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      nombre: PersonasData.nombre,
      ApPaterno: PersonasData.ApPaterno,
      ApMaterno: PersonasData.ApMaterno,
      direccion: PersonasData.direccion,
      usuario: PersonasData.usuario,
      Direccion: PersonasData.direccion,
      Usuario: PersonasData.usuario,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Personas/Insert`, body);
  }

  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
  }

  updatePersonas(PersonasData: UpdatePersonas): Observable<ApiResponse> {
    const body = {
      id: PersonasData.Id,
      nombre: PersonasData.Nombre,
      ApPaterno: PersonasData.ApPaterno,
      ApMaterno: PersonasData.ApMaterno,
      direccion: PersonasData.Direccion,
      usuario: PersonasData.Usuario,
      Direccion: PersonasData.Direccion,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Personas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class RutasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getRutas(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Rutas/Get`);
  }

  insertarRutas(RutasData: {
    nombre: string;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      nombre: RutasData.nombre,
      usuario: RutasData.usuario,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Rutas/Insert`, body);
  }

  deleteRutas(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Rutas/Delete`, { Id });
  }

  updateRutas(RutasData: UpdateRutas): Observable<ApiResponse> {
    const body = {
      Id: RutasData.Id,
      Nombre: RutasData.Nombre,
      Usuario: RutasData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Rutas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class DetalleMovService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getDetalleMov(Id: 0): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/DetalleMovimiento/Get?Id=0`,
      { Id }
    );
  }

  insertarDetalleMov(DetalleMovData: {
    idMovimiento: number;
    codigo: string;
    cantidad: number;
    costo: number;
    usuarioActualiza: number;
  }): Observable<ApiResponse> {
    const body = {
      idMovimiento: DetalleMovData.idMovimiento,
      codigo: DetalleMovData.codigo,
      cantidad: DetalleMovData.cantidad,
      costo: DetalleMovData.costo,
      usuarioActualiza: DetalleMovData.usuarioActualiza,
    };
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/DetalleMovimiento/Insert`,
      body
    );
  }

  deleteDetalleMov(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/DetalleMovimiento/Delete`, { Id });
  }

  updateDetalleMov(DetalleMovData: UpdateDetalleMov): Observable<ApiResponse> {
    const body = {
      Id: DetalleMovData.Id,
      idMovimiento: DetalleMovData.idMovimiento,
      codigo: DetalleMovData.codigo,
      cantidad: DetalleMovData.cantidad,
      costo: DetalleMovData.costo,
      usuarioActualiza: DetalleMovData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/DetalleMovimiento/Update`,
      body
    );
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class TicketsSevice {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getTickets(IdSucursal: 0): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/Tickets/Get?IdSucursal=0`,
      { IdSucursal }
    );
  }

  insertarTickets(TicketsData: {
    IdSucursal: number;
    IdCliente: number;
    IdVendedor: number;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      IdSucursal: TicketsData.IdSucursal,
      IdCliente: TicketsData.IdCliente,
      IdVendedor: TicketsData.IdVendedor,
      usuario: TicketsData.usuario,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Tickets/Insert`, body);
  }

  deleteTickets(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Tickets/Delete`, { Id });
  }

  updateTickets(TicketsData: UpdateTickets): Observable<ApiResponse> {
    const body = {
      Id: TicketsData.Id,
      Estatus: TicketsData.estatus,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Tickets/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class UsuarioSevice {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Usuarios/Get`);
  }

  insertarUsuario(UsuarioData: {
    nombre: string;
    contrasena: string;
    rol: number;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      Nombre: UsuarioData.nombre,
      Contrasena: UsuarioData.contrasena,
      Rol: UsuarioData.rol,
      Usuario: UsuarioData.usuario,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Usuarios/Insert`, body);
  }

  deleteUsuarios(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Usuarios/Delete`, { Id });
  }

  updateUsuarios(UsuarioData: UpdateUsuario): Observable<ApiResponse> {
    const body = {
      Id: UsuarioData.Id,
      Nombre: UsuarioData.Nombre,
      Contrasena: UsuarioData.Contrasena,
      Rol: UsuarioData.Rol,
      Usuario: UsuarioData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Usuarios/Update`, body);
  }
}

@Injectable({
  providedIn: "root",
})
export class ExistenciasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getExistencias(IdAlmacen: 0): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/Existencias/Get?Almacen=0`,
      { IdAlmacen }
    );
  }

  insertExistencias(ExistenciasData: {
    codigo: string;
    almacen: number;
    cantidad: number;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      codigo: ExistenciasData.codigo,
      almacen: ExistenciasData.almacen,
      cantidad: ExistenciasData.cantidad,
      usuario: ExistenciasData.usuario,
    };
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/Existencias/Insert`,
      body
    );
  }

  deleteExistencias(id: number): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/Existencias/Delete`, { id });
  }

  updateExistencias(
    ExistenciasData: UpdateExistencia
  ): Observable<ApiResponse> {
    const body = {
      id: ExistenciasData.Id,
      codigo: ExistenciasData.Codigo,
      almacen: ExistenciasData.Almacen,
      cantidad: ExistenciasData.Cantidad,
      usuario: ExistenciasData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/Existencias/Update`,
      body
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class movInventarioService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getMovInventario(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/MovInventario/Get`);
  }

  insertMovInventario(MovInvData: {
    idTipoMov: number;
    idAlmacen: number;
    usuarioActualiza: number;
  }): Observable<ApiResponse> {
    const body = {
      idTipoMov: MovInvData.idTipoMov,
      idAlmacen: MovInvData.idAlmacen,
      usuarioActualiza: MovInvData.usuarioActualiza,
    };
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/MovInventario/Insert`,
      body
    );
  }

  deleteMovInventario(id: number): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/MovInventario/Delete`, { id });
  }

  updateMovInventario(
    MovInvData: UpdateMovInventario
  ): Observable<ApiResponse> {
    const body = {
      Id: MovInvData.Id,
      idTipoMov: MovInvData.idTipoMov,
      idAlmacen: MovInvData.idAlmacen,
      usuario: MovInvData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/MovInventario/Update`,
      body
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class DetalleTicketService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getDetalleTicket(IdTicket: 0): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/DetalleTicket/Get?idTicket=0`
    );
  }

  insertDetalleTicket(DTData: {
    idTicket: number;
    codigo: number;
    cantidad: number;
    precioVenta: number;
    usuario: number;
  }): Observable<ApiResponse> {
    const body = {
      idTicket: DTData.idTicket,
      codigo: DTData.codigo,
      cantidad: DTData.cantidad,
      precioVenta: DTData.precioVenta,
      usuario: DTData.usuario,
    };
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/DetalleTicket/Insert`,
      body
    );
  }

  deleteDetalleTicket(id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/DetalleTicket/Delete`, { id });
  }

  updateDetalleTicket(DTData: UpdateDetalleTicket): Observable<ApiResponse> {
    const body = {
      id: DTData.Id,
      idTicket: DTData.IdTicket,
      codigo: DTData.Codigo,
      cantidad: DTData.Cantidad,
      precioVenta: DTData.PrecioVenta,
      usuario: DTData.Usuario,
      estatus: DTData.Estatus,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/DetalleTicket/Update`,
      body
    );
  }
}
/* -------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  //se especifica la url base
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  //Enlista los modulos registrados en la base de datos
  getModulos(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/Modulos/Get`)
  }


InsertModulos(ModulosData: { nombreModulo: string; categoriaModulo: number; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombreModulo: ModulosData.nombreModulo,
    categoriaModulo: ModulosData.categoriaModulo,
    usuario: ModulosData.usuario,
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/Modulos/Insert`, body)
}

deleteModulos(Id : number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Modulos/Delete`, { Id });
  }

  updateModulos(ModulosData: UpdateModulo): Observable<ApiResponse> {
    const body ={
    id: ModulosData.Id,
    nombreModulo: ModulosData.NombreModulo,
    categoriaModulo: ModulosData.CategoriaModulo,
    usuario: ModulosData.Usuario,
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Modulos/Update`, body);
  }
}

//--------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class EmpleadosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getEmpleado(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Empleados/Get`);
  }

  insertarEmpleado(EmpleadoData: {
    IdPersona: number;
    IdSucursal: number;
    IdPuesto: number;
    usuarioActualiza: number;
  }): Observable<ApiResponse> {
    const body = {
      IdPersona: EmpleadoData.IdPersona,
      IdSucursal: EmpleadoData.IdSucursal,
      IdPuesto: EmpleadoData.IdPuesto,
      usuarioActualiza: EmpleadoData.usuarioActualiza,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Empleados/Insert`, body);
  }

  deleteEmpleado(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Empleados/Delete`, { Id });
  }

  updateEmpleado(EmpleadoData: updateEmpleado): Observable<ApiResponse> {
    const body = {
      Id: EmpleadoData.Id,
      IdPersona: EmpleadoData.IdPersona,
      IdSucursal: EmpleadoData.IdSucursal,
      IdPuesto: EmpleadoData.IdPuesto,
      UsuarioActualiza: EmpleadoData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Empleados/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PuestosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getPuestos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Puestos/Get`);
  }

  insertarPuestos(PuestosData: {
    nombre: string;
    descripcion: string;
    salario: number;
    usuarioActualiza: number;
  }): Observable<ApiResponse> {
    const body = {
      nombre: PuestosData.nombre,
      descripcion: PuestosData.descripcion,
      salario: PuestosData.salario,
      usuarioActualiza: PuestosData.usuarioActualiza,
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Puestos/Insert`, body);
  }

  deletePuestos(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Puestos/Delete`, { Id });
  }

  updatePuestos(PuestosData: UpdatePuesto): Observable<ApiResponse> {
    const body = {
      Id: PuestosData.Id,
      nombre: PuestosData.nombre,
      desripcion: PuestosData.descripcion,
      salario: PuestosData.salario,
      usuarioActualiza: PuestosData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Puestos/Update`, body);
  }
}

//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class CategoriaModuloService {
  //se especifica la url base de la api
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getCategoriaModulo(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/CatModulo/Get`);
  }

//
insertCategoriaModulo(CatModuloData: { nombre: string; descripcion: string; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombre: CatModuloData.nombre,
    descripcion: CatModuloData.descripcion,  
    usuario: CatModuloData.usuario
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/CatModulo/Insert`, body)
}

deleteCategoriaModulo(id : number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/CatModulo/Delete`, { id });
  }

 updateCategoriaModulo(catModuloData: UpdateCategoriaModulo): Observable<ApiResponse> {
  const body ={
    Id: catModuloData.Id,
    nombre: catModuloData.Nombre,
    descripcion: catModuloData.Descripcion,  
    usuario: catModuloData.Usuario
  };
  console.log('Enviando solicitud con el siguiente cuerpo:', body);
  return this.http.put<ApiResponse>(`${this.apiUrl}/CatModulo/Update`, body);
}
}

//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class DetallePerfilService {
  //se especifica la url base de la api
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient) { }

  getDetallePerfil(): Observable<ApiResponse>{
  return  this.http.get<ApiResponse>(`${this.apiUrl}/DetallePerfil/Get`)
  }


insertarDetallePerfil(DetallePerfilData: { idPerfil: number; idModulo: number; acceso: number; usuarioActualiza: number; }): Observable<ApiResponse> {
  
  const body = {
    idPerfil: DetallePerfilData.idPerfil,
    idModulo: DetallePerfilData.idModulo,
    acceso: DetallePerfilData.acceso,
    usuarioActualiza: DetallePerfilData.usuarioActualiza
  };
  return this.http.post<ApiResponse>(`${this.apiUrl}/DetallePerfil/Insert`, body)
}

deleteDetallePerfil(id : number): Observable<any> {
    return this.http.put(`${this.apiUrl}/DetallePerfil/Delete`, { id });
  }

  updateDetallePerfil(DetallePerfilData: UpdateDetallePerfil): Observable<ApiResponse> {
    const body = {
      id: DetallePerfilData.Id,
      idPerfil: DetallePerfilData.idPerfil,
      idModulo: DetallePerfilData.idModulo,
      acceso: DetallePerfilData.acceso,
      estatus: DetallePerfilData.estatus,
      usuarioActualiza: DetallePerfilData.usuarioActualiza
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/DetallePerfil/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Roles/Get`);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class UMService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getUM(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/UM/Get`);
  }
}

//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getSucursales(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/Sucursales/Get`);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class TiposMovService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient) {}

  getTiposMov(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/TiposMov/Get`);
  }
}