import { Request, Response, NextFunction } from "express";

const mongoSanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (obj: any) => {
    if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj)) {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key]; 
        } else {
          sanitize(obj[key]); 
        }
      }
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);

  next();
};

// app.use(mongoSanitizeMiddleware);
// can use in app.ts instead of mongo sanitize