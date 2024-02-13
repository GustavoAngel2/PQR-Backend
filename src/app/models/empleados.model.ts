import { EmpleadosService } from "../data.service";

export interface empleado {
  Id: number;
  Persona: String;
  Sucursal: String;
  Puesto: String;
  usuarioActualiza: String;
  fechaRegistro: Date;
  fechaActualiza: Date;
}
export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: empleado;
  };
}
export interface insertEmpleado {
  IdPersona: number;
  IdPuesto: number;
  IdSucursal: number;
  usuarioActualiza: number;
}
export interface updateEmpleado {
  Id: number;
  IdPersona: number;
  IdSucursal: number;
  IdPuesto: number;
  usuarioActualiza: number;
}
export interface deleteEmpleado {
  Id: number;
}
