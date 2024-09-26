import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAlmacen } from './models/almacen.model';
import{ UpdateClientes } from './models/cliente.model';
import{ updateArticulos } from './models/articulo.model';
import { UpdatePersonas } from './models/personas.model';
import { UpdateRutas } from './models/rutas.model';
import { UpdateDetallePerfil } from './models/detallePerfil.model';
import { AutorizarMovimiento, UpdateDetalleMov } from './models/detalleMov.model';
import { InsetTickets, SearchCorteModel, UpdateTickets } from './models/tickets.model';
import { UpdateUsuario } from './models/usuarios.models';
import { UpdateExistencia } from './models/existencia.model';
import { UpdateMovInventario } from './models/movInventario.model';
import { Autorizar, DetalleTicket, InsertDetalleTicket, UpdateDetalleTicket } from './models/detalleTicket.model';
import { UpdateModulo } from './models/modulo.model';
import { updateEmpleado } from "./models/empleados.model";
import { UpdatePuesto } from "./models/puestos.model";
import { UpdateCategoriaModulo } from './models/categoriaModulo.model';
import { AuthInfo } from './models/login.model'; 
import { ApiResponse2 } from './models/login.model';
import { ApiResponse,ApiResponseEmpleados,ApiResponsePuntoV,ApiResponseExistencias,ApiResponseModulos,ApiResponseUsuarios } from './models/ApiResponse.models';
import { AuthService } from './auth.service';
import { Estados } from './models/Estados.model';


@Injectable({
  providedIn: "root",
})

export class apiURL{
  getURL():string{
    return "http://104.254.247.128:8083/api"
  }
}

