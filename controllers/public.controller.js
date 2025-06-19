import * as response from '../helpers/response.helper.js';

const test = async (req, res) => {

    return response.success(res, { message: "This is test public route." })
};

export { test };