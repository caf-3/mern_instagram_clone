if(process.env.NODE_ENV == 'producton'){
    module.exports = {mongoURI: ''}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/instagramclone1'}
}