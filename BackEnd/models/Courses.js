const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    semesterId: {type: Number,required: true},
    code: {type: String,required: true,maxlength: 10},
    name: {type: String,required: true,maxlength: 64},
    Suber: {
        type: Array,
        default: [],
    },
},
    {timestamps:true}
);

module.exports = mongoose.model("Course", CourseSchema);