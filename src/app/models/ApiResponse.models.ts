export interface ApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: any[];
  };
}

export interface ApiResponsePuntoV {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      Msg: string;
      data: any[];
  };
}

export interface ApiResponseEmpleados {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      data: string;
    };
}

export interface ApiResponseExistencias {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: string;
};
}

export interface ApiResponseModulos {
  StatusCode: number;
  success: boolean;
  fecha: string;
  message: string;
  response: {
    data: string;
};
}