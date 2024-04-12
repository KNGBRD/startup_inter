import express from "express";

// import swaggerUi from "swagger-ui-express"; //swagger import
// import swaggerDocs from "./swagger.json" assert { type: 'json' }; //Iporta o json do swagger

import clients from "./src/controllers/clients.js";
import user from "./src/controllers/user.js"; //importar user para o login
import auth  from './src/middlewares/auth.js'; // midware para verificar autenticaçao
import dbsync from "./src/controllers/dbUpdate.js";

const routes = express.Router();
// //swagger
// routes.use('/api-docs', swaggerUi.serve);//swagger
// routes.get('/api-docs', swaggerUi.setup(swaggerDocs));//swagger

routes.get("/exemplo", auth.checkUser, clients.findAll);//importa a rota de controller com midware

//rotas publicas

//rotas login
routes.post("/login", user.login);//importa a rota de login
routes.post("/signup", user.singUp);//importa a rota de singup cadastrar novo usuario
routes.patch("/user/update", auth.checkUser, user.updateUser);//atualiza nome e senha do usuario
routes.patch("/user/update_permission", auth.checkUser, user.updatePermission);//atualiza permissao de usuario para admin

//rotas clientes
routes.get("/clients",  clients.findAll);
routes.post("/clients",  clients.addClient);
routes.get("/clients/:id",  clients.findClient);
routes.put("/clients/:id",  clients.updateClient);
routes.delete("/clients/:id",  clients.deleteClient);


//rota para sincronizar banco de dados somente para usuario root
routes.post("/db/sync", auth.checkAdmin, dbsync);

//rorta para saber se a aplicação está rodando
routes.get("/", (req, res) => {
  return res.json({ name: "it's a live!" });
});

export { routes as default };
