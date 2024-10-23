import { DataTypes, Sequelize } from "sequelize";

const ActivityLogs = (sequelize: Sequelize) => {
  return sequelize.define("ActivityLogs", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Clients", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    action_type: {
      type: DataTypes.STRING(100), // "CREATE", "UPDATE", "DELETE"
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    old_values: {
      type: DataTypes.JSONB, 
      allowNull: true,
    },
    new_values: {
      type: DataTypes.JSONB, 
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export default ActivityLogs;
