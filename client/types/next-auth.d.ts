import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    };
  }

  interface User {
    id: number;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
    }
    accessToken: string;
  }
}
