const ResponseCode = {
  SUCCESSFUL: "SUCCESSFUL",
  PATH_NOT_FOUND: "PATH_NOT_FOUND",
  STUDENT_NOT_FOUND: "STUDENT_NOT_FOUND",
  USER_EXISTED: "USER_EXISTED",
  USER_NOT_EXISTED: "USER_NOT_EXISTED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  SEND_EMAIL_ERROR: "SEND_EMAIL_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const ResponseMessage = {
  SUCCESSFUL: "Thành công",
  PATH_NOT_FOUND: "Đường dẫn không hợp lệ",
  STUDENT_NOT_FOUND: "Không tìm thấy thông tin học viên",
  USER_EXISTED: "Thông tin người dùng đã tồn tại",
  USER_NOT_EXISTED: "Thông tin người dùng không tồn tại",
  UNAUTHORIZED: "Mật khẩu không hợp lệ",
  FORBIDDEN: "Bạn không có quyền truy cập",
  SEND_EMAIL_ERROR: "Gửi email thất bại",
  INTERNAL_SERVER_ERROR: "Đã có lỗi xảy ra vui lòng thử lại!",
};

module.exports = { ResponseCode, ResponseMessage };
