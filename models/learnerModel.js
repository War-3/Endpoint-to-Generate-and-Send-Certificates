const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true},
        address: {type: String},
        phoneNumber: {type: Number}
              
    },{
        timestamps: true
    })


const  user = new mongoose.model("user", userSchema)

module.exports = user;


