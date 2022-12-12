const  express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {userModel} = require("./models/user.model")
const {connection} = require("./config/db")
const {todoRouter}= require("./routes/todo.route")
const { authenticate } = require("./middleware/authenticate")

const app = express()
app.use(express.json())


 app.get("/",(req,res) =>{
    res.send("welcome home")
 })

   app.post("/signup", async(req,res) =>{
      const {email,password} = req.body;

     const userpresent = await userModel.findOne({email})
       if(userpresent?.email){
           res.send("try logged in already exist")
       }else{
           try{
            bcrypt.hash(password,4, async function(err,hash){
                const user = new userModel({email,password:hash});

                await user.save()
                res.send("sign in sucessfull")
            })
            }catch(err){
             console.log(err)
             res.send("Something went wrong try again")
            }
       }
})

   app.post("/login", async(req,res) =>{
    const {email,password} = req.body;

   try{    
   const user = await userModel.find({email})

    if(user.length>0){
        const hashpassword = user[0].password;

        bcrypt.compare(password,hashpassword,  function(err,result){
             if(result){
                const token = jwt.sign({"userId":user[0]._id},"hush")
                res.send({"msg":"Login sucessful","token":token})
             }else{
              res.send("Login failed")
             }
        })}
        else{
            res.send("Login failed")
        }
 }
    catch(err){
        console.log(err)
        res.send("Something went wrong try again later")
       }
      
 })

 
  app.use(authenticate)
 app.use("/todo",todoRouter)


app.listen(8000, async() =>{
     try{
       await connection;
       console.log("connected to database")
     }catch(err){
         console.log("something went wrong")
        console.log(err)
     }
    console.log("listen on 8000")

})
