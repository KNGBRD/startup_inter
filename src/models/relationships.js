// relationships.js
import db from "../db.js";
import UserModel from "./userModel.js";
import TypebotModel from "./typebot.js";
import EvolutionApiModel from "./evolutionApi.js";
import ClientModel from "./client.js";
import ChatwootModel from "./chatWoot.js";
import SystemChatwootConfigModel from "./systemChatwootConfig.js";
import SystemEvolutionConfigModel from "./systemEvolutionConfig.js";

// Definindo os relacionamentos

// Relacionamento User <-> Client
ClientModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(ClientModel, { foreignKey: 'user_id', as: 'clients' });

// Relacionamento User <-> Chatwoot
ChatwootModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(ChatwootModel, { foreignKey: 'user_id', as: 'chatwoots' });

// Relacionamento User <-> EvolutionApi
EvolutionApiModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(EvolutionApiModel, { foreignKey: 'user_id', as: 'evolutioApis' });

// Relacionamento User <-> Typebot
TypebotModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
UserModel.hasMany(TypebotModel, { foreignKey: 'user_id', as: 'typebots' });

// // Relacionamento User <-> Wavoip
// WavoipModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
// UserModel.hasMany(WavoipModel, { foreignKey: 'user_id', as: 'wavoips' });

// Relacionamento User <-> SystemEvolutionConfig
UserModel.belongsTo(SystemEvolutionConfigModel, { foreignKey: 'sytem_evolution_config_id', as: 'systemEvolutionConfig' });
SystemEvolutionConfigModel.hasMany(UserModel, { foreignKey: 'sytem_evolution_config_id', as: 'user' });

// Relacionamento User <-> SystemChatwootConfig
UserModel.belongsTo(SystemChatwootConfigModel, { foreignKey: 'system_chatwoot_config_id', as: 'systemChatwootConfig' });
SystemChatwootConfigModel.hasMany(UserModel, { foreignKey: 'system_chatwoot_config_id', as: 'user' });

export default {
  UserModel,
  ClientModel,
  ChatwootModel,
  EvolutionApiModel,
  TypebotModel,
  SystemChatwootConfigModel,
  SystemEvolutionConfigModel
};
