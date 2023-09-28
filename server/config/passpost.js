import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config();


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'api/users/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, cb) {
            //thêm user vào DB
            console.log(profile);

            if(profile?.id) {
                
            }

            return cb(err, profile);
        }
    )
);
