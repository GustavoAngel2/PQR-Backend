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

export interface ApiResponseMovInv {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
      Msg: string;
      data: any[];
    };
}