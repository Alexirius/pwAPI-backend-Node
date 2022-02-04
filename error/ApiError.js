class ApiError extends Error {
    constructor(status, message, errors = []) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    };

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static Unauthorized(message) {
        return new ApiError(401, `Unauthorized Error: ${message}`);
    }
}

module.exports = ApiError;