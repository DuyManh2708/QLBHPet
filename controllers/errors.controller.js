const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseResponse = require("../interfaces/response.interface");

const ErrorController = {
    pathNotFound: async function (req, res, next) {
        res.status(404).json(new BaseResponse(ResponseCode.PATH_NOT_FOUND, ResponseMessage.PATH_NOT_FOUND));
    }
}


module.exports = ErrorController;