/** This class handle all the errors
 * @class ApiError
 */
class ApiError{
    /**
     * @constructs ApiError
     * @param {number} code status code
     * @param {string} msg error message
     */
    constructor(code,msg){
        this.code = code;
        this.msg = msg;
    }
    static badRequest(){
        return new ApiError(400,'Bad request');
    }
    static unauthorized(){
        return new ApiError(401,'Unauthorized');
    }
    static forbidden(){
        return new ApiError(403, 'Forbidden');
    }
    static notfound(){
        return new ApiError(404, 'Not found');
    }
    static noContent(){
        return new ApiError(204, 'No Content');
    }

    //Add more error status codes according to the requirement
}

module.exports = ApiError;