import * as response from './response.helper.js'

const unknownMethod = async (req, res) => {
    response.error(res, { statusCode: 405, success: false, message: `${req.method} method not allowed!` })
}

export { unknownMethod }