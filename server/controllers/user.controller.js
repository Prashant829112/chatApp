import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, userName, password, gender } = req.body;
  if (!fullName || !userName || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }
  const user = await User.findOne({ userName });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${userName}`;    // api site name -> avatar placeholder
  const newUser = await User.create({
    fullName,                           // same as -> fullName:fullName 
    userName,
    password: hashedPassword,
    gender,
    avatar,
  });
  const tokenData={   
    _id:newUser?._id        // ? -> optional chaining -> if newUser is null then null will be returned without giving error
  }
  const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})    // generating "token" having only _id key of newUser
  res.status(200)           // sending response as success with statusCode 200
  .cookie("token",token,{         // setting cookie in clients browser of name "token" & then sending token
    expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
    httpOnly:true,          // cookie cannot be accessed by js through document.cookie, prevents XSS attacks in which hackers steal cookie through js
    secure:process.env.NODE_ENV==="development",   // NODE_ENV is a built-in env variable -> "development" when local testing or debugging -> "production" when dployed
    sameSite:process.env.NODE_ENV==="development"? "None" : "Lax"
    // secure:true,        // secure:true -> only https sites -> but //localhost is http site-> is required for setting cookie on browser if sameSite:'None'
    // sameSite:'None'     // sameSite defines cookie behaviour for cross-sites(different site) request -> 'None' means cookie will go to any site with secure:true -> 'Lax' means get requests from different site will receive cookie but not form submits or post requests -> 'Strict' means only same site cookie requests will be sent
  })
  .json({
    success: true,
    responseData: {
      newUser,
      token
    },
  });
  res.send("Hello, registered");
});
// (req,res,next)=>{
//     try {
//         const {fullName,userName,password,gender}=req.body
//         console.log(fullName,userName)
//         if(!fullName || !userName || !password || !gender){
//             res.status(400).json({
//                 success:false,
//                 message:"All fields are required"
//             })
//         }
//         res.send("Hello, registered")
//     } catch (error) {

//     }
// }

export const login = asyncHandler(async (req, res, next) => {
  const {userName, password} = req.body;
  if (!userName || !password) {
    return next(new errorHandler("All fields are required", 400));
  }
  const user = await User.findOne({ userName });
  if (!user) {
    return next(new errorHandler("Please enter a valid username or password", 400));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword){
    return next(new errorHandler("Please enter a valid username or password", 400))
  }
  const tokenData={   
    _id:user?._id        
  }
  const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
  res.status(200)
  .cookie("token",token,{         
    expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
    httpOnly:true,          
    secure:process.env.NODE_ENV==="development", 
    sameSite:process.env.NODE_ENV==="development"? "None" : "Lax"
    // secure:true,        // secure:true is required for setting cookie on browser if sameSite:'None'
    // sameSite:'None'
  })
  .json({
    success: true,
    responseData: {
      user,
      token
    },
  });
});

export const getProfile=asyncHandler(async (req,res,next)=>{
  const userId=req.user._id
  const profile=await User.findById(userId)
  res.status(200).json({
    success:true,
    responseData:profile
  })
})

export const logout=asyncHandler(async (req,res,next)=>{
  res.status(200)
  .cookie("token","",{         
    expires:new Date(Date.now()),
    httpOnly:true,          
  })
  .json({
    success:true,
    message:"Logout successful"
  })
})

export const getOtherUsers=asyncHandler(async (req,res,next)=>{
  const otherUsers=await User.find({_id:{$ne:req.user._id}})    // store all users whose _id != req.user._id
  res.status(200).json({
    success:true,
    responseData:otherUsers
  })
})
