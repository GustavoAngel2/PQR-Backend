import { RutasService } from "../data.service";

export interface Rutas {
  Id: number;
  Nombre: string;
  Usuario: string;
  NoSeguro: string;
  Matricula: string;
  NoLicencia: string;
  Conductor: string;
  FechaActualiza:Date;
  FechaRegistro:Date;
}

export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: Rutas
  };
}

export interface UpdateRutas {
  Id: number;
  Nombre: string;
  Usuario: number;
  NoSeguro: string;
  Matricula: string;
  NoLicencia: string;
  Conductor: string;
}


export interface deleteRutas{
  Id: number;
}
