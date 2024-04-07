const{status} = require('../constants');

const errorHandler = function(err,req,res,next){
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode){

        case status.NO_DATA_FOUND:
            res.json({
                title: "No Data Found",
                message: err.message,
                stack_Trace: err.stack
            });
            break; 
        case status.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stack_Trace: err.stack
            });
            break;
        case status.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack_Trace: err.stack
            });
            break;
        case status.FORBIDDEN:
            res.json({
                title: "Resource Forbidden",
                message: err.message,
                stack_Trace: err.stack
            });
            break;
        case status.NOT_FOUND:
            res.json({
                title: "Resource not found",
                message: err.message,
                stack_Trace: err.stack
            });
            break;
        case status.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stack_Trace: err.stack
            });
            break;
        case status.UNPROCESSABLE_ENTITY:
            res.json({
                title: "Unprocessable Entity - Incorrect password",
                message: err.message,
                stack_Trace: err.stack
            });
            break;    
        default:
            console.log("default error block hit");
            res.json({
                title:"Something went wrong",
                message:err.message
            });

            break;
    
    }
}

module.exports = errorHandler;