export interface Rol {
  Id: number;
  Rol: string;
  }

  export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: Rol[]; };
  }
  	
