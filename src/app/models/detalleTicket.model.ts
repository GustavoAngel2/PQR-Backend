export interface DetalleTicket {
    Id: number;
    idTicket: number;
    codigo: string;
    Articulo: string;
    cantidad: number;
    precioVenta: number;
    Total: number;
    TotalTicket:number;
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

  export interface UpdateDetalleTicket{
    Id: number;
    IdTicket: number;
    Codigo: string;
    Cantidad: number;
    PrecioVenta: number;
    Estatus: number;
    Usuario: number;
  }


  	
