import { JWT as DefaultJWT } from "next-auth/jwt";
import { SessionUser } from "./User";

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends SessionUser {
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    username?: string;
    displayName?: string;
    role?: string;
    avatar?: string | null;
    emailVerified?: boolean;
    lastActiveAt?: Date;
    bio?: string | null;
    skills?: string[];
    badges?: string[];
  }
}
