import jwt from 'jsonwebtoken';
import rolesPermissions from './../controllers/permission.js';



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


function hasPermission(requiredPermission) {
    
    return function(req, res, next) {
        const checkAuth = authlogin(req,res);//faz o decode do token
        const role = checkAuth.permission;//pega a permissão do usuario
  
      if (!role || !rolesPermissions[role]?.includes(requiredPermission)) {
        return res.status(403).json({
            erro: true,
            mensagem: 'Erro:Permissão negada' });
      }else{
        next();//usuario tem permissão
      }
      
    };
  }

function checkPermission(requiredPermission, role) {
    return rolesPermissions[role]?.includes(requiredPermission);
}

export default { hasPermission, checkPermission};
