import ChatwootModel from './../models/acountConfigs.js';
import ChatWootUserConfigs from './../models/chatWoot.js';
import env from "dotenv/config";

async function addAcoutConfigs(req, res) {
    const dados = {
        evolution_api_global_key: req.body.evolution_api_global_key,
        evolution_url: req.body.evolution_url,
        chatwoot_platform_api_key: req.body.chatwoot_platform_api_key,
        chatwoot_url: req.body.chatwoot_url
    };
    try {
        const newAcountConfigs = await ChatwootModel.create(dados);
        return res.status(200).json(newAcountConfigs);
    } catch (error) {
        console.log("erro: ", error); //teste
        return res.status(500).json({ error: "Falha ao salvar configurações" });
    }
};

async function getGlobalConfigs(req, res) {
    const id = req.params.config_id;
    console.log("id da requisiçao: ", id); //teste
    const dados = await getAcoutConfigs(id);
    console.log("RETORNO: ", dados); //teste
    return res.status(200).json(dados);
}

async function getAcoutConfigs(configId) {
    try {
        const globalConfig = await ChatwootModel.findOne({
            attributes: ['id', 'evolution_api_global_key', 'evolution_url', 'chatwoot_platform_api_key', 'chatwoot_url'],
            where: {
                id: configId
            }
        });
        if (!globalConfig) {
            throw new Error('Usuario nao possui conta do Chatwoot cadastrada.');
        }
        return globalConfig;
    } catch (error) {
        throw new Error(`Erro ao buscar dados do Chatwoot: ${error.message}`);
    }
};

async function getUserConfigs (idUser){
    try {
        // Busca informações do chatwoot do usuário no banco de dados
        const userConfig = await ChatWootUserConfigs.findOne({
            attributes: ['id', 'id_acount_chatwoot', 'user_chatwoot_token', 'url_chatwoot','user_id'],
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
        // Lança um erro se não encontrar o usuário ou se ocorrer outro erro
        throw new Error(`Erro ao buscar dados do Chatwoot: ${error.message}`);
    }
};

export default { addAcoutConfigs, getAcoutConfigs, getGlobalConfigs, getUserConfigs }; 