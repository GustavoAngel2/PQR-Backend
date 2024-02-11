export interface Modulo {
    Id: number;
    NombreModulo: string;
    CategoriaModulo: string;
    Usuario: string;
    FechaAct:Date;
    FechaReg:Date;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: Modulo[]; };
  }

  export interface UpdateModulo{
    Id: number;
    NombreModulo: string;
    CategoriaModulo: number;
    Usuario: number;
  }

   export interface deleteModulo{
     Id: number;
   }
  