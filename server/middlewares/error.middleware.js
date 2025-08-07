export const errorMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal server Error"
    res.status(err.statusCode).json({
        success:false,
        errMessage:err.message
    })
}
// bcz this fn has 4 arguments, express understands that this is an errorHandlingMiddleware
// whenever an error is generated, express automatically sends the arguments in err