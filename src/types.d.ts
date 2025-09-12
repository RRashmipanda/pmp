import { Request } from "express";
import { IUser } from "../modules/auth-user/auth-type";

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      PORT?: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }

  export namespace Express {
    interface Request {
      user?: IUser & { _id: string };
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
  authorization: string[];
  user?: IUser & { _id: string };
}

export {};
