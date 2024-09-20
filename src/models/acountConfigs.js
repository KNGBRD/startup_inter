import  DataTypes  from "sequelize";
import db from "../db.js";

export default db.define("acount_configs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    evolution_api_global_api_key: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "chave de acesso global do sistema evolution",
    },
    chatwoor_platarform_api_key: { 
        type: DataTypes.STRING,
        allowNull: false,
        comment: "chave de acesso global do sistema chatwoot",
    },
});