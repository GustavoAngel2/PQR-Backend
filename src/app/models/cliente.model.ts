import { ClientesService } from "../data.service";

export interface Clientes {
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: String;
    FechaActualiza:Date;
    FechaRegistro:Date;
    telefono:number;
    rfc: string;
    curp: string;
    email:string;
    coordenadas: string;
  }

  export interface ApiResponseClientes {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: Clientes[]; };
  }

  export interface UpdateClientes{
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: number;
    Telefono:number;
    RFC: string;
    CURP: string;
    Email:string;
    Coordenadas: string;
  }

   export interface deleteClientes{
     Id: number;
   }
  