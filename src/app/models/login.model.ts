// src/app/models/auth-info.ts
export interface AuthInfo {
  username: string;
  password: string;
}

// src/app/models/api-response.ts
export interface ApiResponse2 {
  statusCode: number;
  error: boolean;
  success: boolean;
  message: string;
  data: {
    Usuario?: any;  // Define el tipo correcto si tienes un modelo específico
    Status?: boolean;
    Mensaje?: string;
    Token?: string;
  };
}
