import path from 'path';    //importa path para poder usar o path.join
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obter o caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Obter o diretório do arquivo atual
const __dirname = dirname(__filename);

 function loginView(req, res) {    
    res.sendFile(path.join(__dirname, './../../view/html/login.html'));
}

function dashboardView(req, res) {
    res.sendFile(path.join(__dirname, './../../view/html/dashboard.html'));
}

export default{loginView, dashboardView};