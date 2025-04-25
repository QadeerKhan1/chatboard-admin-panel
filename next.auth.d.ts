import nextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      picture: string;
      image: string;
      userName: string;
      token: string;
      isVerified: boolean;
      phone: string;
      isOnBoarded: boolean;
      isSubscribed: boolean;
      subscriptionId: string;
      subscriptionPlan: string;
      subscriptionEndDate: string;
      totalRecordings: number;
      demoModeCounter: number;
      name: string;
      role: string;
    };
  }
  interface;
}
