const ApiError = require('./ApiError');
/**Middleware that handles api errors and send the error message to the client
 * 
 * @param {Object} err 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const apiErrorHandler = (err,req,res,next)=>{
    if(err instanceof ApiError){
        res.status(err.code).json(err.msg);
    }
    else{
        res.status(500).json('Internel server error');
    }
}

module.exports = apiErrorHandler;