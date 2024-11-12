import systemChatwootConfig from './../../systemChatwoot.js';


async function createAUser(req, res) { // Create a User
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta

    const url = `${dados.chatwoot_url}platform/api/v1/users`;
    const platform_api_key = dados.chatwoot_platform_api_key;


    const dataBody = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': platform_api_key,
            },
            body: JSON.stringify(dataBody) // Aqui é onde você insere os dados do corpo
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
};

async function updateAUser(req, res) { //Update a user
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id = req.params.id_user;
    const dataBody = {};

    const url = `${dados.chatwoot_url}platform/api/v1/users/${id}`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    if (req.body.name) {
        dataBody.name = req.body.name;
    };
    if (req.body.email) {
        dataBody.email = req.body.email;
    };
    if (req.body.password) {
        dataBody.password = req.body.password;
    };
    if (req.body.custom_attributes) {
        dataBody.custom_attributes = req.body.custom_attributes;
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': platform_api_key,
            },
            body: JSON.stringify(dataBody) //body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
};

async function getAUser(req, res) { // Get an user details
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id = req.params.id_user;

    const url = `${dados.chatwoot_url}platform/api/v1/users/${id}`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': platform_api_key,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
};

async function deleteAUser(req, res) { // Delete an user
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id = req.params.id_user;

    const url = `${dados.chatwoot_url}platform/api/v1/users/${id}`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': platform_api_key,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
};

export default { createAUser, updateAUser, getAUser, deleteAUser };