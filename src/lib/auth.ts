import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import axios from "axios";
import { errorHandling } from "@/services/errorHandling";

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials-based authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        token: { label: "Token", type: "text", placeholder: "Token" },
        token_type: {
          label: "Token Type",
          type: "text",
          placeholder: "Token Type",
        },
        TWO_FA: { type: "boolean" },
        user: { type: "object" },
        totp: { label: "TOTP", type: "text", placeholder: "TOTP" },
        recoveryKey: {
          label: "Recovery Key",
          type: "text",
          placeholder: "Recovery Key",
        },
      },
      async authorize(credentials) {
        try {
          console.log("credentials", credentials);
          let response = null;
          // If user is provided as JSON string, parse it
          if (credentials?.user) {
            response = { data: JSON.parse(credentials.user) };
          } else if (credentials?.totp || credentials?.recoveryKey) {
            // 2FA flow
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/2fa_login`,
              {
                email: credentials?.email,
                totp: credentials?.totp,
                recoveryKey: credentials?.recoveryKey,
              }
            );
          } else {
            // Standard credentials login
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/login`,
              {
                email: credentials?.email,
                password: credentials?.password,
                token: credentials?.token || "null",
                token_type: credentials?.token_type || "null",
                invitations_token: "null",
              }
            );
          }

          // Ensure valid response data
          console.log("credentials", response);
          if (!response.data || !response.data.result) return null;
          response = { data: response.data.result };

          return {
            user_registered: response.data.user_registered,
            id: response.data.user_id,
            user_id: response.data.user_id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_name: response.data.user_name,
            token: response.data.token,
            email: response.data.email,
            tenant_id: response.data.tenant_id,
            profile_picture: response.data.profile_picture,
            role_id: response.data.role_id,
            workspace_id: response.data.workspace_id,
            team_workspace_id: response.data.team_workspace_id,
            first_login: response.data.first_login,
            expiration_time: response.data.expiration_time,
            is_2fa_enable: response.data.is_2fa_enable,
          };
        } catch (error) {
          console.log("error", error);
          throw new Error(errorHandling(error));
        }
      },
    }),

    // Google SSO Provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),

    // GitHub SSO Provider
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || "",
    }),

    // Azure AD SSO Provider
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    // signIn callback: called after SSO login completes successfully
    async signIn({ user, account }) {
      // For SSO providers, make an API call to your backend to create or update the user record.
      if (
        account?.provider === "google" ||
        account?.provider === "github" ||
        account?.provider === "azure-ad"
      ) {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/oauth`,
            {
              email: user.email,
              name: user.name,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              // Include additional fields if needed
            }
          );
        } catch (error) {
          console.error("Error calling backend API for SSO:", error);
          // Optionally reject sign-in if backend call fails
          return false;
        }
      }
      return true;
    },
    // JWT callback: merges user info into token
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, user);
      }
      return token;
    },
    // Session callback: exposes user info in session
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
