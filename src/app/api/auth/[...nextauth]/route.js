import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {}, 
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.avatar?.url || "",
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await dbConnect();
          
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const baseUsername = user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
            const uniqueUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;

            existingUser = await User.create({
              name: user.name,
              email: user.email,
              username: uniqueUsername,
              avatar: { url: user.image, publicId: "" },
              provider: "GOOGLE",
            });
          }

          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.username = existingUser.username;
          return true;
        } catch (error) {
          console.error("Error saving google user:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };