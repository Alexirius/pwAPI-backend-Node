class ApiError extends Error {
    constructor(status, message, errors = []) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    };

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message) {
        return new ApiError(401, `Unauthorized Error: ${message}`);
    }
}

module.exports = ApiError;