import db from "../db.js";
//importar todoss os models para sincronizar o banco de dados
import Relationships from "../models/relationships.js";
// import ChatWoot from "../models/chatWoot.js";
// import Evolution from "../models/evolution.js";
// import User from "../models/userModel.js";
// import Client from "../models/client.js";
// import AccountConfigs from "../models/accountConfigs.js";
// import SystemEvolutionConfig from "../models/systemEvolutionConfig.js";
// import ChatWootUserConfigs from "../models/chatWoot.js";


import readline from 'readline';

// Função para atualizar o banco de dados via console
function updateDbFromConsole(command) {
    if (command === "force") {
        db.sync({ force: true });
        console.log("Banco de dados sincronizado a força, todos as tabelas foram apagadas e recriadas. Todos os dados foram perdidos!");
    } else if (command === "alter") {
        db.sync({ alter: true });
        console.log("Banco de dados sincronizado, tabelas alteradas conforme modelo");
    } else {
        console.log("Comando inválido. Use 'force' ou 'alter'.");
    }
}

// Verifica se o ambiente não é de produção
if (process.env.PRODUCTION === 'false') {
    // Configura o readline para ler a entrada do console
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Digite 'force' para recriar o banco de dados ou 'alter' para apenas atualizar as tabelas:");

    rl.on('line', (input) => {
        updateDbFromConsole(input.trim());
    });
}

// Função para atualizar o banco de dados via requisição HTTP
export default function updateDb(req, res) {
    if (req.body.update === "force") {
        db.sync({ force: true }); // apaga todo o banco de dados e cria novamente
        console.log("Banco de dados sincronizado a força, todos as tabelas foram apagadas e recriadas. Todos os dados foram perdidos!");
        res.status(200).json({ message: "Banco de dados sincronizado a força, todos as tabelas foram apagadas e recriadas. Todos os dados foram perdidos!" });
    } else if (req.body.update === "alter") {
        db.sync({ alter: true });
        console.log("Banco de dados sincronizado, tabelas alteradas conforme modelo");
        return res.status(200).json({ message: "Banco de dados sincronizado, tabelas alteradas conforme modelo" });
    }
    res.status(400).json({ message: "Erro ao sincronizar banco de dados" });
};