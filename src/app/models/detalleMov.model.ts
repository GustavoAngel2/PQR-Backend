import { DetalleMovService } from "../data.service";

export interface DetalleMov {
    Id: number;
    Codigo:string;
    Cantidad:number;
    Costo:number;
    FechaActualiza:Date;
    UsuarioActualiza: string;
    Estatus: string;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: DetalleMov[]; };
  }

  export interface InsertDetalleMov{
    idMovimiento: number;
    codigo: string;
    cantidad: number;
    costo: number;
    usuarioActualiza: number;
  }

  export interface UpdateDetalleMov{
    Id: number;
    idMovimiento: number;
    codigo: string;
    cantidad: number;
    costo: number;
    usuarioActualiza: number;
  }

   export interface deleteDetalleMov{
     Id: number;
   }