import { Sequelize } from "sequelize"; // importar o sequelize
import dotenv from "dotenv/config.js"; // importar o dotenv para localizar as variáveis de ambiente

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || 5432; // porta padrão do PostgreSQL

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "postgres", // informar que estamos usando PostgreSQL
  dialectModule: pg, // I've added this.
  host: dbHost, // o host do banco
  port: dbPort, // porta do PostgreSQL
  logging: false, // desabilitar logs do Sequelize (opcional)
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
