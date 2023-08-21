const nodemailer = require('nodemailer');
const BaseResponse = require('../interfaces/response.interface');
const { ResponseCode, ResponseMessage } = require('../constans/response_code');

const EmailController = {
    send: (req, res, next) => {
        let body = req.body;

        // 1. Khởi tạo transporter
        let transporter = nodemailer.createTransport({
            // Thông tin truy cập mail server
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            // service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS // Tạo mật khẩu này trong Application password
            }
        });

        // 2. Khai báo các nội dung email
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: body.email,
            subject: body.title,
            text: 'Góp ý của bạn đã được ghi nhận với nội dung: ' + body.content
        }
        // 3. Lưu góp ý

        // 4. Gửi email
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Send email errr...');
                console.log(err);
                res.json(new BaseResponse(ResponseCode.SEND_EMAIL_ERROR, ResponseMessage.SEND_EMAIL_ERROR));
            } else {
                console.log('Email sent successfully !');
                res.json(new BaseResponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL));
            }
        });
    }
}

module.exports = EmailController;