class ResponseFormatter {
    success(data, message = 'Success') {
        return {
            status: 'success',
            message,
            data
        };
    }

    error(message = 'Error', errors = null) {
        return {
            status: 'error',
            message,
            errors
        };
    }
}

module.exports = {
    responseFormatter: new ResponseFormatter()
};
