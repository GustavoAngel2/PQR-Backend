import { PersonasService } from "../data.service";

export interface Personas {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
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
      data: Personas };
  }

  export interface UpdatePersonas{
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
    Usuario: number;
  }

   export interface DeletePersonas{
     Id: number;
   }
  