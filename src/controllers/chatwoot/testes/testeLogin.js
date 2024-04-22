
const userData = {
    email: 'teste@teste.com',
    password: 'teste'
};

async function testeLogin(userData) {    
    const url = 'https://startup-inter.vercel.app/login';   

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
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

testeLogin(userData);