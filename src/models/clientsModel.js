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
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "telefone do cliente",
  },
  telefone2: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "telefone do cliente",
  },
  id_conta_cw: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "id do cliente no chatwoot",
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "id do usuario que cadastrou o cliente",
  },
});

//verificar uso de client e a chamada dele para definir as relaçoes
// user.hasMany(client, { foreignKey: 'user_id' });// verificar se está correto client e como chamar
//client.belongsTo(user, { foreignKey: 'user_id' });// verificar se está correto client e comochamar