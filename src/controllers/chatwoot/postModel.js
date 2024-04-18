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

createAccountUser(newUser);