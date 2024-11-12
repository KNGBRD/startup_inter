import SystemChatwootConfig from '../models/systemChatwootConfig.js';

async function addChatwootSystemConfig(req, res) {
    const dados = {
        chatwoot_platform_api_key: req.body.chatwoot_platform_api_key,
        chatwoot_url: req.body.chatwoot_url
    };
    try {
        const newAccountConfigs = await SystemChatwootConfig.create(dados);
        return res.status(200).json(newAccountConfigs);
    } catch (error) {
        console.log("erro: ", error); //teste
        return res.status(500).json({ error: "Falha ao salvar configurações" });
    }
};

async function getGlobalSytemChatwoot(req, res) {
    // funçao para pegar as configuraçoes globais do chatwoot e retornar
    const id = req.params.config_id;
    console.log("id da requisiçao: ", id); //teste
    const dados = await getChatwootSystemConfig(id);
    console.log("RETORNO: ", dados); //teste
    return res.status(200).json(dados);
}

async function getChatwootSystemConfig(configId) {
    //só busca config, para uso interno
    try {
        const globalConfig = await SystemChatwootConfig.findOne({
            attributes: ['id', 'chatwoot_platform_api_key', 'chatwoot_url'],
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

export default { addChatwootSystemConfig, getChatwootSystemConfig, getGlobalSytemChatwoot};