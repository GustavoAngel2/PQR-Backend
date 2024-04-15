
export interface DetallePerfil {
  id: number;
  idPerfil: number;
  idModulo: number;
  acceso: number;
  usuarioActualiza: number;
  estatus: number;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: DetallePerfil[]; };
  }

  export interface InsertDetallePerfil {
    id: number;
    idPerfil: number;
    idModelo: number;
    acceso: number;
  }

  export interface UpdateDetallePerfil{
    Id: number;
    idPerfil: number;
    idModulo: number;
    acceso: number;
    usuarioActualiza: number;
    estatus: number;
  }

  export interface InsertDetallePerfil{
    idPerfil: number;
    idModulo: number;
    acceso: number;
    usuarioActualiza: number;
  }



  	
