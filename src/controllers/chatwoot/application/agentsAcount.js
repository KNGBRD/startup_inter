async function listAgentsInAccout(req, res) {
    //get agents in account
    const id_account = req.params.id_account;
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents`;
    console.log(url);//teste
   
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key
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
        return res.status(500).json({error: error});
    }
}

async function addNewAgent(req, res) {
    //POST add new agent in account
    const id_account = req.params.id_account;
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents`;
    const user_api_key =req.headers.user_token;

    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});
     
    //valida userData, status e auto_offline nao sao obrigatorios
    if (!req.body.name || !req.body.name ) return res.status(400).json({error: 'Nome ou email do agente não informado!'});
    req.body.role === (req.body.role === 'admin' || req.body.role === 'agent') ? req.body.role : 'agent';
    req.body.availability_status === (req.body.availability_status === 'available' || req.body.availability_status === 'busy' || req.body.availability_status === 'offline') ? req.body.availability_status : 'available';
    typeof req.body.auto_offline === 'boolean' ? req.body.auto_offline : true;
    const userData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            availability_status: req.body.availability_status,
            auto_offline: auto_offline
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key,                
            },
            body: JSON.stringify(userData) // Dados do body
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

/**
 * The function `updateAgent` is an asynchronous function that updates agent information in an account
 * using a PATCH request with validations for user token, account ID, agent ID, and agent data.
 * @param req - `req` is the request object that contains information about the HTTP request made to
 * the server. It includes data such as parameters, headers, body, and other details sent by the client
 * to the server. In the provided code snippet, `req` is used to extract parameters like `id_account`
 * @param res - The `res` parameter in the `updateAgent` function is the response object that will be
 * used to send back the response to the client making the request. It is typically used to set the
 * status code and send data back to the client in the form of JSON or other formats. In this function
 * @returns a JSON response with the updated data of the agent in the account if the request is
 * successful. If there is an error during the request, it will log an error message to the console.
 */
async function updateAgent(req, res){
    //PATCH update agent in account
    const id_account = req.params.id_account;
    const id_agent = req.params.id_agent;// id of agent updated
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents/${id_agent}`;
    const user_api_key =req.headers.user_token;
    
    //validaçoes
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});
    if (!id_agent) return res.status(400).json({error: 'Id do agente não informado!'});
    if (!req.body.role || !req.body.availability || !req.body.auto_offline) return res.status(400).json({error: 'Dados do agente não informado!'});
    if (req.body.role !== 'agent' || req.body.role !== 'administrator') {
        return res.status(400).json({ error: 'Permissao invalida' });
    }
    if (req.body.availability !== 'available' || req.body.availability !== 'busy' || req.body.availability !== 'offline'){
        return res.status(400).json({ error: 'Status de disponibilidade inválido!' });
    }
    if (typeof req.body.auto_offline !== 'boolean') {
        return res.status(400).json({ error: 'Dados inválidos, esperado boolean!' });
    }
    
    const userData = {
        role: req.body.role,
        availability: req.body.availability,
        auto_offline: req.body.auto_offline
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': user_api_key,                
            },
            body: JSON.stringify(userData) // Aqui é onde você insere os dados do corpo
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

/**
 * This function deletes an agent in an account by sending a DELETE request to the specified API
 * endpoint with the user's API access token.
 * @param req - The `req` parameter in the `deleteAgent` function is an object that represents the HTTP
 * request. It contains information about the request made to the server, such as request headers,
 * parameters, body, and other details. In this function, `req` is used to extract the `id_account
 * @param res - The `res` parameter in the `deleteAgent` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data back to the client. In this function, `res` is used to
 * @returns a JSON response with the data of the deleted agent if the deletion was successful. If there
 * is an error during the deletion process or while making the request, an error message will be logged
 * to the console.
 */
async function deleteAgent(req, res){
    //DELETE delete agent in account
    const id_account = req.params.id_account;
    const id_agent = req.params.id_agent;// id of agent deleted
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents/${id_agent}`;

    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
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
    }
}

export default { listAgentsInAccout, addNewAgent, updateAgent, deleteAgent};