import log4js, { Configuration } from 'log4js';

const init = () => {
    const config: Configuration = {
      appenders: {
        console: {
          type: 'console',
          level: 'debug',
          layout: {
            type: 'pattern',
            pattern: '[%h] [%d] [%c] %m'
          }
        }
      },
      categories: {
        default: {
          appenders: [
            'console'
          ],
          level: 'debug'
        }
      }
    };
    log4js.configure(config);
    const logger: log4js.Logger = log4js.getLogger('console');
    log4js.connectLogger(logger, { level: log4js.levels.DEBUG.toString() });

    return logger;
};

export default init();
