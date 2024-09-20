import  DataTypes  from "sequelize";
import db from "../db.js";

export default db.define("typebot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    typebot_url: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "url do sistema typebot",
    },
    nome_do_fluxo: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "nome do fluxo do typebot",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "id do usuario que cadastrou o cliente",
        foreginKey: true,
    }
});