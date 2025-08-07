export const asyncHandler=(func)=>(req,res,next)=>{
    Promise.resolve(func(req,res,next)).catch((err)=>next(err))
}
// this helps to avoid try catch block to be written everywhere
// if there is some async error in func like db crash,etc , .catch() is activated & next(err) is called -> errorMiddleware is run
// here err is an error object which is passed to errorMiddleware