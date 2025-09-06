import { Request } from "express";



declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      PORT?: string;
      ACCESS_TOKEN_SECRET:string;
      REFRESH_TOKEN_SECRET:string;
    }
  }
}

export interface IApiError {
  statusCode: number;
  message: string;
  errors?: any[];
  stack?: string;
}

export interface CustomRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  //   user: IAuth;
  authorization: string[];
}

export {};


