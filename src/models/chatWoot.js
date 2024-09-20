import  DataTypes  from "sequelize";
import db from "../db.js";


export default db.define("chatWoot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_acount_chatwoot: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "id do cliente no site do chatwoot",
    },
    user_chatwoot_token: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "token da conta do cliente no chatwoot",
    },      
    url_chatwoot: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://chat.sphynx.tec.br",
        comment: "url do chatwoot do cliente",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "id do usuario do cliente",
        foreginKey: true,
    },
});