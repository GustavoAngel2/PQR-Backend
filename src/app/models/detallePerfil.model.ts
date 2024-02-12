export interface DetalleTicket {
    Id: number;
    idTicket: number;
    codigo: string;
    Articulo: string;
    cantidad: number;
    precioVenta: number;
    Total: number;
    usuario: string;
    Estatus: string;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: DetalleTicket[]; };
  }

  export interface UpdateDetallePerfil{
    id: number;
    idPerfil: number;
    idModulo: number;
    acceso: number;
    Preci: number;
    Estatus: number;
    Usuario: number;
  }
  
  export interface DetalleTicket{
    Id: number;
  }

  	
