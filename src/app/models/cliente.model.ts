import { ClientesService } from "../data.service";

export interface Clientes {
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: String;
    FechaAct:Date;
    FechaReg:Date;
  }

  export interface ApiResponse {
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
  }

   export interface deleteClientes{
     Id: number;
   }
  