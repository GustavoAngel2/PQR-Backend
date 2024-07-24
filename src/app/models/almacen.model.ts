export interface Almacen {
    Id: number;
    Nombre: string;
    Direccion: string;
    UsuarioActualiza: String;
    FechaAct:Date;
    FechaReg:Date;
    Encargado:number;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      Msg: string;
      data: Almacen[]; };
  }

  export interface UpdateAlmacen{
    Id: number;
    Nombre: string;
    Direccion: string;
    Usuario: number;
    Encargado:number;
  }

   export interface deleteAlmacenes{
     Id: number;
   }
  