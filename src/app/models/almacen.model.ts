import { AlmacenesService } from "../data.service";

export interface Almacen {
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
      data: Almacen[];
    };
  }

  export interface EditarDepartamento{
    Id: number;
    Nombre: string;
    FechaHora: string;
    Activo: number;
    Usuario: number;
  }