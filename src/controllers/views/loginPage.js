import path from 'path';    //importa path para poder usar o path.join


export default function loginViews(req, res) {    
    res.sendFile(path.join(__dirname, '../../view/html/login.html'));
}