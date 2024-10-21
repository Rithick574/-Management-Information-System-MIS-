import Admin from "./admin.model";
import Client from "./client.model";
import User from "./user.model";
import sequelize from "../config/database";

const AdminModel = Admin(sequelize);
const ClientModel = Client(sequelize);
const UserModel = User(sequelize);

// Admin has many Clients
AdminModel.hasMany(ClientModel, { foreignKey: "adminId", as: "clients" });
ClientModel.belongsTo(AdminModel, { foreignKey: "adminId", as: "admin" });

// Client has many Users
ClientModel.hasMany(UserModel, { foreignKey: "clientId", as: "users" });
UserModel.belongsTo(ClientModel, { foreignKey: "clientId", as: "client" });

// Optionally: Admin can have direct Users
AdminModel.hasMany(UserModel, { foreignKey: "adminId", as: "users" });
UserModel.belongsTo(AdminModel, { foreignKey: "adminId", as: "admin" });

export { AdminModel, ClientModel, UserModel };
