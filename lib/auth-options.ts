import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

import { findAdminUserByEmail, getEnvValue, isRecoverableDbError } from "@/lib/db-store";

const fallbackEmail = getEnvValue("ADMIN_EMAIL", "");
const fallbackPassword = getEnvValue("ADMIN_PASSWORD", "");

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_and_builds_1234567890",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (process.env.DATABASE_URL) {
          try {
            const user = await findAdminUserByEmail(credentials.email);

            if (user && compareSync(credentials.password, user.passwordHash)) {
              return {
                id: user.id,
                email: user.email,
                role: user.role,
                name: "MAVEN Forge Admin"
              };
            }
          } catch (error) {
            if (!isRecoverableDbError(error)) {
              throw error;
            }

            console.warn(
              `[maven-forge] Falling back to env admin auth: ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        }

        const currentFallbackEmail = getEnvValue("ADMIN_EMAIL", "");
        const currentFallbackPassword = getEnvValue("ADMIN_PASSWORD", "");

        if (
          credentials.email === currentFallbackEmail &&
          credentials.password === currentFallbackPassword
        ) {
          return {
            id: "internal-admin",
            email: currentFallbackEmail,
            role: "admin",
            name: "MAVEN Forge Admin"
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }

      return session;
    }
  }
};
