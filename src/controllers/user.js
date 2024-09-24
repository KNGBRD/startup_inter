import UserRepository from "../models/userModel.js";
import rolesPermissions from "./permission.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import env from "dotenv/config";
import e from "express";
//import e from "express";
// import dotenv from "dotenv/config.js"; 


async function login(req, res) {
    //valida dados de login
    const user = await UserRepository.findOne({
        attributes: ['id', 'name', 'email', 'password', 'permission'],
        where: {
            email: req.body.email
        }
    });

    //verifica se o usuario existe
    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    //compara a senha
    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }

    //cria o token
    var token = jwt.sign({ id: user.id, name: user.name, permission: user.permission }, `${process.env.JWT_PRIVATE_KEY}`, {
        //expiresIn: 600 //10 min
        // expiresIn: 60 //1 min
        // expiresIn: '10m'
        expiresIn: '12h' //12 horas
        // expiresIn: '1d' // 1 dia
        // expiresIn: '7d' // 7 dia
    });

    //retorna o token
    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token,
        user_id: user.id,
        name: user.name
    });
}

//criar usuario
async function singUp(req, res) {
    console.log("req.body:   ", req.body);//teste
    var dados = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    console.log("dados de cadastro:   ", dados); //teste
    //console.log ("dados de cadastro:   ",dados.name, dados.email, dados.password, req.body.confirm_password);
    if (!dados.name || !dados.email || !dados.password || !req.body.confirm_password) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nome, email e senha são obrigatórios!"
        });
    }
    //verifica se email já existe
    if (await UserRepository.findOne({ where: { email: dados.email } })) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este email já está cadastrado!"
        });
    }

    //compara e encripta a senha 
    if (dados.password === req.body.confirm_password) {
        dados.password = await bcrypt.hash(dados.password, 8);
        console.log('SENHA encriptados: ', dados); //teste
    } else {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: As senhas não conferem!"
        });
    }

    try {
        await UserRepository.create(dados);
        return res.status(200).json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    } catch (err) {
        console.log("erro: ", err);//teste
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado!"
        });
    }
}

async function updateUserPassword(req, res) {
    const dados = {
        email: req.body.email,
        password: req.body.password,
        new_password: req.body.new_password,
        confirm_new_password: req.body.confirm_new_password

    };

    //busca usuario
    const user = await UserRepository.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
            email: dados.email
        }
    });

    //compara a senha
    if (!(await bcrypt.compare(dados.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Senha incorreta!"
        });
    } else if (new_password !== confirm_new_password) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: As novas senhas não conferem!"
        });
    } else {
        user.password = await bcrypt.hash(dados.new_password, 8); //encrypta a nova senha
    }

    //altera a senha    
    await UserRepository.update(user, {
        where: {
            id: user.id
        }
    }).then(() => {
        return res.status(200).json({
            erro: false,
            mensagem: "Senha do usuário atualizada com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não atualizado!"
        });
    });
}

async function updateNameUser(req, res) {
    //busca usuario
    const user = await UserRepository.findOne({
        attributes: ['name'],
        where: {
            email: req.body.email
        }
    });

    //compara o nome e salva
    if (req.body.new_name !== user.name) {
        user.name = req.body.new_name;
        await UserRepository.update(user, {
            where: {
                email: req.body.email
            }
        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Usuário atualizado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não atualizado!"
            });
        });
    }
}

async function updatePermission(req, res) {
    const dados = {
        permission: req.body.new_permission
    };

    if (!req.body.new_permission) return res.status(400).json({ erro: true, mensagem: "Erro: Permissão não informada!" });

    if (!req.body.user_email) return res.status(400).json({ erro: true, mensagem: "Erro: Email do usuário não informado!" });

    if (rolesPermissions[req.body.new_permission] === undefined) return res.status(400).json({ erro: true, mensagem: "Erro: Permissão inválida!" });

    await UserRepository.update(dados, {
        where: {
            email: req.body.user_email
        }
    }).then(() => {
        return res.status(200).json({
            erro: false,
            mensagem: "Usuário atualizado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não atualizado!"
        });
    });
}

export default { login, singUp, updateNameUser, updatePermission, updateUserPassword };