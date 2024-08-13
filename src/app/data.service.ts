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
import { SearchCorteModel, UpdateTickets } from './models/tickets.model';
import { UpdateUsuario } from './models/usuarios.models';
import { UpdateExistencia } from './models/existencia.model';
import { UpdateMovInventario } from './models/movInventario.model';
import { Autorizar, DetalleTicket, UpdateDetalleTicket } from './models/detalleTicket.model';
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
export class AlmacenesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}
  
  getAlmacenes(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/Almacenes/Get`, { headers });
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
  constructor(private http: HttpClient,private authService: AuthService) {}

  //Esta funcion enlista los Clientes de la base de datos
  getClientes(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.apiUrl}/Clientes/Get`, {headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/Clientes/Insert`, body);
  }
  deleteClientes(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Clientes/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Clientes/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ArticulosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getArticulos(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/articulos/Get`,{headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/articulos/Insert`, body);
  }
  deleteArticulos(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/articulos/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/articulos/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getPersonas(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.apiUrl}/Personas/Get`,{headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/Personas/Insert`, body);
  }
  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Personas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class RutasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getRutas(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/Rutas/Get`,{headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/Rutas/Insert`, body);
  }
  deleteRutas(Id: number): Observable<ApiResponseEmpleados> {
    
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Rutas/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Rutas/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class DetalleMovService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getDetalleMov(Id: number): Observable<ArrayBuffer> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ArrayBuffer>(`${this.apiUrl}/DetalleMovimiento/Get?id_Movimientos=${Id}`,{headers});
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
      `${this.apiUrl}/DetalleMovimiento/Insert`,
      body
    );
  }
  deleteDetalleMov(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/DetalleMovimiento/Delete`, { Id });
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
  constructor(private http: HttpClient,private authService: AuthService) {}

  getTickets(TicketData:{
    IdSucursal:number,
    FechaInicio:string,
    FechaFin:string
  }): Observable<ApiResponsePuntoV> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponsePuntoV>(`${this.apiUrl}/Tickets/Get?IdSucursal=${TicketData.IdSucursal}&FechaInicio=${TicketData.FechaInicio}&FechaFin=${TicketData.FechaFin}`,{headers});
  }

  insertarTickets(TicketsData: {
    IdSucursal: number;
    IdCliente: number;
    IdVendedor: number;
    usuario: number;
  }): Observable<ApiResponsePuntoV> {
    const body = {
      IdSucursal: TicketsData.IdSucursal,
      IdCliente: TicketsData.IdCliente,
      IdVendedor: TicketsData.IdVendedor,
      usuario: TicketsData.usuario,
    };
    return this.http.post<ApiResponsePuntoV>(`${this.apiUrl}/Tickets/Insert`, body);
  }

  deleteTickets(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Tickets/Delete`, { Id });
  }

  updateTickets(TicketsData: UpdateTickets): Observable<ApiResponsePuntoV> {
    const body = {
      Id: TicketsData.Id,
      Estatus: TicketsData.estatus,
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponsePuntoV>(`${this.apiUrl}/Tickets/Update`, body);
  }

  getCorte(search: SearchCorteModel): Observable<ArrayBuffer> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ArrayBuffer>(`${this.apiUrl}/Tickets/GetCorte?vendedor=${search.vendedor}&FechaInicio=${search.FechaInicio}&FechaFin=${search.FechaFin}`,{headers});
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  // Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsuarios(): Observable<ApiResponseUsuarios> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseUsuarios>(`${this.apiUrl}/Usuarios/Get`, { headers });
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
    return this.http.post<ApiResponseUsuarios>(`${this.apiUrl}/Usuarios/Insert`, body);
  }


  deleteUsuarios(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Usuarios/Delete`, { Id });
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
    return this.http.put<ApiResponseUsuarios>(`${this.apiUrl}/Usuarios/Update`, body);
  }
}
//-------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class ExistenciasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getExistencias(IdAlmacen: number): Observable<ApiResponseExistencias> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('Almacen', IdAlmacen.toString());
    return this.http.get<ApiResponseExistencias>(`${this.apiUrl}/Existencias/Get`, { params, headers });
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
      `${this.apiUrl}/Existencias/Insert`,
      body
    );
  }
  deleteExistencias(id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Existencias/Delete`, { id });
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
      `${this.apiUrl}/Existencias/Update`,
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
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getMovInventario(MovInvData:{
    IdAlmacen:number,
    FechaInicio:string,
    FechaFin:string
  }): Observable<ApiResponsePuntoV> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponsePuntoV>(`${this.apiUrl}/MovInventario/Get?IdAlmacen=${MovInvData.IdAlmacen}&FechaInicio=${MovInvData.FechaInicio}&FechaFin=${MovInvData.FechaFin}`,{headers});
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
      `${this.apiUrl}/MovInventario/Insert`,
      body
    );
  }
  deleteMovInventario(id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/MovInventario/Delete`, { id });
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
      `${this.apiUrl}/MovInventario/Update`,
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
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}


  getDetalleTicket(ticketId: number): Observable<DetalleTicket[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DetalleTicket[]>(`${this.apiUrl}/DetalleTicket/Get?idTicket=${ticketId}`,{headers});
  }
  insertDetalleTicket(DTData: {
    idTicket: number;
    codigo: number;
    cantidad: number;
    precioVenta: number;
    usuario: number;
  }): Observable<ApiResponsePuntoV> {
    const body = {
      idTicket: DTData.idTicket,
      codigo: DTData.codigo,
      cantidad: DTData.cantidad,
      precioVenta: DTData.precioVenta,
      usuario: DTData.usuario,
    };
    return this.http.post<ApiResponsePuntoV>(
      `${this.apiUrl}/DetalleTicket/Insert`,
      body
    );
  }
  deleteDetalleTicket(id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/DetalleTicket/Delete`, { id });
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
  constructor(private http:HttpClient,private authService: AuthService) { }

  //Enlista los modulos registrados en la base de datos
  getModulos(): Observable<ApiResponseModulos>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return  this.http.get<ApiResponseModulos>(`${this.apiUrl}/Modulos/Get`,{headers})
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
  return this.http.post<ApiResponseModulos>(`${this.apiUrl}/Modulos/Insert`, body)
}
deleteModulos(Id : number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Modulos/Delete`, { Id });
  }
  updateModulos(ModulosData: UpdateModulo): Observable<ApiResponseModulos> {
    const body ={
    id: ModulosData.Id,
    nombreModulo: ModulosData.NombreModulo,
    categoriaModulo: ModulosData.CategoriaModulo,
    usuario: ModulosData.Usuario,
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponseModulos>(`${this.apiUrl}/Modulos/Update`, body);
  }
}
//--------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class EmpleadosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getEmpleado(): Observable<ApiResponseEmpleados> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseEmpleados>(`${this.apiUrl}/Empleados/Get`,{headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/Empleados/Insert`, body);
  }
  deleteEmpleado(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Empleados/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Empleados/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class PuestosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getPuestos(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/Puestos/Get`,{headers});
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
    return this.http.post<ApiResponseEmpleados>(`${this.apiUrl}/Puestos/Insert`, body);
  }
  deletePuestos(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Puestos/Delete`, { Id });
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
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/Puestos/Update`, body);
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class CategoriaModuloService {
  //se especifica la url base de la api
  private  apiUrl= 'http://localhost:5020/api'; 
  constructor(private http:HttpClient,private authService: AuthService) { }

  getCategoriaModulo(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/CatModulo/Get`,{headers});
  }
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
  constructor(private http:HttpClient,private authService: AuthService) { }

  getDetallePerfil(): Observable<ApiResponse>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return  this.http.get<ApiResponse>(`${this.apiUrl}/DetallePerfil/Get`,{headers})
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
  constructor(private http: HttpClient,private authService: AuthService) {}

  getRoles(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/Roles/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class UMService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getUM(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/UM/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getSucursales(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/Sucursales/Get`,{headers});
  }
}
//------------------------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
export class TiposMovService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getTiposMov(): Observable<ApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/TiposMov/Get`,{headers});
  }
}
//---------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5020/api'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) {}

  SignIn(authInfo: AuthInfo): Observable<ApiResponse2> {
    return this.http.post<ApiResponse2>(`${this.apiUrl}/SignIn`, {
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
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}


  getEstados(): Observable<Estados[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Estados[]>(`${this.apiUrl}/Estados/Get`,{headers});
  }
}
//-----------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class AutorizarTicket {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}


  AutorizarTicket(Autorizar: Autorizar): Observable<ApiResponseEmpleados> {
    const body = {
      Id: Autorizar.Id,
      Estatus: Autorizar.Estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponseEmpleados>(`${this.apiUrl}/DetalleTicket/Autorizar`, body);
  }

}
//-----------------------------------------------------------------------------------------------------------------------------//
@Injectable({
  providedIn: "root",
})
export class AutorizarMov {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}


  AutorizarMov(AutorizarMov: AutorizarMovimiento): Observable<ApiResponse> {
    const body = {
      Id: AutorizarMov.Id,
      Estatus: AutorizarMov.Estatus
    }
    console.log('Enviando solicitud con el siguiente cuerpo:', body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/AutorizarMov/Update`, body);
  }

}