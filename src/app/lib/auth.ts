import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import { errorHandling } from "../Services/errorHandling";
// Define the User interface

interface User {
  user_registered: string;
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  token: string;
  email: string;
  tenant_id: string;
  profile_picture: string;
  role_id: string;
  workspace_id: string;
  team_workspace_id: string;
  first_login: any;
  expiration_time: any;
  // cover_picture: string;
  is_2fa_enable: any;
}

// Extend NextAuth's Session interface to include User properties
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

// Extend NextAuth's JWT interface to include User properties
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    token: string;
    email: string;
    tenant_id: string;
    profile_picture: string;
    role_id: string;
    workspace_id: string;
    team_workspace_id: string;
    first_login: any;
    expiration_time: any;
    // cover_picture: string;
    is_2fa_enable: any;
  }
}

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
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
        TWO_FA: {
          type: "boolean",
        },
        user: {
          type: "object",
        },
        totp: {
          label: "totp",
          type: "text",
          placeholder: "totp",
        },
        recoveryKey: {
          label: "recoveryKey",
          type: "text",
          placeholder: "recoveryKey",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          var response = null;
          if (credentials?.user) {
            response = { data: JSON.parse(credentials.user) };
          } else {
            if (credentials?.totp || credentials?.recoveryKey) {
              response = await axios.post(
                process.env.NEXT_PUBLIC_APP_BACKEND_URL + "/api/auth/2fa_login",
                {
                  email: credentials?.email,
                  totp: credentials?.totp,
                  recoveryKey: credentials?.recoveryKey,
                }
              );
            } else {
              response = await axios.post(
                process.env.NEXT_PUBLIC_APP_BACKEND_URL + "/api/auth/login",
                {
                  email: credentials?.email,
                  password: credentials?.password,
                  token: credentials?.token || "null",
                  token_type: credentials?.token_type || "null",
                  invitations_token: "null",
                }
              );
            }
          }

          if (!response.data && !response.data.result) return null;
          if (response.data.result) {
            response = { data: response.data.result };
          }
          // Check if response data is valid
          if (response.data) {
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
              // cover_picture: response.data.cover_picture,
              role_id: response.data.role_id,
              workspace_id: response.data.workspace_id,
              team_workspace_id: response.data.team_workspace_id,
              first_login: response.data.first_login,
              expiration_time: response.data.expiration_time,
              is_2fa_enable: response.data.is_2fa_enable,
            };
          }
          return null;
        } catch (error) {
          throw new Error(errorHandling(error));
          // console.error("Authorize error:", error);
          // return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
    AzureADProvider({
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "",
      clientSecret: process.env.AZURE_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_TENANT_ID || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Merge user object into token
        Object.assign(token, user);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Merge token properties into session user
        session.user = { ...session.user, ...token } as User;
      }
      return session;
    },
  },
};

// Create handler for NextAuth
