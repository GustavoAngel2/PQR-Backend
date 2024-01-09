import { ArticulosService } from "../data.service";

export interface articulos {
    Id: number;
    Codigo: string;
    Descripcion: string;
    UM: string;
    Costo: number;
    Precio: number;
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
      data: articulos };
  }

  export interface updateArticulos{
    Id: number;
    Codigo: string;
    Descripcion: string;
    UM: string;
    Costo: number;
    Precio: number;
    Usuario: String;
  }

   export interface deleteCArticulos{
     Id: number;
   }
  