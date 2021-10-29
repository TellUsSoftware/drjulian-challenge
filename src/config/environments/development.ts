import { EnvironmentConfig } from '../../app/interfaces/environment';

const environment: EnvironmentConfig = {
  port: 8080,
  interface: '0.0.0.0',
  environment: 'development',
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DATABASE || 'your_database',
    username: process.env.POSTGRES_USERNAME || 'your_username',
    password: process.env.POSTGRES_PASSWORD || 'your_password',
    logger: false
  }
};

export = environment;
