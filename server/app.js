const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongdb = require('./config/db');
require('./models/User');
require("./models/Post");
//const User = mongoose.model('users');
const auth = require('./routes/auth');
const post = require('./routes/post');

// CONFIGURATIONS
// -- Routes
app.use(express.json());
app.use(auth);
app.use(post);

// -- Mongoose
mongoose.connect(mongdb.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).then(function(){
    console.log('Connected to mongoDB');
}).catch((err) =>{
    console.log(`An error occured while trying to connect to database ${err}`);
});

const PORT = 3333;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});