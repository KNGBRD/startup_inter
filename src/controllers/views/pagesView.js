import path from 'path';    //importa path para poder usar o path.join
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obter o caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Obter o diretório do arquivo atual
const __dirname = dirname(__filename);

function homeView(req, res) { //index site
    res.sendFile(path.join(__dirname, './../../view/html/index.html'));
}

 function loginView(req, res) {    
    res.sendFile(path.join(__dirname, './../../view/html/login.html'));
}

function dashboardView(req, res) {
    res.sendFile(path.join(__dirname, './../../view/html/dashboard.html'));
}
function cadasroView(req,res){
    res.sendFile(path.join(__dirname, './../../view/html/cadastro.html'));
}

//teste
function testeView(req, res) { // pagina de cadastro de conta (singUp)
    res.sendFile(path.join(__dirname, './../../view/html/newUser.html'));
}

export default{loginView, dashboardView, cadasroView, testeView, homeView};