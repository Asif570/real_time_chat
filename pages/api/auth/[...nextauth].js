import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "../../../src/models/User";

const hundler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  database: process.env.MONGODB_URI,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", label: "email" },
        password: { type: "password", label: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isCoreectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCoreectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
});
export default hundler;
