import axios from "axios";
import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [ 
  
  FortyTwoProvider({
      clientId: process.env.FORTY_TWO_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
    })
  ],
});