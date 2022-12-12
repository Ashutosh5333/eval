const jwt = require("jsonwebtoken")

const authenticate = (req,res,next) =>{

    const token = req.headers?.authorization?.split(" ")[1];
  console.log(token)

    if(token){
         const decoded = jwt.verify(token,"hush")
        console.log(decoded)
        
        if(decoded){
            const userId = decoded.userId
            req.body.userId= userId
            // console.log(userId)

            next();
         }else{
            res.send("plese Login")
         }
    }
    else{
        res.send("please Login")
    }
    
}

module.exports={authenticate}