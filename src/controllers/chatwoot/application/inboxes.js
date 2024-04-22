
async function listAllInbox(req, res) {
    //GET list all inboxes in the account
    const id_account = req.params.id_account;   

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inboxes`;
    console.log(url);//teste
   
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});

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
        return res.status(500).json({error: error});
    }
}

async function getAnInbox(req, res) {
    //GET lista uma caixa de entrada específica
    const id_account = req.params.id_account;
    const id_inbox = req.params.id_inbox;
    if (!id_inbox) return res.status(400).json({error: 'Id do inbox não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});   

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inboxes/${id_inbox}`;
    console.log(url);//teste
   
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});

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
        return res.status(500).json({error: error});
    }
}

async function listAgentInbox(req, res) {
    //GET list all agents in a inbox
    const id_account = req.params.id_account;
    const id_inbox = req.params.id_inbox;
    if (!id_inbox) return res.status(400).json({error: 'Id do inbox não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});  

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inbox_members/${id_inbox}`;
    console.log(url);//teste
   
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});

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
        return res.status(500).json({error: error});
    }
}

async function addAgentInbox(req, res) {
    //POST add agent in inbox
    const id_account = req.params.id_account;
    const id_inbox = req.params.id_inbox;//adiciona o id no body do POST
    if (!id_inbox) return res.status(400).json({error: 'Id do inbox não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});  
    
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inbox_members`;
    
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});

    const userData = {
            inbox_id: id_inbox,
            user_ids: [
                req.body.user_id    
            ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
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

async function deleteAgentInbox(req, res) {
    const id_account = req.params.id_account;
    const id_inbox = req.params.id_inbox;
    if (!id_inbox) return res.status(400).json({error: 'Id do inbox não informado!'});
    if (!id_account) return res.status(400).json({error: 'Id da conta não informado!'});  
    
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inbox_members`;
    
    const user_api_key =req.headers.user_token;
    if (!user_api_key) return res.status(401).json({error: 'Token de usuario não informado!'});

    const userData = {
            inbox_id: id_inbox,
            user_ids: [
                req.body.user_id    
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

export default {listAgentInbox, addAgentInbox, deleteAgentInbox, listAllInbox, getAnInbox};