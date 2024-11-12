import systemEvolutionConfig from "../models/systemEvolutionConfig";

async function getSystemEvolutionConfig(idUser) { 
    try {
        const systemEvolutionConfig = await systemEvolutionConfig.findOne({
            attributes: ['id', 'evolution_api_global_key','evolution_url'],
            where: {
                user_id: idUser
            }
        });

        if (!systemEvolutionConfig) {
            throw new Error('Usuario nao possui conta do sistema Evolution cadastrada.');
        }

        return systemEvolutionConfig;
    } catch (error) {
        console.log("Erro ao buscar dados do sistema Evolution: ", error); 
        throw new Error(`Erro ao buscar dados do sistema Evolution: ${error.message}`);
    }
};

export default { getSystemEvolutionConfig };