import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { SessionUser } from "@/types/User";
import {
  authenticateUser,
  createOrUpdateSocialUser,
} from "@/supabase/rpc/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<SessionUser | null> {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const result = await authenticateUser({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (result?.success && result.user) {
            return {
              id: result.user.id || "",
              email: result.user.email || "",
              username: result.user.username || "",
              displayName: result.user.displayName || result.user.username,
              role: result.user.role || "guest",
              avatar: result.user.avatar || null,
              emailVerified: Boolean(result.user.emailVerified),
              lastActiveAt: result.user.lastActiveAt || new Date(),
              bio: result.user.bio || null,
              skills: result.user.skills || [],
              badges: result.user.badges || [],
            };
          }
          return null;
        } catch (error) {

          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ].filter(Boolean),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        try {
          const result = await createOrUpdateSocialUser({
            email: user.email!,
            name: user.name || (profile?.name as string) || user.email!,
            image: user.image || (profile?.image as string),
          });

          if (result?.success && result.user) {
            const sessionUser = user as SessionUser;
            sessionUser.id = result.user.id;
            sessionUser.email = result.user.email;
            sessionUser.username = result.user.username;
            sessionUser.displayName =
              result.user.displayName || result.user.username;
            sessionUser.role = result.user.role || "guest";
            sessionUser.avatar = result.user.avatar;
            sessionUser.emailVerified = Boolean(result.user.emailVerified);
            sessionUser.lastActiveAt = result.user.lastActiveAt || new Date();
            sessionUser.bio = result.user.bio || null;
            sessionUser.skills = result.user.skills || [];
            sessionUser.badges = result.user.badges || [];
          } else {

            return false;
          }
        } catch (error) {

          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const sessionUser = user as SessionUser;
        token.id = sessionUser.id || "";
        token.email = sessionUser.email || "";
        token.username = sessionUser.username || "";
        token.displayName = sessionUser.displayName || "";
        token.role = sessionUser.role || "guest";
        token.avatar = sessionUser.avatar || null;
        token.emailVerified = Boolean(sessionUser.emailVerified) || false;
        token.lastActiveAt = sessionUser.lastActiveAt || new Date();
        token.bio = sessionUser.bio || null;
        token.skills = sessionUser.skills || [];
        token.badges = sessionUser.badges || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id || "",
          email: token.email || "",
          username: token.username || "",
          displayName: token.displayName || token.username || "",
          role: token.role || "guest",
          avatar: token.avatar || null,
          emailVerified: Boolean(token.emailVerified) || false,
          lastActiveAt: token.lastActiveAt || new Date(),
          bio: token.bio || null,
          skills: token.skills || [],
          badges: token.badges || [],
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication?mode=signin",
    error: "/api/auth/error",
  },
};
