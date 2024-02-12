export interface ModuloUsuario {
  Id: number;
  Modulo: string;
  Usuario: string;
  FechaRegistro: string;
  FechaActualiza: string;
}

export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: ModuloUsuario[];
  };
}

export interface UpdateModuloUsuario {
  Id: number;
  Modulo: number;
  Usuario: number;
}

   export interface deleteModuloUsuario{
     Id: number;
   }
  