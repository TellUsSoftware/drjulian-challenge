/**
 * @module libs/database
 */
import path from 'path';
import Umzug from 'umzug';
import config from '../config/config';
import logger from './logger';
import { Sequelize } from 'sequelize';
import PgBoss from 'pg-boss';

let pgBoss: PgBoss;
export let sequelize: Sequelize;

/**
 * Возвращает параметрами для бд из файла с конфигурацией.
 *
 * @returns {Object} параметры sequelize
 */
function getSequelizeOptions() {
  const writer = (config.postgres.logger) ? console.log : null;
  return {
    logging: writer
  };
}

/**
 * Создает соединение с базой данных
 *
 * @returns {Sequelize}
 */
export function getConnection(): Sequelize {
  if (!sequelize) {
    const { url, host, database, username, password } = config.postgres;
    const postgresUrl = process.env.POSTGRES_URL || url;

    const options = getSequelizeOptions();

    if (!postgresUrl) {
      sequelize = new Sequelize(database, username, password, {
        host: host,
        dialect: 'postgres',
        ...options
      });
    } else {
      sequelize = new Sequelize(postgresUrl, options);
    }
  }
  return sequelize;
}

export function getPgBoss(): PgBoss {
  if (!pgBoss) {
    const { url, host, database, username, password } = config.postgres;
    const postgresUrl = process.env.POSTGRES_URL || url;

    if (postgresUrl) {
      pgBoss = new PgBoss(postgresUrl);
    } else {
      pgBoss = new PgBoss({
        host,
        database,
        password,
        user: username
      });
    }
  }
  return pgBoss;
}

/**
 * Обновляет структуру базы данных до актуального состояния. Возвращает массив с
 * названиями миграционных фалов которые были выполнены.
 *
 * @returns {Promise}
 */
export async function migrate(): Promise<Umzug.Migration[]> {
  const sequelize = getConnection();
  const umzug = new Umzug({
    storage: 'sequelize',
    logging(...args: any[]) {
      logger.info(args);
    },
    storageOptions: {
      sequelize: sequelize
    },
    migrations: {
      // The params that gets passed to the migrations.
      // Might be an array or a synchronous function which returns an array.
      params: [sequelize.getQueryInterface(), Sequelize],
      path: path.join(__dirname + '/../migrations')
    }
  });

  try {
    return await umzug.up();
  } catch(err) {
    await umzug.down();
    throw err;
  }
}

/**
 * Производит инициалитзацию моделей бд.
 */
export function initModels() {
  import('../app/models');
}
