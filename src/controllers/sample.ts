import { Request, Response, NextFunction } from 'express';
import { logger, LogLevel } from '../config/logging';
import Controller from '../framework/controller';

const NAMESPACE = 'Sample controller';

export default class SampleController {
  static get(req: Request, res: Response, next: NextFunction) {
    logger(LogLevel.INFO, NAMESPACE, 'Sample GET was called');

    return res.status(200).json({
      message: 'GET works fine'
    });
  }

  static post(req: Request, res: Response, next: NextFunction) {
    logger(LogLevel.INFO, NAMESPACE, 'Sample POST was called');

    return res.status(201).json({
      message: 'POST works fine',
      receivedBody: req.body
    });
  }

  static put(req: Request, res: Response, next: NextFunction) {
    logger(LogLevel.INFO, NAMESPACE, 'Sample PUT was called');

    return res.status(200).json({
      message: 'PUT works fine!',
      receivedBody: req.body
    });
  }

  static delete(req: Request, res: Response, next: NextFunction) {
    logger(LogLevel.INFO, NAMESPACE, 'Sample delete was called');

    return res.status(200).json({
      message: 'DELETE works fine!'
    });
  }
}
