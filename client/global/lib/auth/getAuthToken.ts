'use server';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

const SESSION_TOKEN_KEY =
  process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token';

export const getAuthToken = async () => {
  const jwtToken = await decode({
    token: cookies().get(SESSION_TOKEN_KEY)?.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return jwtToken?.accessToken;
};
