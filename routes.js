import express from "express";

// import swaggerUi from "swagger-ui-express"; //swagger import
// import swaggerDocs from "./swagger.json" assert { type: 'json' }; //Iporta o json do swagger

import clients from "./src/controllers/clients.js";
import user from "./src/controllers/user.js"; //importar user para o login
import auth  from './src/middlewares/auth.js'; // midware para verificar autenticaçao
import dbsync from "./src/controllers/dbUpdate.js";

import chatAgents from "./src/controllers/chatwoot/application/agentsAcount.js";
import chatInbox from "./src/controllers/chatwoot/application/inboxes.js";


import loginteste from "./src/controllers/views/loginPage.js";

const routes = express.Router();

//rotas chat Agents
routes.get("/chat/agents/:id_account", chatAgents.listAgentsInAccout);
routes.post("/chat/agents/:id_account", chatAgents.addNewAgent);
routes.patch("/chat/agents/:id_account/:id_agent", chatAgents.updateAgent);
routes.delete("/chat/agents/:id_account/:id_agent", chatAgents.deleteAgent);
//rotas chat Inbox
routes.get("/chat/inbox/:id_account", chatInbox.listAgentInbox);//lista todas as caixas de entrada de uma conta
routes.get("/chat/inbox/:id_account/:id_inbox", chatInbox.listAgentInbox);//lista agentes de uma caixa de entrada
routes.post("/chat/inbox/:id_account/:id_inbox", chatInbox.addAgentInbox);//adiciona um agente a uma caixa de entrada
routes.delete("/chat/inbox/:id_account/:id_inbox", chatInbox.deleteAgentInbox);//remove um agente de uma caixa de entrada

//rotas login
routes.post("/login", user.login);//Rota de login
routes.post("/signup", user.singUp);//importa a rota de singup cadastrar novo usuario
routes.patch("/user/update", auth.hasPermission('root'), user.updateUser);//atualiza nome e senha do usuario
routes.patch("/user/update_permission", auth.hasPermission('root'), user.updatePermission);//atualiza permissao de usuario para admin

//rotas clientes
routes.get("/clients",  clients.findAll);
routes.post("/clients",  clients.addClient);
routes.get("/clients/:id",  clients.findClient);
routes.put("/clients/:id",  clients.updateClient);
routes.delete("/clients/:id",  clients.deleteClient);

//rotas de testes
//rota para teste de permissão de usuario
routes.get("/teste",auth.hasPermission('read'), (req, res) => {
  res.json({ message: 'permissao funcionando' });
});


//rotas de viwes
// routes.get("/view", clients.viewAll);
routes.get('/login_teste',loginteste); 


//rota para sincronizar banco de dados somente para usuario root
routes.post("/db/sync",auth.hasPermission('root'), dbsync);

//rorta para saber se a aplicação está rodando
routes.get("/", (req, res) => {
  return res.json({ name: "it's a live!" });
});

export { routes as default };
