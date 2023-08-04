import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: { type: "text", placeholder: "Имя" },
        email: { type: "email", placeholder: "Логин", required: true },
        password: { placeholder: "Пароль", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        const res = await fetch("http://localhost:3001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const user: { token: string; userId: number } = await res.json();
        const newUser = { id: String(user.userId), token: user.token };
        if (newUser) return newUser;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.token;
        token.id = String(user.id);
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, user: { id: token.id }, token: token.accessToken };
    },
  },
};
