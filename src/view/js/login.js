//var backend = 'http://127.0.0.1:5000';
var backend = 'https://sphynx.tec.br';
document.getElementById('loginButton').addEventListener('click', async (event) => {
    event.preventDefault();
    // Coleta os valores dos campos de e-mail e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        alert('Preencha todos os campos!');
        return;
    }
    //validaçao de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido!');
        return;
    }
    console.log("teste");//teste

    // Cria o corpo da requisição com os dados coletados
    const dataBody = {
        email: email,
        password: password
    };
    console.log("e-mail e senha coletados : ", dataBody);
    // Envia a requisição POST

    try {
        const response = await fetch(`${backend}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody) // Aqui é onde você insere os dados do corpo
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);//teste
        localStorage.setItem('userDataToken', data.token);
        localStorage.setItem('userName', data.name);
        // Recupera os dados do Local Storage
        const dadosSalvos = localStorage.getItem('userDataToken');
        console.log("dados salvos no local storage: ", dadosSalvos);

        setTimeout(() => {//redireciona para a pagina de dashboard com atraso de 1 segundo
            window.location.href = '/dashboard';
        }, 1000); // Redireciona após 1 segundo

    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }
});

