import express from "express";
import routes from "./routes.js";
import db from "./src/db.js";
import cors from 'cors'; // Importando o CORS
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Obter o caminho do diretório atual em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors()); // Usando o CORS
app.use(express.json());
app.use(routes);
// Configurar middleware para servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, './src/view')));

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

//porta no arquivo.env
app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta ${process.env.PORT}`));