export class AlmacenesService {
  //Se especifica la url base de la API
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}
  
  getAlmacenes(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.api.getURL()}/Almacenes/Get`, { headers });
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
    return this.http.post<ApiResponse>(`${this.api.getURL()}/Almacenes/Insert`, body);
  }
  //esta funcion borra un almacen pidiendo el id del almacen a borrar
  deleteAlmacenes(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Almacenes/Delete`, { Id });
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
    return this.http.put<ApiResponse>(`${this.api.getURL()}/Almacenes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ClientesService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  //Esta funcion enlista los Clientes de la base de datos
  getClientes(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.api.getURL()}/Clientes/Get`, {headers});
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
  }): Observable<ApiResponseEmpleados> {
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
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/Clientes/Insert`, body);
  }
  deleteClientes(Id: number): Observable<any> {
    return this.http.put(`${this.api.getURL()}/Clientes/Delete`, { Id });
  }
  updateClientes(ClientesData: UpdateClientes): Observable<ApiResponseEmpleados> {
    const body = {
      id: ClientesData.Id,
      nombre: ClientesData.Nombre,
      direccion: ClientesData.Direccion,
      usuario: ClientesData.Usuario,
      telefono: ClientesData.Telefono,
      rfc: ClientesData.RFC,
      curp:ClientesData.CURP,
      email: ClientesData.Email,
      coordenadas: ClientesData.Coordenadas,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Clientes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ArticulosService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getArticulos(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/articulos/Get`,{headers});
  }
  insertarArticulos(ArticulosData: {
    descripcion: string;
    codigo: string;
    UM: number;
    costo: number;
    precio: number;
    Usuario: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      descripcion: ArticulosData.descripcion,
      codigo: ArticulosData.codigo,
      um: ArticulosData.UM,
      Usuario: ArticulosData.Usuario,
      costo: ArticulosData.costo,
      precio: ArticulosData.precio,
    };
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/articulos/Insert`, body);
  }
  deleteArticulos(Id: number): Observable<any> {
    return this.http.put(`${this.api.getURL()}/articulos/Delete`, { Id });
  }
  updateArticulos(ArticulosData: updateArticulos): Observable<ApiResponseEmpleados> {
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
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/articulos/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getPersonas(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.api.getURL()}/Personas/Get`,{headers});
  }
  insertarPersona(PersonaData: {
    nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    direccion: string;
    usuario: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      nombre: PersonaData.nombre,
      ApPaterno: PersonaData.ApPaterno,
      ApMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.direccion,
      usuario: PersonaData.usuario,
      Direccion: PersonaData.direccion,
      Usuario: PersonaData.usuario,
    };
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/Personas/Insert`, body);
  }
  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.api.getURL()}/Personas/Delete`, { Id });
  }
  updatePersonas(PersonaData: UpdatePersonas): Observable<ApiResponseEmpleados> {
    const body = {
      id: PersonaData.Id,
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Personas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class RutasService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getRutas(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/Rutas/Get`,{headers});
  }
  insertarRutas(RutasData: {
    nombre: string;
    matricula: string;
    conductor: string;
    noLicencia: number;
    noSeguro: number;
    usuario: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      nombre: RutasData.nombre,
      matricula: RutasData.matricula,
      conductor: RutasData.conductor,
      noLicencia: RutasData.noLicencia,
      noSeguro: RutasData.noSeguro,
      usuario: RutasData.usuario,
    };
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/Rutas/Insert`, body);
  }
  deleteRutas(Id: number): Observable<ApiResponseEmpleados> {
    
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Rutas/Delete`, { Id });
  }
  updateRutas(RutasData: UpdateRutas): Observable<ApiResponseEmpleados> {
    const body = {
      id: RutasData.Id,
      nombre: RutasData.Nombre,
      matricula: RutasData.Matricula,
      conductor: RutasData.Conductor,
      noLicencia: RutasData.NoLicencia,
      noSeguro: RutasData.NoSeguro,
      usuario: RutasData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Rutas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class DetalleMovService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getDetalleMov(Id: number): Observable<ArrayBuffer> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ArrayBuffer>(`${this.api.getURL()}/DetalleMovimiento/Get?id_Movimientos=${Id}`,{headers});
  }
  insertarDetalleMov(DetalleMovData: {
    idMovimiento: number;
    codigo: string;
    cantidad: number;
    costo: number;
    usuarioActualiza: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      idMovimiento: DetalleMovData.idMovimiento,
      codigo: DetalleMovData.codigo,
      cantidad: DetalleMovData.cantidad,
      costo: DetalleMovData.costo,
      usuarioActualiza: DetalleMovData.usuarioActualiza,
    };
    return this.http.post<ApiResponseEmpleados>(
      `${this.api.getURL()}/DetalleMovimiento/Insert`,
      body
    );
  }
  deleteDetalleMov(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/DetalleMovimiento/Delete`, { Id });
  }
  updateDetalleMov(DetalleMovData: UpdateDetalleMov): Observable<ApiResponseEmpleados> {
    const body = {
      Id: DetalleMovData.Id,
      idMovimiento: DetalleMovData.idMovimiento,
      codigo: DetalleMovData.codigo,
      cantidad: DetalleMovData.cantidad,
      costo: DetalleMovData.costo,
      usuarioActualiza: DetalleMovData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(
      `${this.api.getURL()}/DetalleMovimiento/Update`,
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
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getTickets(TicketData:{
    IdSucursal:number,
    FechaInicio:string,
    FechaFin:string
  }): Observable<ApiResponsePuntoV> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponsePuntoV>(`${this.api.getURL()}/Tickets/Get?IdSucursal=${TicketData.IdSucursal}&FechaInicio=${TicketData.FechaInicio}&FechaFin=${TicketData.FechaFin}`,{headers});
  }

  insertarTickets(TicketsData: InsetTickets): Observable<ApiResponsePuntoV> {
    const body = {
      idSucursal: TicketsData.IdSucursal,
      idCliente: TicketsData.IdCliente,
      idVendedor: TicketsData.IdVendedor,
      usuario: TicketsData.usuario,
      uuid:TicketsData.UUID
    };
    return this.http.post<ApiResponsePuntoV>(`${this.api.getURL()}/Tickets/Insert`, body);
  }

  deleteTickets(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Tickets/Delete`, { Id });
  }

  updateTickets(TicketsData: UpdateTickets): Observable<ApiResponsePuntoV> {
    const body = {
      Id: TicketsData.Id,
      Estatus: TicketsData.estatus,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponsePuntoV>(`${this.api.getURL()}/Tickets/Update`, body);
  }

  getCorte(search: SearchCorteModel): Observable<ArrayBuffer> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ArrayBuffer>(`${this.api.getURL()}/Tickets/GetCorte?vendedor=${search.vendedor}&FechaInicio=${search.FechaInicio}&FechaFin=${search.FechaFin}`,{headers});
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  // Se especifica la url base de la API
  
  constructor(private http: HttpClient, private authService: AuthService, private api:apiURL) {}

  getUsuarios(): Observable<ApiResponseUsuarios> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseUsuarios>(`${this.api.getURL()}/Usuarios/Get`, { headers });
  }

  insertarUsuario(UsuarioData: {
    nombre: string;
    contrasena: string;
    rol: number;
    idPersona: number;  // Cambiado a idPersona
    usuario: number;
  }): Observable<ApiResponseUsuarios> {
    const body = {
      Nombre: UsuarioData.nombre,
      Contrasena: UsuarioData.contrasena,
      Rol: UsuarioData.rol,
      idPersona: UsuarioData.idPersona,  // Cambiado a idPersona
      Usuario: UsuarioData.usuario,
    };
    return this.http.post<ApiResponseUsuarios>(`${this.api.getURL()}/Usuarios/Insert`, body);
  }


  deleteUsuarios(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Usuarios/Delete`, { Id });
  }

  updateUsuarios(UsuarioData: UpdateUsuario): Observable<ApiResponseUsuarios> {
    const body = {
      Id: UsuarioData.Id,
      Nombre: UsuarioData.Nombre,
      Contrasena: UsuarioData.Contrasena,
      Rol: UsuarioData.Rol,
      idPersona: UsuarioData.idPersona,
      Usuario: UsuarioData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseUsuarios>(`${this.api.getURL()}/Usuarios/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class ExistenciasService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getExistencias(IdAlmacen: number): Observable<ApiResponseExistencias> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('Almacen', IdAlmacen.toString());
    return this.http.get<ApiResponseExistencias>(`${this.api.getURL()}/Existencias/Get`, { params, headers });
  }

  insertExistencias(ExistenciasData: {
    codigo: string;
    almacen: string;
    cantidad: number;
    usuario: number;
  }): Observable<ApiResponseExistencias> {
    const body = {
      codigo: ExistenciasData.codigo,
      almacen: ExistenciasData.almacen,
      cantidad: ExistenciasData.cantidad,
      usuario: ExistenciasData.usuario,
    };
    return this.http.post<ApiResponseExistencias>(
      `${this.api.getURL()}/Existencias/Insert`,
      body
    );
  }
  deleteExistencias(id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Existencias/Delete`, { id });
  }
  updateExistencias(
    ExistenciasData: UpdateExistencia
  ): Observable<ApiResponseExistencias> {
    const body = {
      id: ExistenciasData.Id,
      codigo: ExistenciasData.Codigo,
      almacen: ExistenciasData.Almacen,
      cantidad: ExistenciasData.Cantidad,
      usuario: ExistenciasData.Usuario,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseExistencias>(
      `${this.api.getURL()}/Existencias/Update`,
      body
    );
  }
}
//-------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class movInventarioService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getMovInventario(MovInvData:{
    IdAlmacen:number,
    FechaInicio:string,
    FechaFin:string
  }): Observable<ApiResponsePuntoV> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponsePuntoV>(`${this.api.getURL()}/MovInventario/Get?IdAlmacen=${MovInvData.IdAlmacen}&FechaInicio=${MovInvData.FechaInicio}&FechaFin=${MovInvData.FechaFin}`,{headers});
  }
  insertMovInventario(MovInvData: {
    idTipoMov: number;
    idAlmacen: number;
    idDestino: number;
    usuarioActualiza: number;
  }): Observable<ApiResponsePuntoV> {
    const body = {
      idTipoMov: MovInvData.idTipoMov,
      idAlmacen: MovInvData.idAlmacen,
      idDestino: MovInvData.idDestino,
      usuarioActualiza: MovInvData.usuarioActualiza,
    };
    return this.http.post<ApiResponsePuntoV>(
      `${this.api.getURL()}/MovInventario/Insert`,
      body
    );
  }
  deleteMovInventario(id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/MovInventario/Delete`, { id });
  }
  updateMovInventario(
    MovInvData: UpdateMovInventario
  ): Observable<ApiResponsePuntoV> {
    const body = {
      Id: MovInvData.Id,
      idTipoMov: MovInvData.idTipoMov,
      idAlmacen: MovInvData.idAlmacen,
      usuario: MovInvData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponsePuntoV>(
      `${this.api.getURL()}/MovInventario/Update`,
      body
    );
  }
}
//-------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class DetalleTicketService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}


  getDetalleTicket(ticketId: number): Observable<DetalleTicket[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DetalleTicket[]>(`${this.api.getURL()}/DetalleTicket/Get?idTicket=${ticketId}`,{headers});
  }
  insertDetalleTicket(DTData: InsertDetalleTicket): Observable<ApiResponsePuntoV> {
    const body = {
      idTicket: DTData.idTicket,
      codigo: DTData.codigo,
      cantidad: DTData.cantidad,
      precioVenta: DTData.precioVenta,
      usuario: DTData.usuario,
      uuid:DTData.uuid
    };
    return this.http.post<ApiResponsePuntoV>(
      `${this.api.getURL()}/DetalleTicket/Insert`,
      body
    );
  }
  deleteDetalleTicket(id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/DetalleTicket/Delete`, { id });
  }
  updateDetalleTicket(DTData: UpdateDetalleTicket): Observable<ApiResponsePuntoV> {
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
    return this.http.put<ApiResponsePuntoV>(
      `${this.api.getURL()}/DetalleTicket/Update`,
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
  constructor(private http:HttpClient,private authService: AuthService, private api:apiURL) { }

  //Enlista los modulos registrados en la base de datos
  getModulos(): Observable<ApiResponseModulos>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return  this.http.get<ApiResponseModulos>(`${this.api.getURL()}/Modulos/Get`,{headers})
  }
InsertModulos(ModulosData: { 
  nombreModulo: string; 
  categoriaModulo: number; 
  usuario: number 
}): Observable<ApiResponseModulos> {
  
  const body = {
    nombreModulo: ModulosData.nombreModulo,
    categoriaModulo: ModulosData.categoriaModulo,
    usuario: ModulosData.usuario,
  };
  return this.http.post<ApiResponseModulos>(`${this.api.getURL()}/Modulos/Insert`, body)
}
deleteModulos(Id : number): Observable<any> {
    return this.http.put(`${this.api.getURL()}/Modulos/Delete`, { Id });
  }
  updateModulos(ModulosData: UpdateModulo): Observable<ApiResponseModulos> {
    const body ={
    id: ModulosData.Id,
    nombreModulo: ModulosData.NombreModulo,
    categoriaModulo: ModulosData.CategoriaModulo,
    usuario: ModulosData.Usuario,
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponseModulos>(`${this.api.getURL()}/Modulos/Update`, body);
  }
}
//--------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class EmpleadosService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getEmpleado(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.api.getURL()}/Empleados/Get`,{headers});
  }
  insertarEmpleado(EmpleadoData: {
    IdPersona: number;
    IdSucursal: number;
    IdPuesto: number;
    usuarioActualiza: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      IdPersona: EmpleadoData.IdPersona,
      IdSucursal: EmpleadoData.IdSucursal,
      IdPuesto: EmpleadoData.IdPuesto,
      usuarioActualiza: EmpleadoData.usuarioActualiza,
    };
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/Empleados/Insert`, body);
  }
  deleteEmpleado(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Empleados/Delete`, { Id });
  }
  updateEmpleado(EmpleadoData: updateEmpleado): Observable<ApiResponseEmpleados> {
    const body = {
      Id: EmpleadoData.Id,
      IdPersona: EmpleadoData.IdPersona,
      IdSucursal: EmpleadoData.IdSucursal,
      IdPuesto: EmpleadoData.IdPuesto,
      UsuarioActualiza: EmpleadoData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Empleados/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PuestosService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getPuestos(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/Puestos/Get`,{headers});
  }
  insertarPuestos(PuestosData: {
    nombre: string;
    descripcion: string;
    salario: number;
    usuarioActualiza: number;
  }): Observable<ApiResponseEmpleados> {
    const body = {
      nombre: PuestosData.nombre,
      descripcion: PuestosData.descripcion,
      salario: PuestosData.salario,
      usuarioActualiza: PuestosData.usuarioActualiza,
    };
    return this.http.post<ApiResponseEmpleados>(`${this.api.getURL()}/Puestos/Insert`, body);
  }
  deletePuestos(Id: number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/Puestos/Delete`, { Id });
  }
  updatePuestos(PuestosData: UpdatePuesto): Observable<ApiResponseEmpleados> {
    const body = {
      Id: PuestosData.Id,
      nombre: PuestosData.nombre,
      descripcion: PuestosData.descripcion,
      salario: PuestosData.salario,
      usuarioActualiza: PuestosData.usuarioActualiza,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/Puestos/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class CategoriaModuloService {
  //se especifica la url base de la api
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient,private authService: AuthService, private api:apiURL) { }

  getCategoriaModulo(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/CatModulo/Get`,{headers});
  }
insertCategoriaModulo(CatModuloData: { nombre: string; descripcion: string; usuario: number }): Observable<ApiResponse> {
  
  const body = {
    nombre: CatModuloData.nombre,
    descripcion: CatModuloData.descripcion,  
    usuario: CatModuloData.usuario
  };
  return this.http.post<ApiResponse>(`${this.api.getURL()}/CatModulo/Insert`, body)
}
deleteCategoriaModulo(id : number): Observable<any> {
    
    return this.http.put(`${this.api.getURL()}/CatModulo/Delete`, { id });
  }
 updateCategoriaModulo(catModuloData: UpdateCategoriaModulo): Observable<ApiResponse> {
  const body ={
    Id: catModuloData.Id,
    nombre: catModuloData.Nombre,
    descripcion: catModuloData.Descripcion,  
    usuario: catModuloData.Usuario
  };
  console.log('Enviando solicitud con el siguiente cuerpo:', body);
  return this.http.put<ApiResponse>(`${this.api.getURL()}/CatModulo/Update`, body);
}
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class DetallePerfilService {
  //se especifica la url base de la api
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient,private authService: AuthService, private api:apiURL) { }

  getDetallePerfil(): Observable<ApiResponse>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return  this.http.get<ApiResponse>(`${this.api.getURL()}/DetallePerfil/Get`,{headers})
  }
insertarDetallePerfil(DetallePerfilData: { idPerfil: number; idModulo: number; acceso: number; usuarioActualiza: number; }): Observable<ApiResponse> {
  
  const body = {
    idPerfil: DetallePerfilData.idPerfil,
    idModulo: DetallePerfilData.idModulo,
    acceso: DetallePerfilData.acceso,
    usuarioActualiza: DetallePerfilData.usuarioActualiza
  };
  return this.http.post<ApiResponse>(`${this.api.getURL()}/DetallePerfil/Insert`, body)
}
deleteDetallePerfil(id : number): Observable<any> {
    return this.http.put(`${this.api.getURL()}/DetallePerfil/Delete`, { id });
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
    return this.http.put<ApiResponse>(`${this.api.getURL()}/DetallePerfil/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getRoles(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/Roles/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class UMService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getUM(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/UM/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getSucursales(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/Sucursales/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class TiposMovService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}

  getTiposMov(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.api.getURL()}/TiposMov/Get`,{headers});
  }
}
//---------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5020/api'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient, private api:apiURL) {}

  SignIn(authInfo: AuthInfo): Observable<ApiResponse2> {
    return this.http.post<ApiResponse2>(`${this.api.getURL()}/SignIn`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
//-----------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class EstadosService {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}


  getEstados(): Observable<Estados[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Estados[]>(`${this.api.getURL()}/Estados/Get`,{headers});
  }
}
//-----------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class AutorizarTicket {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}


  AutorizarTicket(Autorizar: Autorizar): Observable<ApiResponseEmpleados> {
    const body = {
      Id: Autorizar.Id,
      Estatus: Autorizar.Estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponseEmpleados>(`${this.api.getURL()}/DetalleTicket/Autorizar`, body);
  }

}
//-----------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class AutorizarMov {
  //Se especifica la url base de la API
  
  constructor(private http: HttpClient,private authService: AuthService, private api:apiURL) {}


  AutorizarMov(AutorizarMov: AutorizarMovimiento): Observable<ApiResponse> {
    const body = {
      Id: AutorizarMov.Id,
      Estatus: AutorizarMov.Estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.api.getURL()}/AutorizarMov/Update`, body);
  }

}