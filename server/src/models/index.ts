import Client from "./client.model";
import clinetUser from "./clientUsers.model";
import User from "./user.model";
import PANDetails from "./pan.model";
import sequelize from "../config/database";
import ActivityLogs from "./activityLogs.model";

const ClientModel = Client(sequelize);
const ClientUserModal = clinetUser(sequelize);
const PANDetailsModel = PANDetails(sequelize);
const UserModel = User(sequelize);
const ActivityModel = ActivityLogs(sequelize)


// Client has many Client Users
ClientModel.hasMany(ClientUserModal, { foreignKey: "client_id", as: "clientUsers" });
ClientUserModal.belongsTo(ClientModel, { foreignKey: "client_id", as: "client" });

//pan card details
ClientUserModal.hasOne(PANDetailsModel, { foreignKey: "user_id", as: "panDetails" });
PANDetailsModel.belongsTo(ClientUserModal, { foreignKey: "user_id", as: "user" });

// Activity Logs relationships
UserModel.hasMany(ActivityModel, { foreignKey: "user_id", as: "activityLogs" });
ActivityModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
ClientModel.hasMany(ActivityModel, { foreignKey: "client_id", as: "activityLogs" });
ActivityModel.belongsTo(ClientModel, { foreignKey: "client_id", as: "client" });


export { ClientModel, ClientUserModal,ActivityModel,UserModel,PANDetailsModel };
