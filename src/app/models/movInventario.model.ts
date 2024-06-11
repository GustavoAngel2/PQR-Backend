import { AlmacenesService } from "../data.service";

export interface MovInventario {
    Id: number;
    IdTipoMov: string;
    IdAlmacen: string;
    fechaMovimiento:Date;
    Usuario: string;
    FechaActualiza:Date;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: MovInventario[]; };
  }

  export interface UpdateMovInventario{
    Id: number;
    idTipoMov: number;
    idAlmacen: number;
    usuarioActualiza: number;
  }
  
  export interface DeleteMovInventario{
    Id: number;
  }