import express from "express";

// import swaggerUi from "swagger-ui-express"; //swagger import
// import swaggerDocs from "./swagger.json" assert { type: 'json' }; //Iporta o json do swagger

import clients from "./src/controllers/clients.js";
import user from "./src/controllers/user.js"; //importar user para o login
import auth from './src/middlewares/auth.js'; // midware para verificar autenticaçao
import dbsync from "./src/controllers/dbUpdate.js";
import globalConfigs from "./src/controllers/acoutConfigs.js";
import chatAgents from "./src/controllers/chatwoot/application/agentsAcount.js";
import chatInbox from "./src/controllers/chatwoot/application/inboxes.js";
import chatPlatformAcount from "./src/controllers/chatwoot/platform/acount.js";
import usersPlatform from "./src/controllers/chatwoot/platform/users.js";
import reports from "./src/controllers/chatwoot/reports/reports.js"

import views from "./src/controllers/views/pagesView.js";

const routes = express.Router();
  	
//rota de configuraçoes globais 
routes.post("/global_configs", auth.hasPermission('root'), globalConfigs.addAcoutConfigs);
routes.get('/global_configs/:config_id', auth.hasPermission('root'),  globalConfigs.getGlobalConfigs);
routes.post("/global_configs/chatwoot", auth.hasPermission('funcionario'), globalConfigs.addUserChatwootConfigs);

//rotas platform chatwoot accouts
routes.post("/chat/platform/accouts", auth.hasPermission('funcionario'), chatPlatformAcount.createAccount);//cria uma caixa de entrada
routes.patch("/chat/platform/accouts/:id_account", auth.hasPermission('root'), chatPlatformAcount.patchAccount);//atualiza uma conta
//rotas platform chatwoot accouts users
routes.post("/chat/platform/accounts/:id_account", auth.hasPermission('funcionario'), chatPlatformAcount.addUserAccount);//adiciona um usuario a uma conta
routes.delete("/chat/platform/accouts/:id_account", auth.hasPermission('root'), chatPlatformAcount.deleteUserAccount);//deleta uma conta
routes.get("/chat/platform/accouts/:id_account", auth.hasPermission('funcionario'), chatPlatformAcount.getAllUserAccount);//lista todos os usuarios de uma conta
//rotas platform chatwoot users
routes.post("/chat/platform/users", auth.hasPermission('funcionario'), usersPlatform.createAUser);//cria um usuario
routes.patch("/chat/platform/users/:id_user", auth.hasPermission('funcionario'), usersPlatform.updateAUser);//atualiza um usuario
routes.get("/chat/platform/users/:id_user", auth.hasPermission('funcionario'), usersPlatform.getAUser);//pega um usuario
routes.delete("/chat/platform/users/:id_user", auth.hasPermission('funcionario'), usersPlatform.deleteAUser);//deleta um usuario

//rotas application chatwoot
//rotas application chat Agents chatwoot
routes.get("/chat/agents", auth.hasPermission('cliente'), chatAgents.listAgentsInAccout);//lista todos os agentes de uma contaa
routes.post("/chat/agents", auth.hasPermission('cliente'), chatAgents.addNewAgent);//adiciona um novo agente na conta
routes.patch("/chat/agents/:id_agent", auth.hasPermission('cliente'), chatAgents.updateAgent);//altera uma gente da conta
routes.delete("/chat/agents/:id_agent", auth.hasPermission('cliente'), chatAgents.deleteAgent);//deleta um agente da conta

//rotas application chat Inbox para cliente chatwoot
routes.get("/chat/inboxes", auth.hasPermission('cliente'), chatInbox.listAgentInbox);//lista todas as caixas de entrada de uma conta
routes.get("/chat/inbox/:id_inbox", auth.hasPermission('cliente'), chatInbox.getAnInbox);//lista uma caixa de entrada especifica
routes.get("/chat/inbox/:id_inbox", auth.hasPermission('cliente'), chatInbox.listAgentInbox);//lista agentes de uma caixa de entrada
routes.post("/chat/inbox/:id_inbox", auth.hasPermission('cliente'), chatInbox.addAgentInbox);//adiciona um agente a uma caixa de entrada
routes.delete("/chat/inbox/:id_inbox", auth.hasPermission('cliente'), chatInbox.deleteAgentInbox);//remove um agente de uma caixa de entrada

//rotas login
routes.post("/login", user.login);//Rota de login
routes.post("/signup", user.singUp);//Cadastrar novo usuario
routes.post("/user/update_password", auth.hasPermission('funcionario'), user.updateUserPassword);//atualiza senha do usuario
routes.post("/user/update_name", auth.hasPermission('funcionario'), user.updateNameUser);//atualiza nome do usuario
routes.patch("/user/update_permission", auth.hasPermission('root'), user.updatePermission);//atualiza permissao de usuario para admin

//rotas clientes
routes.get("/clients", clients.findAll);
routes.post("/clients", clients.addClient);
routes.get("/clients/:id", clients.findClient);
routes.put("/clients/:id", clients.updateClient);
routes.delete("/clients/:id", clients.deleteClient);

//rotas de repots
routes.get("/reports/conversations", auth.hasPermission('cliente'), reports.accountConversationMetrics);
routes.get("/reports/conversations/account/:since/:until", auth.hasPermission('cliente'), reports.accountReportSumary);// novo
routes.get("/reports/summary/account/:since/:until", auth.hasPermission('cliente'), reports.accountReportSumaryInterval);// novo
routes.get("/reports/teste", auth.hasPermission('cliente'), reports.teste); //teste

//rotas de testes
//rota para teste de permissão de usuario
routes.get("/teste", auth.hasPermission('cliente'), (req, res) => {
  res.status(200).json({ message: 'teste token' });
});

//rotas de viwes
routes.get('/home', views.homeView);//home
routes.get('/login', views.loginView);
routes.get('/dashboard',views.dashboardView);
routes.get('/cadastro',views.cadasroView);//teste
routes.get('/new_user', views.testeView);//teste alterar nomes


//rota para sincronizar banco de dados somente para usuario root
routes.post("/db/sync", auth.hasPermission('root'), dbsync);

//rorta para saber se a aplicação está rodando
routes.get("/", views.homeView);

export { routes as default };
