document.addEventListener('DOMContentLoaded', function () {
    const dadosSalvos = localStorage.getItem('userDataToken');
    console.log(dadosSalvos);  // Exibe os dados salvos no console teste

    if (dadosSalvos) {
        console.log("token salvo na memoria");//teste
        fetch('/teste', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${dadosSalvos}`  // Passa o token no cabeçalho como Bearer
            }
        }).then(response => {
            if (response.ok) {
                // Se a resposta for ok (status 200), redireciona para a página de dashboard
                if (window.location.pathname === '/login') {
                    window.location.href = '/dashboard';  // Redireciona para a página de dashboard
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
            console.error("Erro na requisição:", error);
            // Trata erros de rede ou problemas com a requisição
        });
        //window.location.href = '/dashboard'; // Redireciona  
    } else {
        //window.location.href = '/login'; // Redireciona para a página de login
        console.log("usuario nao logado");
    }
});