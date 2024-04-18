

async function getAllInbox(req, res) {
    const id_account = req.params.id;   

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inboxes`;
    console.log(url);//teste
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = `${process.env.USER_API_KEY}`;//remover depois

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api_access_token': user_api_key
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
        return res.status(500).json({error: error});
    }
}

async function getInbox(req, res) {
    const id_account = req.params.id;
    const id_inbox = req.params.id_inbox;  

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inboxes/${id_inbox}`;
    console.log(url);//teste
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = `${process.env.USER_API_KEY}`;//remover depois

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api_access_token': user_api_key
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
        return res.status(500).json({error: error});
    }
}

async function getAgentInbox(req, res) {
    const id_account = req.params.id;
    const id_inbox = req.params.id_inbox;  

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inbox_members/${id_inbox}`;
    console.log(url);//teste
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = `${process.env.USER_API_KEY}`;//remover depois

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api_access_token': user_api_key
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
        return res.status(500).json({error: error});
    }
}


async function deleteAgentInbox(req, res) {
    const id_account = req.params.id_account;
    const id_inbox = req.params.id_inbox;  
    
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/inbox_members`;

    
    // const user_api_key =req.params.body.user_token;
    const user_api_key = `${process.env.USER_API_KEY}`;//remover depois
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
                'Content-Type': 'application/json',
                'api_access_token': user_api_key,                
            },
            body: JSON.stringify(userData) // Aqui é onde você insere os dados do body
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



export default { getAllInbox, getInbox, getAgentInbox, deleteAgentInbox};