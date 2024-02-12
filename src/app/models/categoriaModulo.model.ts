export interface CategoriaModulo {
    Id: number;
    Nombre: string;
    Descripcion: string;
    FechaRegistro:Date;
    FechaActualiza:Date;
    Usuario: String;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: CategoriaModulo[]; };
  }

  export interface UpdateCategoriaModulo{
    Id: number;
    Nombre: string;
    Descripcion: string;
    Usuario: String;
  }

   export interface deleteCategoriaModulo{
     Id: number;
   }
  