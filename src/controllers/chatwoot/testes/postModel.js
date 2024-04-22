async function createAccountUser(userData) {
    const id_account = 4;
    const url = `${process.env.API_URL}`/platform/api/v1/accounts/`${id_account}`/account_users;
    const api_access_token = process.env.API_TOKEN;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': api_access_token,
                'Authorization': 'Bearer ' + process.env.BEAR_TOKEN
            },
            body: JSON.stringify(userData) // Aqui é onde você insere os dados do corpo
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
}

// Exemplo de uso:
const newUser = {
    name: 'Nome do Usuário',
    email: 'email@exemplo.com',
    // outros campos necessários
};

async function createAccount(req, res){
    //const id_account = req.params.id_account;
    //const id_user = req.params.id;
    const name_account = req.body.name_account;
    const url = `${process.env.API_URL}platform/api/v1/accounts`;
    // const user_api_key =req.params.body.user_token;
    const user_api_key = '4xRmXYqdVCo9H3Xa51ahpxNs';//remover depois
    const userData = {
        name: name_account
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'api_access_token': user_api_key,                
            },
            body: JSON.stringify(userData) // Aqui é onde você insere os dados do corpo
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

async function getAccountUsers(req, res) {
    const id_account = 4;
    const url = `${process.env.API_URL}/platform/api/v1/accounts/${id_account}/account_users`;
    const api_access_token = process.env.API_TOKEN;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api_access_token': api_access_token
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
}


createAccountUser(newUser);