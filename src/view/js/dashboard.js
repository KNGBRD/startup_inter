//mudar o nome do usuario e pegar no arquiov localStorage
//teste

document.addEventListener("DOMContentLoaded", async function () {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById("welcomeMessage").textContent = `Bem vindo de volta, ${userName}!`;
    }

    // Início do dia
    let inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);
    const timestampInicio = inicioDoDia.getTime();
    // Fim do dia
    let fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);
    const timestampFim = fimDoDia.getTime();

    const statusConversas = await getAcountReportSumary(timestampInicio, timestampFim);
    updateStatusValues(statusConversas); //atualliza os valores do primeiro painel
    const sumarioConversas = await getAcountReportSumaryInterval(timestampInicio, timestampFim);
    updateConversationStats(sumarioConversas); //atualiza os valores do segundo painel
});


async function getAcountReportSumary(since, until) {

    try {
        //const backendUrl ="http://127.0.0.1:5000";
        const backendUrl ="https://sphynx.tec.br"; //produçao
        const response = await fetch(`${backendUrl}/reports/conversations/account/${since}/${until}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userDataToken')}`  // Passa o token no cabeçalho como Bearer
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao fazer a requisição reports: ${error}`);
        return { error: error };
    }
}

async function getAcountReportSumaryInterval(since, until) {

    try {
        //const backendUrl ="http://127.0.0.1:5000"; 
        const backendUrl ="https://sphynx.tec.br";
        const response = await fetch(`${backendUrl}/reports/summary/account/${since}/${until}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userDataToken')}`  // Passa o token no cabeçalho como Bearer
            }
        });
        const data = await response.json();
        return data;
    }catch (error) {
        console.error(`Erro ao fazer a requisição reports: ${error}`);
        return { error: error };
    }
}


// pegar os dados das requisiçoes e alimentar nas funçoes a baixo para alterar os valores no dashboard

// Função para atualizar valores do primeiro painel
function updateStatusValues(data) {
    document.getElementById("open").textContent = data.open;
    document.getElementById("unattended").textContent = data.unattended;
    document.getElementById("unassigned").textContent = data.unassigned;
    document.getElementById("pending").textContent = data.pending;
}

// Função para atualizar valores no segundo painel
function updateConversationStats(data) {
    document.getElementById("conversations_count").textContent = data.conversations_count;
    document.getElementById("incoming_messages_count").textContent = data.incoming_messages_count;
    document.getElementById("outgoing_messages_count").textContent = data.outgoing_messages_count;
    document.getElementById("avg_first_response_time").textContent = data.avg_first_response_time.toFixed(2);
    document.getElementById("avg_resolution_time").textContent = data.avg_resolution_time.toFixed(2);
    document.getElementById("resolutions_count").textContent = data.resolutions_count;
    document.getElementById("reply_time").textContent = data.reply_time.toFixed(2);
}






