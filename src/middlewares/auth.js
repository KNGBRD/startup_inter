import jwt from 'jsonwebtoken';


// function authlogin(req, res, next){
//     const authHeader = req.headers.authorization;
//     if(!authHeader){           
//         return res.status(401).json({
//             erro: true,
//             mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token A!"                
//         });
//     }
//     const [, token ]= authHeader.split(' ');        
//     if(!token){
//         return res.status(401).json({ 
//             erro: true,
//             mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token B!"
//         });
//     }

//     try{
//         const decode = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`);
//         if(decode.permission == "user" || decode.permission == "admin"){
//             req.body.id = decode.id;
//             req.body.name = decode.name;
//             return next();
//             }else{
//                 return res.status(401).json({
//                     erro: true,
//                     mensagem: "Erro: Você não tem permissão para acessar essa página!"
//                 });
//             }
//     }catch(err){
//         return res.status(401).json({
//             erro: true,
//             mensagem: "Erro: Necessário realizar o login para acessar a página! Token inválido ou expirado!"
//         });
//     }

// };


function authlogin(req, res){
    const authHeader = req.headers.authorization;
    if(!authHeader){   
        console.log('falta token A!'); // teste       
        return res.status(401).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token A!"                
        });
    }
    const [, token ]= authHeader.split(' ');        
    if(!token){
        console.log('falta token B!'); //teste
        return res.status(401).json({ 
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token B!"
        });
    }

    try{
        const decode = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`);        
            req.body.id = decode.id;
            req.body.name = decode.name;
            return decode;      
    }catch(err){
        console.log('sem permisão ou token invalido!'); //teste
        return res.status(401).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Token inválido ou expirado!"
        });
    }
};



function checkUser(req, res, next){
    const checkAuth = authlogin(req, res);

    if(checkAuth.permission == "user"){      
        return next();
    }else{        
        return res.status(401).json({
            erro: true,
            mensagem: "Erro: Você não tem permissão para acessar essa página!"
        });
    }
}

function checkAdmin(req, res, next){
    const checkAuth = authlogin(req,res);

    if(checkAuth.permission == "user" || checkAuth.permission == "admin"){        
        return next();
    }else{
        return res.status(401).json({
            erro: true,
            mensagem: "Erro: Você não tem permissão para acessar essa página!"
        });
    }
}

export default {checkAdmin, checkUser};
