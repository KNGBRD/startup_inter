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


// getAccountUsers();
export default getAccountUsers;