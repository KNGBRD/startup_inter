import { DataTypes } from "sequelize";
import db from "../db.js";
import user from "./userModel.js";

//adicionar mais dados para clientes consorcios
export default db.define("client", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "email do cliente",
  }
});

//verificar uso de client e a chamada dele para definir as relaçoes
// user.hasMany(client, { foreignKey: 'user_id' });// verificar se está correto client e como chamar
//client.belongsTo(user, { foreignKey: 'user_id' });// verificar se está correto client e comochamar