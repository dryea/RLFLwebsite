import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const { email, password } = credentials as {
        email: string;
        password: string;
      };

      // For development: check against env vars
      const adminEmail = process.env.ADMIN_EMAIL || "admin@rfil.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

      if (email === adminEmail && password === adminPassword) {
        return {
          id: "1",
          email,
          name: "Admin",
          role: "admin",
        };
      }

      // TODO: Phase 3 — verify against D1 users table via Workers API
      // const res = await fetch(`${API_URL}/api/cms/auth/login`, { ... });

      return null;
    },
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/cms/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
});
