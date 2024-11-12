import  DataTypes  from "sequelize";
import db from "../db.js";

export default db.define("system_chatwoot_config", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    chatwoot_platform_api_key: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        comment: "chave de acesso global do sistema chatwoot",
    },
    chatwoot_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://chat.zapys.com.br",
        comment: "url de acesso global do sistema chatwoot",
    }
});