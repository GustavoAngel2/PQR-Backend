import { RutasService } from "../data.service";

export interface Rutas {
    Id: number;
    Nombre: string;
    Usuario: String;
    FechaActualiza:Date;
    FechaRegistro:Date;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: Rutas };
  }

  export interface UpdateRutas{
    Id: number;
    Nombre: string;
    Usuario: number;
  }

   export interface deleteRutas{
     Id: number;
   }
  