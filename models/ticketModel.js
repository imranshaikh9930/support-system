const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:String,
    category:{
        type:String,
        enum:["Bug","Feature Request","General"],
        default:"General"
    },
    status:{
        type:String,
        enum:["Open","In Progress","Resolved"],
        default:"Open"
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default:null

},
    githubIssueUrl:String,
    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Ticket",ticketSchema);