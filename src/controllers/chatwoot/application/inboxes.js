import ChatWootUserConfigs from './../../../controllers/acoutConfigs.js';

async function listAllInbox(req, res) {
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${chatwootData.id_account_chatwoot}/inboxes`;
    console.log(url);//teste

    const user_api_key = chatwootData.user_chatwoot_token;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key
            }
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data); // alterar o retorno de data para mudar a resposta
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }
}

async function getAnInbox(req, res) {  //GET lista uma caixa de entrada específica
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    //const id_account = !req.params.id_account ? chatwootData.id_account_chatwoot : req.params.id_account; //verifica se foi passado o id da conta(para funcionario)
    const id_account = chatwootData.id_account_chatwoot;
    const id_inbox = req.params.id_inbox;
    const user_api_key = chatwootData.user_chatwoot_token;
    if (!id_inbox) return res.status(400).json({ error: 'Id do inbox não informado!' });
    //if (!id_account) return res.status(400).json({ error: 'Id da conta não informado!' });

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${id_account}/inboxes/${id_inbox}`;
    console.log(url);//teste   
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key
            }
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }
}

async function listAgentInbox(req, res) {  //GET lista agentes de uma caixa de entrada
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    const id_account = chatwootData.id_account_chatwoot;
    const id_inbox = req.params.id_inbox;
    const user_api_key = chatwootData.user_chatwoot_token;
    if (!id_inbox) return res.status(400).json({ error: 'Id do inbox não informado!' });

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${id_account}/inbox_members/${id_inbox}`;
    console.log(url);//teste

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key
            }
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }
}

async function addAgentInbox(req, res) {  //POST add agent in inbox
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados

    const id_account = chatwootData.id_account_chatwoot;
    const user_api_key = chatwootData.user_chatwoot_token;
    const id_inbox = req.params.id_inbox;
    if (!id_inbox) return res.status(400).json({ error: 'Id do inbox não informado!' });

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${id_account}/inbox_members`;

    const userData = {
        inbox_id: id_inbox,
        user_ids: [
            req.body.user_ids
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key,
            },
            body: JSON.stringify(userData) // Aqui é os dados do body
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
}

async function deleteAgentInbox(req, res) {
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    const id_account = chatwootData.id_account_chatwoot;
    const user_api_key = chatwootData.user_chatwoot_token;
    const id_inbox = req.params.id_inbox;
    if (!id_inbox) return res.status(400).json({ error: 'Id do inbox não informado!' });

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${id_account}/inbox_members`;

    const userData = {
        inbox_id: id_inbox,
        user_ids: [
            req.body.user_ids
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key,
            },
            body: JSON.stringify(userData) // Aqui é onde você insere os dados do body
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
}

async function createInbox(req, res) {
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    const id_account = chatwootData.id_account_chatwoot;
    const user_api_key = chatwootData.user_chatwoot_token;

    const url = `${chatwootData.url_chatwoot}/api/v1/accounts/${id_account}/inboxes`;
    //modificar para os dados que deseja enviar
    const userData = {
        "name": req.req.body.inbox_name,
        "avatar": "string",
        "channel": {
            "type": "web_widget",
            "website_url": "string",
            "welcome_title": "string",
            "welcome_tagline": "string",
            "agent_away_message": "string",
            "widget_color": "string"
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key,
            },
            body: JSON.stringify(userData) // Aqui é os dados do body
        });

        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }

}

export default { listAgentInbox, addAgentInbox, deleteAgentInbox, listAllInbox, getAnInbox };