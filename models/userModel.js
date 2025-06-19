
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,

    },
    roles:{
        type:String,
        enum:["customer","agent","admin"],
        default:"customer"
    }
})

// Hash Password before save in db
userSchema.pre('save',async function(next){

    if(!this.isModified("password")) return next();
    const saltRounds = parseInt(process.env.SALT) || 10;
    this.password = await bcrypt.hash(this.password,saltRounds);
    next();

})

// Match Password 

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
} 

module.exports = mongoose.model("User",userSchema);
