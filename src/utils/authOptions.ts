import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/store/auth-slice/auth-slice";
import { cookies } from "next/headers";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const response = await loginUser(email, password);

          console.log(response, "response");
          if (response?.error) {
            throw new Error(response?.error);
          }

          const user = {
            id: response?.data?._id,
            name: response?.data?.name,
            email: response?.data?.email,
            role: response?.data?.role,
            token: response?.data?.accessToken,
            isVerified: response?.data?.isVerified,
          };

          const tenYearsFromNow = new Date();
          tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

          if (user?.token) {
            cookies().set({
              name: "next-auth.accessToken",
              value: user.token,
              expires: tenYearsFromNow,
              path: "/",
            });
          }

          return user;
        } catch (error) {
          throw new Error(getErrorMessage(error));
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 365 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 10 * 365 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as Session["user"];
      const tokenInCookie = cookies().get("next-auth.accessToken");
      if (!tokenInCookie) {
        cookies().set("next-auth.accessToken", session.user?.token);
      }
      return session;
    },
  },
};

export default authOptions;
