document.addEventListener('DOMContentLoaded', function () {
    const dadosSalvos = localStorage.getItem('userDataToken');
    console.log(dadosSalvos);  // Exibe os dados salvos no console teste

    if (dadosSalvos) {
        console.log("token salvo na memoria", dadosSalvos);//teste
        //const backendUrl ="http://127.0.0.1:5000";
        const backendUrl ="https://sphynx.tec.br";
        fetch(`${backendUrl}/teste`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${dadosSalvos}`  // Passa o token no cabeçalho como Bearer
            }
        }).then(response => {
            if (response.ok) {
                // Se a resposta for ok (status 200), redireciona para a página de dashboard
                if (window.location.pathname === '/login') {
                    setTimeout(() => {//redireciona para a pagina de dashboard com atraso de 1 segundo
                        window.location.href = '/dashboard';
                    }, 1000); // Redireciona após 1 segundo
                }
            } else {
                // Se houver erro (como 401 Unauthorized), exibe uma mensagem ou toma outra ação
                console.error("Falha ao autenticar. Redirecionando para a página de login.");//teste
                localStorage.clear();//limpa o local storage
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';  // Redireciona para a página de login
                }
            }
        }).catch(error => {
            // Trata erros de rede ou problemas com a requisição
            console.error("Erro na requisição:", error);
        });
    } else if (window.location.pathname !== '/login') {
        console.log("usuario nao logado"); //teste
        window.location.href = '/login';  // Redireciona para a página de login
    }
});