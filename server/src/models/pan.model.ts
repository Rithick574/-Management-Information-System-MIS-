import { DataTypes, Sequelize } from "sequelize";

const PANDetails = (sequelize: Sequelize) => {
  return sequelize.define("PANDetails", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    pan_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    dob_match: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pan_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    aadhaar_seeding_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    pan_last_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    name_on_card: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });
};

export default PANDetails;
