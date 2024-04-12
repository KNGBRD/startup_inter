import express from "express";
import routes from "./routes.js";
import db from "./src/db.js";
import cors from 'cors'; // Importando o CORS

const app = express();

app.use(cors()); // Usando o CORS
app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

//porta no arquivo.env
app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta ${process.env.PORT}`));
