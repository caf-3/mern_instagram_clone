const jwt = require('jsonwebtoken');
const jwt_scret = require('../config/jwt');
const mongoose = require('mongoose');
const User = mongoose.model("users");
module.exports = function(req, res, next){
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(400).json({error: "Voce deve estar logado!"});
    }else{
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, jwt_scret.jwt_secret, (err, payload) =>{
            if(err){
                return res.status(400).json({error: "Voce deve estar logado!"});
            }else{
                const {_id} = payload;
                User.findById(_id).then(function(usuario){
                    req.user = usuario;
                    next();

                });
            }
        })
    }
}
