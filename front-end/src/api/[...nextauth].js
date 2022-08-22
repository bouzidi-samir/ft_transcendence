import axios from "axios";
import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.usual_full_name,
          email: profile.email,
          picture: profile.image_url,
          username: profile.login,
          isFt: true
        }
      }
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.isFt) {
      }
      return user 
    },
        
    async redirect({ url, baseUrl }) {
      return baseUrl; 
    },
    async session({ session, user, token }) {
      if (token != undefined){
        await axios.post("http://api.intra.42.fr/oauth/" + token, {
          id: token.user.id,
        })
        .then(response => {
          session.user = response.data.response;
          session.toto = "toto"
        })
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user != undefined){
        token.user = user;
      }
      return token
    },
}
});