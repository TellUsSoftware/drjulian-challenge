import express, { Request, Response } from 'express';
import compression from 'compression';
import router from './routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import log4js from 'log4js';
import logger from '../libs/logger';
import helmet from 'helmet';
import responseTime from 'response-time';
import errorhandler from 'errorhandler';

const app = express();
app.set('showStackError', true);

// should be placed before express.static
app.use(compression({
  filter: function (req: Request, res: Response) {
    return /json|text|javascript|css/.test(res.getHeader('Content-Type') as string);
  },
  level: 9
}));

app.set('debug', true);

app.use(helmet());
app.use((req, res, next) => {
  logger.info(`[API] ${req.ip} --> ${req.method} ${req.originalUrl}`);
  next();
});
app.use(log4js.connectLogger(logger, {
  level: log4js.levels.INFO.toString(),
  format: '[API] :remote-addr <-- :method :url :status - :response-time ms'
}));
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
}
app.use(responseTime());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(methodOverride());
app.use(express.static('static'));
app.use(router());

export default app;
