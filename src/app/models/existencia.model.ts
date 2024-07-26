import { AlmacenesService } from "../data.service";

export interface Existencia {
    Id: number;
    Codigo: string;
    Almacen: string;
    Cantidad: number;
    Usuario: string;
    FechaRegistro:Date;
    FechaActualiza:Date;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: Existencia[]; };
  }

  export interface UpdateExistencia{
    Id: number;
    Codigo: string;
    Almacen: number;
    Cantidad: number;
    Usuario: number;
  }
  