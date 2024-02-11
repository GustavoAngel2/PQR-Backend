import { ArticulosService } from "../data.service";

export interface Puesto {
  Id: number;
  nombre: string;
  descripcion: string;
  salario: number;
  usuarioActualiza: string;
  fechaRegistro: Date;
  fechaActualiza: Date;
}
export interface ApiResponse {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: Puesto[];
  };
}
export interface InsertPuesto {
  nombre: String;
  descripcion: String;
  salario: number;
  usuarioActualiza: number;
}
export interface UpdatePuesto {
  Id: number;
  nombre: string;
  descripcion: string;
  salario: number;
  usuarioActualiza: number;
}
export interface DeletePuesto {
  Id: number;
}
