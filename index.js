const express=require("express");
const app=express();
const port=5000;
const CreateRoutes=require("./Routes/Createuser")
const DisplayRoutes=require("./Routes/DisplayData")
const OrderDataR=require("./Routes/OrderDataR")


const mongoDB=require("./db");
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  



  
app.get("/",(req,res)=>{
    res.send("hello b")
})

app.use(express.json());
app.use("/api", CreateRoutes);
app.use("/api", DisplayRoutes);
app.use("/api", OrderDataR);

app.listen(port,()=>{
    console.log(`server ${port}`);
    
})

