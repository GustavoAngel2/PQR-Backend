import { tickets } from "./tickets.model";

export interface DetalleTicket {
    Id: number;
    IdTicket: number;
    Codigo: string;
    Articulo: string;
    Cantidad: number;
    PrecioVenta: number;
    Total: number;
    TotalTicket:number;
    Usuario: string;
    Estatus: string;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: tickets[]; };
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


  	
