import { ModUsuarioService } from "../data.service";

export interface ModuloUsuario {
  ID: number;
  Modulo: string;
  Usuario: string;
  FechaRegistro: Date;
  FechaActualiza: Date;
}

export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: ModuloUsuario;
  };
}

export interface UpdateModuloUsuario {
  Id: number;
  Modulo: number;
  Usuario: number;
}

export interface deleteModuloUsuario {
  Id: number;
}
