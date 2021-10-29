import { AndOperator, OrOperator, WhereOptions } from 'sequelize';

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'admin' | 'user';
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type UserCreationAttributes = Partial<UserAttributes>;

export type UserWhereOptions = WhereOptions<UserAttributes> & Partial<AndOperator<UserAttributes>> & Partial<OrOperator<UserAttributes>>;