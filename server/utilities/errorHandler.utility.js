class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor)
    }
}

export const errorHandler=ErrorHandler

// this utility creates an error object which can be passed to errorMiddleware
// Error here is a built-in class in js used to create error objects
// ErrorHandler is created here which is a custom error class which will also return error object
// but custom commands can be given
// super(message) calls constructor of parent class Error through which message is set
// this.statusCode sets property of error statusCode as statusCode provided in constructor
// stack trace -> js tells thec source of error whenever an error is thrown
// Error.captureStackTrace(this,this.constructor) -> just hides the name of the class ErrorHandler in stack trace