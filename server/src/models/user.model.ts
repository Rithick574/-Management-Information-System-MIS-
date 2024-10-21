import { DataTypes, Sequelize, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'client' | 'user';
  clientId?: string;
  adminId?: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {
  validPassword: (password: string) => Promise<boolean>;
}

const User = (sequelize: Sequelize) => {
  const UserModel = sequelize.define<UserInstance>('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'user'),
      defaultValue: 'user',
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCreate: async (user: UserInstance) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user: UserInstance) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  });

  (UserModel as typeof UserModel & { prototype: UserInstance }).prototype.validPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };

  return UserModel;
};

export default User;