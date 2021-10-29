import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserAttributes, UserCreationAttributes } from '../interfaces';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public userType: 'admin' | 'user';

  // auto-generated fields
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  // static methods
  public static isPasswordValid(password: string): boolean {
    return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w\W]{8,}$/).test(password);
  }

  public static initialize(sequelize: Sequelize): typeof User {
    return this.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 100],
            msg: 'First name can\'t be empty'
          }
        },
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 100],
            msg: 'Last name can\'t be empty'
          }
        },
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid email'
          },
          isLowercase: true
        },
        set(value: string) {
          value = value && value.trim().toLowerCase();
          this.setDataValue('email', value);
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(password: string) {
          const trimPassword = password ? password.trim() : '';
          if (trimPassword) {
            if (!User.isPasswordValid(trimPassword)) {
              throw new Error('Invalid password');
            }
            const passwordHash = bcrypt.hashSync(trimPassword, 8);
            this.setDataValue('password', passwordHash);
          }
        }
      },
      userType: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    }, {
      sequelize,
      tableName: 'Users',
      timestamps: true,
      paranoid: true,
      hooks: {
      }
    });
  }

  public static associate(): void {
  }
}
