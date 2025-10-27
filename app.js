import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./Models/userSchema.js";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://sheharyarhussaa832_db_user_logIn_signUp:admin123@cluster0.h9gcqsn.mongodb.net/?appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => console.log("MONGODB CONNECT!"))
  .catch((error) => console.log("MONGODB ERROR", error.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signUp", async (req, res) => {
  try {
    const body = req.body;
    const userPass = body.password;
    
    const user = await userModel.findOne({ email: body.email });
    
    if (user) {
      return res.json({
        message: "Email address already exists!",
        data: null,
        status: false,
      });
    }
    
    const heahPassword = await bcrypt.hash(userPass, 10);

    const obj = {
      ...body,
      password : heahPassword
    }
console.log(obj ,'obj');


    const userRes = await userModel.create(obj);
    console.log(userRes, "userRes");

    res.json({
      message: "user successfully signUp",
      data: userRes,
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message || " somting went wrong",
      status: false,
    });
  }
});

app.post('/logIn' , async (req , res ) =>{
  try {                               
    const {email , password} = req.body
    const user = await userModel.findOne({email})

    console.log( user ,'user');
    
    
    if(!user){
      return res.json({
        message : " email or password invalid",
        status : false
      })
    }

    const passCompare = await bcrypt.compare( password , user.password)

     if(!passCompare){
      return res.json({
        message : " email or password invalid",
        status : false
      })
    }

    return res.json({
      message : "user successfully login",
      status : true,
      data : user
    })
    
  } catch (error) {
    res.json({
      message : error.message || "something went wrong",
      status : false
    })
  }
})

app.listen(PORT, () =>
  console.log(`server runing on http://localhost:${PORT}`)
);
