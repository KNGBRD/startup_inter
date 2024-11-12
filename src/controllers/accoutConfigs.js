import ChatWootUserConfig from '../models/chatWoot.js';
import UserDb from '../models/userModel.js';
import env from "dotenv/config";

async function getUserConfig(idUser) {
    try {
        // Busca informações do chatwoot do usuário no banco de dados
        const userConfig = await ChatWootUserConfig.findOne({
            attributes: ['id', 'id_acount_chatwoot', 'user_chatwoot_token', 'url_chatwoot', 'user_id'],
            where: {
                user_id: idUser
            }
        });

        // Verifica se o usuário foi encontrado
        if (!userConfig) {
            throw new Error('Usuario nao possui conta do Chatwoot cadastrada.');
        }

        return userConfig;
    } catch (error) {
        console.log("Erro ao buscar dados do Chatwoot: ", error); //teste
        throw new Error(`Erro ao buscar dados do Chatwoot: ${error.message}`);
    }
};

async function addUserChatwootConfig(req, res) {
    const dados = {
        id_acount_chatwoot: req.body.id_acount_chatwoot,
        user_chatwoot_token: req.body.user_chatwoot_token,
        url_chatwoot: req.body.url_chatwoot,
    };
    if (!req.body.user_email) {
        return res.status(400).json({ error: "Email do usuario é obrigatório" });
    }

    try {
        const idDB = await UserDb.findOne({
            attributes: ['id'],
            where: {
                email: req.body.user_email
            }
        });
        if (!idDB) {
            console.log("Usuario não encontrado"); //teste
            return res.status(400).json({ error: "Usuario não encontrado" });
        }
        dados.user_id = idDB.id;
        const newUserConfig = await ChatWootUserConfig.create(dados);//cria um novo usuario
        console.log("dados teste: ", newUserConfig); //teste
        return res.status(200).json(newUserConfig);
    } catch (error) {
        console.log("erro: ", error); //teste
        return res.status(500).json({ error: "Falha ao salvar usuario" });
    }
}



export default { getUserConfig, addUserChatwootConfig }; 
// export default { addChatwootAccoutConfigs, getAcoutConfigs, getGlobalConfigs,
// getUserConfigs, addUserChatwootConfigs }; 