import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { postLogin } from "@/api/login/login.requests";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: { type: "text" },
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if(email && password) {
          const {body, status} = await postLogin({ email, password });
          if(status === 200) {
            const user = body as { token: string; userId: number };
            const newUser = { id: user.userId, token: user.token };
            return newUser;
          } else {
            throw new Error(JSON.stringify(body));
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id as number
        };
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, user: { id: token.user.id }, token: token.accessToken };
    },
  },
};
