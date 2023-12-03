import { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { postLogin } from '@/api/login/login.requests';
import { getErrorData } from '@/utils/getErrorData';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: { type: 'text' },
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (email && password) {
          try {
            const user = await postLogin({ email, password });
            const newUser = { id: user.userId, token: user.token };
            return newUser as User;
          } catch (err: any) {
            const error = getErrorData(err);
            throw new Error(JSON.stringify(error.body));
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id as number,
        };
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, user: { id: token.user.id } };
    },
  },
};
