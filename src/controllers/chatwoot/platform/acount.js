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
            method: 'POST',
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

async function getAllAccount(req, res) {//get acout detail
    const id_account = req.body.id_account;
   
    const url = `${process.env.API_URL}/platform/api/v1/accounts/${id_account}`
    const api_access_token = process.env.APLICANTION_API_TOKEN;

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

async function pachAccount(req, res){
    const id_account = req.params.id_account;
    //const id_user = req.params.id;
    const new_name_account = req.body.new_name_account;
    const url = `${process.env.API_URL}platform/api/v1/accounts/${id_account}`;
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = process.env.APLICANTION_API_TOKEN;//remover depois
    const userData = {
        name: new_name_account
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
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

async function deleteAccount(req, res){
    const id_account = req.params.id_account;
    //const id_user = req.params.id;
    const new_name_account = req.body.new_name_account;
    const url = `${process.env.API_URL}platform/api/v1/accounts/${id_account}`;
   
    // const user_api_key =req.params.body.user_token;
    const user_api_key = process.env.APLICANTION_API_TOKEN;//remover depois
    const userData = {
        name: new_name_account
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
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



 getAccount();
export default getAccount;