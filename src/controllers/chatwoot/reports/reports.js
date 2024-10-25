import ChatWootUserConfigs from './../../acoutConfigs.js';
import moment from 'moment';//biblioteca para manipulação de datas

async function teste(req, res){//teste
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    console.log(chatwootData); //teste
    return res.status(200).json(chatwootData);
}

async function accountConversationMetrics(req, res){
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    console.log(chatwootData); //teste
    const id_account = chatwootData.id_account_chatwoot;
    const url = `${chatwootData.url_chatwoot}/api/v2/accounts/${id_account}/reports/conversations?type=account`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': chatwootData.user_chatwoot_token
            }
        });
    
        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);//verificar o que vai passar no futuro
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }

}

async function accountReportSumary(req, res) {//pega status das conversas(abertas, não atendidas, não atribuidas, pendentes)
    
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    console.log('banco de dados: ', chatwootData.dataValues.id_acount_chatwoot); //teste
    const id_account = chatwootData.dataValues.id_acount_chatwoot;
    const since = req.params.since || moment().startOf('day').valueOf();
    const until = req.params.until || moment().endOf('day').valueOf();	
    
    const url = `${chatwootData.url_chatwoot}/api/v2/accounts/${id_account}/reports/conversations?type=account&since=${since}&until=${until}`;
    console.log(url);//teste
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': chatwootData.user_chatwoot_token
            }
        });
    
        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);//verificar o que vai passar no futuro
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }
}

async function accountReportSumaryInterval(req, res) {//pega status das conversas(abertas, não atendidas, não atribuidas, pendentes)
    
    const chatwootData = await ChatWootUserConfigs.getUserConfigs(req.body.id); // Busca informações do chatwoot do usuário no banco de dados
    console.log('banco de dados: ', chatwootData.dataValues.id_acount_chatwoot); //teste
    const id_account = chatwootData.dataValues.id_acount_chatwoot;
    const since = req.params.since || moment().startOf('day').valueOf();
    const until = req.params.until || moment().endOf('day').valueOf();	
    
    const url = `${chatwootData.url_chatwoot}/api/v2/accounts/${id_account}/reports/summary?since=${since}&until=${until}&type=account`;
    console.log(url);//teste
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'api_access_token': chatwootData.user_chatwoot_token
            }
        });
    
        if (!response.ok) {
            console.log(response.status);//teste
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);//teste
        return res.status(200).json(data);//verificar o que vai passar no futuro
    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
        return res.status(500).json({ error: error });
    }
}






//https://chat.zapys.com.br/api/v2/accounts/2/reports/summary?since=1722470400&until=1725148799&type=account
export default {accountConversationMetrics, accountReportSumary, accountReportSumaryInterval, teste};