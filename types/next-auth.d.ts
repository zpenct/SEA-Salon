import { Session, DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; role?: string };
  }
  interface User extends DefaultUser {
    role?: string;
  }

  interface JWT {
    user?: DefaultUser & { id: string; role?: string };
  }
}
