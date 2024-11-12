import  DataTypes  from "sequelize";
import db from "../db.js";

export default db.define("sytem_evolution_config",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    evolution_api_global_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "chave de acesso global do sistema evolution",
    },
    evolution_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://apidevelop.zapys.com.br",
        comment: "url de acesso global do sistema evolution",
    }
});