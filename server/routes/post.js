const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("posts");
const loginRequired = require('../middleware/loginRequired');

router.get('/allposts', loginRequired, function(req, res){
    Post.find().populate('postedBy', "_id, name").then(function(post){
        return res.json({post});
    }).catch(err =>{
        console.log('Houve um erro ao pegar todas postagens '+err);
    })
});
router.get('/myposts',loginRequired , function(req, res){
    Post.find({postedBy:req.user._id}).populate('postedBy', "_id, name").then(function(myPosts){
        return res.json({myPosts});
    }).catch(err =>{
        console.log("There was an error while trying to display personal posts "+err);
    })
});
router.post('/createpost', loginRequired ,(req, res) =>{
    const {title, body, photo} = req.body;
    if(!title || !body || !photo){
        return res.status(400).json({error: "Por favor, preencha todos os campos"});
    }else{
        req.user.password = undefined;
        const newPost = {
            title: title,
            body: body,
            photo: photo,
            postedBy: req.user
        };
        new Post(newPost).save().then(result =>{
            return res.json({post: result});
        }).catch((err) =>{
            console.log("Houve um erro ao salvar postagem "+err);
        })
    }
})
router.put('/like', loginRequired, function(req, res){
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    },{
        new: true
    }).exec((err, result) =>{
        if(err){
            return res.status(402).json({error: err});
        }else{
             res.status(200).json({result});
        }
    })
})
router.put('/unlike', loginRequired, function(req, res){
    Post.findOneAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    },{
        new: true
    }).exec((err, result) =>{
        if(err){
            return res.status(402).json({error: err});
        }else{
             res.status(200).json({result});
        }
    })
})
module.exports = router;
