import http from 'http';
import express from 'express';
import config from './config/config';
import { logger, LogLevel } from './config/logging';
import appRoutes from './routes';

const NAMESPACE = 'Server';
const router = express();

/** Logging the request */
router.use((req, res, next) => {
  logger(LogLevel.INFO, NAMESPACE, `[REQUEST START] METHOD:[${req.method}], URL:[${req.url}], IP:[${req.socket.remoteAddress || 'N/A'}]`);

  res.on('finish', () => {
    logger(
      res.statusCode > 400 ? LogLevel.ERROR : LogLevel.INFO,
      NAMESPACE,
      `[REQUEST FINISH] METHOD:[${req.method}], URL:[${req.url}], IP:[${req.socket.remoteAddress || 'N/A'}], STATUS:[${res.statusCode}]`
    );
  });

  next();
});

/** Parse teh request */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Rules of API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //TODO: In production, limit the origin ips here
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use(`/api/${config.apiVersion}/`, appRoutes);

/**  Error handling */
router.use((req, res, next) => {
  const error = new Error('Route not found');

  return res.status(404).json({
    message: error.message
  });
});

/**  Create the server*/
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logger(LogLevel.INFO, NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
