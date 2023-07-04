import { dbUsers } from "@/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      // @ts-ignore
      async authorize(credentials, request) {
        console.log(credentials);
        // TODO: validar contra la base de datos
        return dbUsers.checkUserEmailPassword(
          credentials?.email!,
          credentials?.password!
        );
      },
    }),
  ],

  // Custom login pages
  // esto es para decirle q no queremos usar la pagina que viene por default
  // del next auth
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecado
  },

  session: {
    maxAge: 2592000, //30 dias
    strategy: 'jwt',
    updateAge: 86400, // cada dia
  },

  callbacks: {
    // @ts-ignore
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(user?.email!, user?.name!);
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token, user }) {
      session.accessToken = token.access_token;
      session.user = token.user as any;
      return session;
    },
  },
};
// @ts-ignore
export default NextAuth(authOptions);
