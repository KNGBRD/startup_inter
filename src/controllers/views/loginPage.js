// const express = require('express');
// const path = require('path');
import path from 'path';    //importa path para poder usar o path.join
// const app = express();

// app.get('/login', function(req, res) {
//     res.sendFile(path.join(__dirname, 'caminho/para/seu/arquivo/login.html'));
// });

// app.listen(3000, function () {
//   console.log('Aplicação escutando na porta 3000!');
// });

export default function loginViews(req, res){
    res.sendFile(path.join(__dirname, '../src/view/html/login.html'));
}

