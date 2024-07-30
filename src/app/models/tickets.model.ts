export interface tickets {
  Id: number;
  Sucursal: string;
  Cliente: string;
  Vendedor: string;
  Usuario: string;
  Fecha:Date;
  Estatus: number;
  IdSucursal: number;
}

export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    Msg: string;
    data: tickets[];
  };
}

export interface InsetTickets{
  
  IdSucursal: number;
  IdCliente: number ;
  IdVendedor: number;
  Usuario: number;
}
export interface UpdateTickets{
  Id: number;
  estatus: number;
}

export interface deleteTickets{
  Id: number;
}
 
export interface SearchTicketsModel{
  IdSucursal:number
  FechaInicio:string
  FechaFin:string
}

export interface corteGet{
    Id: number
    Vendedor: string
    Total: string
    FechaVenta: string
}

export interface SearchCorteModel{
  vendedor: number
  FechaFin: string
  FechaInicio: string
};