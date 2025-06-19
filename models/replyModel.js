

const mongoose = require("mongoose");

const replyModel = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ticket",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Reply",replyModel);
