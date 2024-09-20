// relationships.js
import db from "../db.js";
import UserModel from "./userModel.js";
import TypebotModel from "./typebot.js";
import EvolutionApiModel from "./evolutionApi.js";
import ClientModel from "./client.js";
import ChatwootModel from "./chatWoot.js";

// Definindo os relacionamentos

// Client pertence a User
ClientModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(ClientModel, { foreignKey: 'user_id', as: 'clients' });

// Chatwoot pertence a User
ChatwootModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(ChatwootModel, { foreignKey: 'user_id', as: 'chatwoots' });

// EvolutioApi pertence a User
EvolutionApiModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(EvolutionApiModel, { foreignKey: 'user_id', as: 'evolutioApis' });

// Typebot pertence a User
TypebotModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(TypebotModel, { foreignKey: 'user_id', as: 'typebots' });

export default {
  UserModel,
  ClientModel,
  ChatwootModel,
  EvolutionApiModel,
  TypebotModel,
};
