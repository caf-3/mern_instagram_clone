const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_key = require('../config/jwt');
const login_required = require('../middleware/loginRequired');

router.get('/protected', login_required, function(req, res){
    res.send("Ola usuario");
});
router.get('/', function(req, res){
    res.send('Ola mundo');
});
router.post('/signup', function(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:'Por favor, complete todos os campos'});
    }
    User.findOne({email: email}).then(function(user){
        if(user) return res.status(400).json({
            error: "O usuario já foi cadastrado no sitema ",
        });
        bcrypt.hash(req.body.password, 12).then(function(hashedPassword){
            req.body.password = hashedPassword;
            User.create(req.body, (err) =>{
                if(err) return res.status(400).json({
                    error: "Ocorreu um erro ao inserir usuario"
                });
                return res.json({
                    message: "Usuario cadastrado com sucesso"
                });
            })
        })
        

    }).catch((err) =>{
        return res.status(500).json({
            error: "Occorreu um erro interno ao tentar inserir ususario"
        })
    })
});

router.post('/signin', function(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "Por favor, complete todos os campos" });
    }
    User.findOne({email: email}).then(function(usuario){
        if(!usuario){
            return res.status(400).json({error: "Email ou Senha inválidos"})
        }else{
            bcrypt.compare(password, usuario.password).then(doMatch =>{
                if(doMatch){
                    // return res.json({message: "Usuario logado no sistema"});
                    const token = jwt.sign({_id: usuario._id}, jwt_key.jwt_secret);
                    const {_id, name, email} = usuario;
                    return res.json({token, user:{_id, name, email}});
                }else{
                    return res.status(400).json({error: "Email ou Senha inválidos"})
                }
            })
        }
    }).catch((err) =>{
        console.log(err);
    })
})
module.exports = router;