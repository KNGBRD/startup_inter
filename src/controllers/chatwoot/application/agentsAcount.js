async function getAgents(req, res) {
    const id_account = req.params.id;

    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents`;
    console.log(url);//teste
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = 'CB4c3Jvt2grpTzJAbbaPbo6i';//remover depois

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

async function postNewAgent(req, res) {
    const id_account = req.params.id_account;
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents`;

    // const user_api_key =req.params.body.user_token;
    const user_api_key = '4xRmXYqdVCo9H3Xa51ahpxNs';//remover depois
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


async function patchAgent(req, res){
    //https://app.chatwoot.com/api/v1/accounts/{account_id}/agents/{id}
    const id_account = req.params.id_account;
    const id_user = req.params.id;
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents/${id_user}`;

    // const user_api_key =req.params.body.user_token;
    const user_api_key = '4xRmXYqdVCo9H3Xa51ahpxNs';//remover depois
    const userData = {
        role: req.body.role,
        availability: req.body.availability,
        auto_offline: req.body.auto_offline
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


async function deleteAgent(req, res){
    //https://app.chatwoot.com/api/v1/accounts/{account_id}/agents/{id}
    const id_account = req.params.id_account;
    const id_user = req.params.id;
    const url = `${process.env.API_URL}/api/v1/accounts/${id_account}/agents/${id_user}`;

    // const user_api_key =req.params.body.user_token;
    const user_api_key = '4xRmXYqdVCo9H3Xa51ahpxNs';//remover depois
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
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
    }
}

export default {getAgents, postNewAgent, patchAgent, deleteAgent};