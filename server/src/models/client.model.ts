import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ClientAttributes {
  id: string;
  name: string;
  industry?: string;
  email: string;
  phone?: string;
  address?: string;
};

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

export default Client;
