const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{type:String, max:500},
    desc:{
        type:String,
        max:500
    },
    course:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
},
    {timestamps:true}
);

module.exports = mongoose.model("Post", PostSchema);