import { Request, Response, NextFunction } from 'express';

export default interface Controller {
  get(req: Request, res: Response, next: NextFunction): void;

  post(req: Request, res: Response, next: NextFunction): void;

  put(req: Request, res: Response, next: NextFunction): void;

  delete(req: Request, res: Response, next: NextFunction): void;
}
