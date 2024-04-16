async function getAccount(req, res) {
    const id_account = 4;
    // const url = `${process.env.API_URL}`/platform/api/v1/accounts/`${id_account}`
    const url = 'https://chatdevelop.zapys.com.br/platform/api/v1/accounts/1'
    const api_access_token = 'BdJCBtjQNbTi5RR5NNSUtdXc';

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


 getAccount();
export default getAccount;