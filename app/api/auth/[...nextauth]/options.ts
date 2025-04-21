import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // ✅ GitHub
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email || `${profile.login}@github.com`
                }
            }
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                await connectToDatabase();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) {
                        throw new Error('Incorrect password');
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    }
                } catch (error: any) {
                    throw new Error(error);
                }


            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Connect to DB
            await connectToDatabase();

            // If user signs in via GitHub/Google (OAuth), check if they exist
            if (account && profile) {
                const existingUser = await User.findOne({ email: profile.email });

                if (!existingUser) {
                    const newUser = new User({
                        name: profile.name,
                        email: profile.email,
                        password: null, // password not needed for OAuth users
                    });
                    await newUser.save();
                }
            }

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },

    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;