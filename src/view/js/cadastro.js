// Função que é chamada quando o botão de submit é clicado
document.getElementById("submit").addEventListener('click', async (event) => {
    event.preventDefault();
    var account_id = document.getElementById("account_id").value;
    var user_token = document.getElementById("user_token").value;
    var chatwoot_url = document.getElementById("chatwoot_url").value;
    var user_email = document.getElementById("email").value;
    const backendUrl ="http://127.0.0.1:5000/global_configs/chatwoot";

    if (account_id == "" || user_token == "" || chatwoot_url == "" || user_email == "") {
        alert("Preencha todos os campos!");
        return;
    }

    var dados = {
        id_acount_chatwoot: account_id,
        user_chatwoot_token: user_token,
        url_chatwoot: chatwoot_url,
        user_email: user_email
    };

    fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('userDataToken')}`
        },
        body: JSON.stringify(dados)
    }).then((response) => {
        if (response.status == 200) {
            alert("Usuário cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar usuário!");
        }
    });
});


//teste
//document.getElementById("welcomeMessage").textContent = "Bem vindo de volta, Vinicius";
// Altera o texto do parágrafo
//document.getElementById("accountType").innerHTML = "Your account type is: <strong> Root </strong>";