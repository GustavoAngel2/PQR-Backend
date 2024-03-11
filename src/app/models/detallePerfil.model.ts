<<
export interface DetallePerfil {
  id: number;
  idPerfil: number;
  idModulo: number;
  acceso: number;
  usuarioActualiza: number;
  estatus: number;
  }

>>>>>>> 86348c0faecca547fbaae6985da9908272119d78
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

  export interface deleteDetalleTicket{
    Id: number;
  }

  export interface DetallePerfil{
    id: number;
    nombreModulo: string:
    rol: string;
    acceso: int;
    fechaRegistro: date;
    fechaActualiza: date;
    estatus: int;
    usuarioActualiza: string;
  }
  	
