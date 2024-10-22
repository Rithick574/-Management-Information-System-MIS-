import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "admin" | "client" | "user";
  clientId: string;
  pan:string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  validPassword: (password: string) => Promise<boolean>;
}

const User = (sequelize: Sequelize) => {
  const UserModel = sequelize.define<UserInstance>(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30],
          is: /^[a-zA-Z0-9_-]+$/,
        },
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
        validate: {
          len: [8, 100],
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^\+?[\d\s-]+$/,
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "client", "user"),
        defaultValue: "user",
      },
      pan: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          len: [10, 10], 
        },
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Clients",
          key: "id",
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user: UserInstance) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
        beforeUpdate: async (user: UserInstance) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
      },
    }
  );

  (
    UserModel as typeof UserModel & { prototype: UserInstance }
  ).prototype.validPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };

  return UserModel;
};

export default User;
