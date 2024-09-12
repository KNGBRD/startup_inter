import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'; // Importando o módulo path

// Obter o caminho do diretório atual em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function loginViews(req, res) {    
    res.sendFile(path.join(__dirname, '../../view/html/login.html'));
}