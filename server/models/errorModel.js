
// Custom error class extending the built-in Error class
class HttpError extends Error {
    constructor(message, errorCode){
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError;