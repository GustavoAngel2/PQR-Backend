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
  
  export interface DeleteDetallePerfil{
    id: number;
  }

  	
