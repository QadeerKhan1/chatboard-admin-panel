import { AxiosInstance } from "@/lib/axios-instance";
import { EndPoints } from "@/lib/end-points";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await AxiosInstance.post(EndPoints.LOGIN, {
            email,
            password,
        });
        console.log(response, 'response');
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Login failed");
    }
};

export const getUserData = async (userId: string) =>
    AxiosInstance.get(`${EndPoints.GET_USER}/${userId}`);

export const deleteUser = async () =>
    AxiosInstance.delete(EndPoints.USER_DELETE);


export const requestOTP = async (email: string) => {
    try {
        const response = await AxiosInstance.post(EndPoints.REQUEST_OTP, { email });
        console.log(response, 'response');

        return response;

    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Failed to send OTP");
    }
};

export const verifyEmail = async (email: string, otp: string) => {
    try {
        const response = await AxiosInstance.post(EndPoints.VERIFY_EMAIL, {
            email,
            otp,
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Email verification failed");
    }
};

export const verifyOTP = async (email: string, otp: string) => {
    try {
        const response = await AxiosInstance.post(EndPoints.VERIFY_OTP, {
            email,
            otp,
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "OTP verification failed");
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await AxiosInstance.post(EndPoints.FORGOT_PASSWORD, {
            email,
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Reset password failed");
    }
};

export const resendVerificationOtp = async (email: string) => {
    try {
        const response = await AxiosInstance.post(
            EndPoints.RESEND_VERIFICATION_OTP,
            {
                email,
            }
        );
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Reset password failed");
    }
};

export const resetPassword = async (
    email: string,
    password: string,
) => {
    try {
        const response = await AxiosInstance.patch(EndPoints.FORGOT_PASSWORD, {
            email,
            password,
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage || "Password reset failed");
    }
};

export const newPassword = async (
    userId: string,
    ...rest: [key: string, value: string | boolean][]
) => {
    const restObject = Object.fromEntries(rest); // Convert rest into an object
    return await AxiosInstance.put(`${EndPoints.NEW_PASSWORD}/${userId}`, {
        ...restObject, // Spread the rest object into the request body
    });
};




