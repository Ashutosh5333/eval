const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
     taskname:String,
     status:String,
     tag:String,
     userId:String
})

const todoModel = mongoose.model("todo",todoSchema)

module.exports={todoModel}