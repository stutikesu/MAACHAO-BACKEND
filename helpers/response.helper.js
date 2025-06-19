import * as response from './response.helper.js'

const success = async (res, { data = null, message = null, pagination = null }) => {
    const response = {
        success: true,
    };
    if (message) {
        response.message = message;
    }
    if (data) {
        response.data = data;
    }
    if (pagination) {
        response.pagination = pagination;
    }
    res.status(200).json(response);
}

const error = async (res, { status = 400, message = null, errors = null }) => {
    const response = {
        success: false,
    };
    if (message) {
        response.message = message;
    }
    if (errors) {
        response.errors = errors;
    }
    res.status(status).json(response);
}

const handleValidationError = ({ error, res }) => {
    if (error.name === 'ValidationError') {
        const formattedErrors = {};
        for (const [field, errorMessage] of Object.entries(error.errors)) {
            formattedErrors[field] = errorMessage.message;
        }
        response.error(res, formattedErrors);
    } else {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: error,
        });
    }
};

export { success, error, handleValidationError }