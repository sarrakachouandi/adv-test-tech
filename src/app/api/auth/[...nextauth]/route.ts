import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from '../../db'; 
import User from '../../models/User'; 

// Connect to the database
connectDB();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        console.error('Profile is undefined'); 
        return false; 
      }

      console.log('Profile:', profile);

      
      let existingUser = await User.findOne({ googleId: profile.sub });

      if (!existingUser) {
       
        existingUser = new User({
          email: profile.email,
          name: profile.name || profile.given_name || 'Unnamed',
          googleId: profile.sub,
          dateDeNaissance: null,  
          adresse: null,          
          telephone: null  
        });
        await existingUser.save(); 
      } else {
        existingUser.name = profile.name || profile.given_name || existingUser.name;
        existingUser.email = profile.email; 
        await existingUser.save();
      }

      return true; 
    },
    async session({ session }) {
      const existingUser = await User.findOne({ email: session.user.email });
      if (existingUser) {
        session.user.id = existingUser._id.toString(); 
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
