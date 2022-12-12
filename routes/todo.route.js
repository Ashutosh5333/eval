const express = require("express")

const {todoModel} = require("../models/todo.model")
const todoRouter = express.Router()


todoRouter.get("/" , async (req,res) =>{
    const todo = await todoModel.find()
     console.log(todo)
     res.send(todo)
})


 todoRouter.post("/create", async(req,res)=>{
   const payload = req.body;
     try{
     const newtodo =  new todoModel(payload)

     await newtodo.save();
     res.send({"msg":"todo created sucessfully"})
     }catch(err){
        console.log(err)
        res.send({"err":"something went wrong"})
     }
 })


 todoRouter.patch("/update/:todoId", async(req,res) =>{
      const payload= req.body;
      const todoId=req.params.todoId;
      const userId = req.body.userId

      const todo = await todoModel.findOne({_id:todoId})

      if(userId!==todo.userId){
         res.send("note authorised")
      }else{
        await todoModel.findByIdAndUpdate({_id:todoId},payload)
        res.send({"err":"something went wrong"})
      }

 })


 todoRouter.delete("/delete/:todoId", async(req,res) =>{
    const payload= req.body;
    const todoId=req.params.todoId;
    const userId = req.body.userId
    const todo = await todoModel.findOne({_id:todoId})

    if(userId !==todo.userId)
    {
       res.send("note authorised")
    }
    else{
      await todoModel.findByIdAndDelete({_id:todoId},payload)
      res.send({"err":"something went wrong"})
    }

})




 module.exports={todoRouter}