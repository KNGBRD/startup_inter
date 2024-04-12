import { Sequelize } from "sequelize"; // importar o sequelize
import dotenv from "dotenv/config.js"; // importar o dotenv para localizar as variáveis de ambiente
import mysql2 from "mysql2";

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  dialectModule: mysql2,
  host: dbHost, //o host, neste caso estamos com um banco local(ou o banco que estiver no .env)
});

// sequelize.authenticate()
// .then(() => {
//     console.log(`Conexão com o banco de dados ${process.evn.DB_NAME} realizado com sucesso!`);
// }).catch( (erro)=> {
//     console.log("Erro: Conexão com o banco de dados não realizado com sucesso! Erro gerado: " + erro);
// });

// User.sync();  //Isso cria a tabela se ela não existir (e não faz nada se já existir)
// User.sync({ force: true });  //Isso cria a tabela, descartando-a primeiro se ela já existir
// User.sync({ alter: true });  //Verifica qual é o estado atual da tabela no banco de dados (quais colunas ela possui, quais são seus tipos de dados, etc), e então realiza as alterações necessárias na tabela para que ela corresponda ao modelo.



export default sequelize; //exportar
