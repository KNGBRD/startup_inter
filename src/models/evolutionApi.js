import { DataTypes } from "sequelize";
import db from "../db.js";

export default db.define("evolution_api", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    evolution_url: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "url do sistema evolution",
    },
    instace_token: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "chave de acesso do usuario no sistema evolution",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "id do usuario do cliente",
        foreginKey: true,
    },
});