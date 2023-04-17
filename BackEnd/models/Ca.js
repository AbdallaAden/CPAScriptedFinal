const mongoose = require("mongoose");

const CaSchema = new mongoose.Schema({
    CaId:{
        type:String,
    },
    semesterId: {
        type: Number,
    },
    CaName:{
        type:String,
    },
    CaDesc:{
        type:String
    },
    Suber: {
        type: Array,
        default: [],
    },
},
    {timestamps:true}
);

module.exports = mongoose.model("Ca", CaSchema);