exports.logRequestTime = function (req, res, next) {
    var date = new Date();
    req.currentDate = date;
    next();
}