import { TicketsSevice } from "../data.service";

export interface usuarios {
    Id: number;
    Nombre: string;
    Contrasena: string;
    Rol: string;
    Usuario: string;
    FechaAct: Date;
    FechaReg:Date;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: usuarios[]; };
  }
  export interface UpdateUsuario{
    Id: number;
    Nombre: string;
    Contrasena: string;
    Rol: string;
    Usuario: string;
  }
  export interface DeleteUsuario{
    Id: number;
  }
  