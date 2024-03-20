const express=require("express")
const {connection}=require("./config/db")
const {userRoute}=require("./routes/user_route")
const {bookRoute}=require("./routes/book_route")
const { orderRoute } = require("./routes/order_route")
require("dotenv").config()
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
     res.send(`Masai Library Backend`)  
})

app.use("/api",userRoute)
app.use("/api",bookRoute)
app.use("/api",orderRoute)

app.listen(process.env.port,async()=>{
   try{
await connection
console.log("connected with MongoDB")
    }catch(err){
console.log(err)
    }
    
}
)