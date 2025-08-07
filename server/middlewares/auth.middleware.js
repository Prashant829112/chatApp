import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated=asyncHandler(async (req,res,next)=>{
    const token=req.cookies.token       // token here is the name "token" of the jwtToken that we set in login()/register()
    if(!token){
        return next(new errorHandler("Invalid token",400))
    }
    const tokenData=jwt.verify(token,process.env.JWT_SECRET)    // whatever tokenData had been set while doing const token=jwt.sign(tokenData,key) is retrieved using jwt.verify(token,key)
    req.user=tokenData      // setting tokenData (which is {_id}) in req.user so that it can be retrieved in next()
    next()
})