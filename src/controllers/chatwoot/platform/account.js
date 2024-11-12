import systemChatwootConfig from '../../systemChatwoot.js';

//accounts
async function createAccount(req, res) {//cria uma conta (Create an Account)
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta

    const name_account = req.body.name_account;
    const url = `${dados.chatwoot_url}/platform/api/v1/accounts`;
    const platform_api_key = dados.chatwoot_platform_api_key;


    const dataBody = {
        name: name_account
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
}

async function patchAccount(req, res) {
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta

    const id_account = req.params.id_account;
    const name_account = req.body.name_account;
    const url = `${dados.chatwoot_url}/platform/api/v1/accounts/${id_account}`;
    const platform_api_key = dados.chatwoot_platform_api_key;


    const dataBody = {
        name: name_account
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
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

}

//account users
async function addUserAccount(req, res) {//adiciona um usuario a uma conta  (Create an Account User)
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id_account = req.params.id_account;

    const url = `${dados.chatwoot_url}/platform/api/v1/accounts/${id_account}/account_users`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    const dataBody = {
        "user_id": req.body.user_id,
        "role": req.body.role
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
}

async function deleteUserAccount(req, res) {//Delete an Account User
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id_account = req.params.id_account;

    const url = `${dados.chatwoot_url}/platform/api/v1/accounts/${id_account}/account_users`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    const dataBody = {
        "user_id": req.body.user_id,
    };

    try {
        const response = await fetch(url, {
            method: 'DELETE',
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
}

async function getAllUserAccount(req, res) {//get acout detail
    const dados = systemChatwootConfig.getChatwootSystemConfig(req.body.id); //coleta os dados globais da conta
    const id_account = req.params.id_account;
    const url = `${dados.chatwoot_url}/platform/api/v1/accounts/${id_account}/account_users`;
    const platform_api_key = dados.chatwoot_platform_api_key;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': platform_api_key,
            },
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
}

export default { createAccount, addUserAccount, deleteUserAccount, getAllUserAccount, patchAccount };
 
