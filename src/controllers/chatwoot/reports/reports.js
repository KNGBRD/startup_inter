import ChatWootUserConfigs from './../../acoutConfigs.js';

const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados




//get agents in account
const id_account = chatwootData.id_account_chatwoot;
const url = `${chatwootData.url_chatwoot}/api/v2/accounts/${id_account}/reports`;

try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api_access_token': chatwootData.user_chatwoot_token
        }
    });

    if (!response.ok) {
        console.log(response.status);//teste
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);//teste
    return res.status(200).json(data);//verificar o que vai passar no futuro
} catch (error) {
    console.error(`Erro ao fazer a requisição: ${error}`);
    return res.status(500).json({ error: error });
}