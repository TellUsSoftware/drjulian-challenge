import config from './config/config';
import logger from './libs/logger';
import * as database from './libs/database';
import app from './config/express';
import { AddressInfo } from 'net';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

/**
 * Инициализирует работу с бд.
 */
function configureDatabase() {
  return database.migrate()
    .then(function () {
      return database.initModels();
    });
}

/**
 * Настраивает express и стартует веб сервер.
 *
 * @returns {*} express
 */
function configureExpress() {

  //  Start the app by listening on <port>
  const port = parseInt(process.env.NODE_PORT, 10) || config.port;
  const server = app.listen(port, config.interface, () => {
    const serverAddress = server.address() as AddressInfo;
    logger.info('NODE_ENV %s. Current environment: %s', process.env.NODE_ENV, config.environment);
    logger.info('Postgres host: %s', config.postgres.host);
    logger.info('Postgres database: %s', config.postgres.database);
    logger.info('Express application listening at http://%s:%s', serverAddress.address, serverAddress.port);
  });
  return server;
}

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception: ' + err);
  throw err;
});

function startApp() {
  return configureDatabase()
    .then(function () {
      return configureExpress();
    })
    .catch(function (err) {
      logger.error('Can\'t start application cause: ', err);
      process.exit(1);
    });
}

startApp();
