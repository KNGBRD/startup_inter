import { DataTypes } from "sequelize";
import db from "../db.js";

export default db.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_api_key: {   
      type: DataTypes.STRING,
      allowNull: true,
    } 
  });
//Criar a tabela
//db.sync();