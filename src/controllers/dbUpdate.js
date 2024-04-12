import db from "../db.js";

// verificar se no banco o usuario é root
export default function updateDb(req, res) {
if(req.body.update === "force"){
    db.sync({ force: true });// apaga todo o banco de dados e cria novamente
    console.log("Banco de dados sincronizado a força, todos as tabelas foram apagadas e recriadas. Todos os dados foram perdidos!");
    res.status(200).json({ message: "Banco de dados sincronizado a força, todos as tabelas foram apagadas e recriadas. Todos os dados foram perdidos!" });
}
if(req.body.update === "alter"){
    db.sync({ alter: true });
    console.log("Banco de dados sincronizado, tabelas alteradas conforme modelo");
    return res.status(200).json({ message: "Banco de dados sincronizado, tabelas alteradas conforme modelo" });
}
res.status(400).json({ message: "Erro ao sincronizar banco de dados" });    
};