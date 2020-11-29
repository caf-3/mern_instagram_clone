const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    likes: {
        type: [{type: Schema.Types.ObjectId, ref: "users"}]
    },
    photo:{
        type: String,
        required: true
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},
{
    timestamps: true
});
mongoose.model('posts', Post);
