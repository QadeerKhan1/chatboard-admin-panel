export const EndPoints = {
  // Auth endpoints
  SIGNUP: "api/user/register",
  LOGIN: "user/login",
  GET_USER: "api/user",
  GET_IN_TOUCH: "api/user/getInTouch",
  USER_DELETE_VERIFY_OTP: "api/user/verify-otp-delete-user",
  USER_DELETE: "api/user/delete-user",

  REQUEST_OTP: "user/requestOtp",
  SEND_OTP_PHONE: "api/user/send-otp-to-phone",
  VERIFY_EMAIL: "api/user/verify-email",
  VERIFY_OTP: "user/verifyOtp",
  FORGOT_PASSWORD: "user/forgotPassword",
  RESEND_VERIFICATION_OTP: "api/user/resend-otp",
  RESET_PASSWORD: "user/resetPassword",
  UPLOAD_IMAGE: "api/user/profileImage",
  NEW_PASSWORD: "api/user",
  OAUTH_LOGIN: "api/user/oauth",
};
