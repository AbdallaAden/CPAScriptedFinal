const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },   
    desc:{
        type:String,
        max:500
    },
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    likes:{
        type:Array,
        default:[]
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("Comment", CommentSchema);