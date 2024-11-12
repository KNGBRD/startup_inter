import  DataTypes  from "sequelize";
import db from "../db.js";

//adicionar mais dados para clientes consorcios
export default db.define("client", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome_da_empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "telefone do cliente",
  },
  telefone2: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "telefone do cliente (opcional)",
  },  
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreginKey: true,
    comment: "id do usuario que cadastrou o cliente",
  },
  system_chatwoot_config_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreginKey: true,
    comment: "id do sistema chatwoot",
  },
  system_evolution_config_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreginKey: true,
    comment: "id do sistema evolution",
  }
});

//verificar uso de client e a chamada dele para definir as relaçoes
// user.hasMany(client, { foreignKey: 'user_id' });// verificar se está correto client e como chamar
//client.belongsTo(user, { foreignKey: 'user_id' });// verificar se está correto client e comochamar