import path from 'path';
import _ from 'lodash';
import configNode from 'config-node';
import { EnvironmentConfig } from '../app/interfaces/environment';

const env = process.env.NODE_ENV;

const config: EnvironmentConfig = configNode({
  dir: path.join(__dirname, '/environments'),
  ext: 'js',
  env: env || 'development'
}) as EnvironmentConfig;

export default config;
