import { getConnection } from '../../libs/database';
import { User } from './user';

const models = {
    User
};

const sequelize = getConnection();

function initModels() {
  Object.values(models)
    .filter(model => typeof model.initialize === 'function')
    .forEach(model => model.initialize(sequelize));

  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate());
}

export default initModels();

export {
    User
};
