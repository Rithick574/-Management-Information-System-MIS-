import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ClientAttributes {
  id: string;
  name: string;
  industry?: string;
  email: string;
  phone?: string;
  password: string;
  role: 'admin' | 'client' | 'user';
  address?: string;
  pan:string;
};

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

// Instance interface
interface ClientInstance 
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {
  validPassword?: (password: string) => Promise<boolean>;
}
const Client = (sequelize: Sequelize) => {
  return sequelize.define<ClientInstance>("Client", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[\d-]+$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'user'),
      defaultValue: 'client',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [10, 10], 
      },
    },
  });
};

export default Client;
