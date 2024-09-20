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