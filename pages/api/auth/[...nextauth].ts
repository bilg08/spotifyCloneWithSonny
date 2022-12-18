import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi,{ LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      //spotifyToken
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error:any) {
    return {
      ...token,
      error:'refreshTokenError'
    }
  }
}


export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId:'49bd11bbfc6e4192a43d3d847ff18db5',
      clientSecret: '10c5dfa0f95c428f8789e875b7440d7e',
      authorization:LOGIN_URL
    }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn:'/login'
    },
    callbacks: {
      async jwt({ token, account, user }: any) {
        if (account && user) {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 100,
          }
        }
        if (Date.now() < token.accessTokenExpires) {
          return token
        }
      return await refreshAccessToken(token)
      },
      async session({ session, token }: any) {
        session.user.accessToken = token.accessToken;
        session.user.refresh_token = token.refreshToken;
        session.user.username = token.username;
        return session;
      }
    }
}
export default NextAuth(authOptions)