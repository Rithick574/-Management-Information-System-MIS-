import { DataTypes, Sequelize } from "sequelize";

const Client = (sequelize: Sequelize) => {
  return sequelize.define("Client", {
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
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
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
