import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { connectDB } from './config/db.js';
import { errorMiddleware } from './middleware/ErrorMiddleware.js';
import userRoute from './routers/UserRoute.js';
import movieRoute from './routers/MoviesRoute.js';
import categoryRoute from './routers/CategoryRoute.js';
import UploadRouter from './controllers/UploadFile.js';
import User from './models/UserModal.js';

dotenv.config();

const app = express();

// MIDDLAEWARE
app.use(cors());
app.use(express.json());
//google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/users/auth/google/callback',
            // http://localhost:5000/api/users/auth/google/callback  đường link đăng kí trong Allowed redirect URIs trên google cloud
        },
        async function (accessToken, refreshToken, profile, cb) {
            //thêm user vào DB
            // console.log(profile);
            try {
                if (profile) {
                    const exitsUser = await User.findOne({ email: profile.emails[0].value });
                    if (!exitsUser) {
                        const user = await User.create({
                            fullName: profile.displayName,
                            email: profile.emails[0].value,
                            image: profile.photos[0].value,
                            googleId: profile.id,
                        });
                        console.log(user);
                    }
                }
            } catch (error) {
                console.log(error);
            }
            return cb(null, profile);
        }
    )
);
//facebook

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_APP_ID,
//             clientSecret: process.env.FACEBOOK_APP_SECRET,
//             callbackURL: '/api/users/auth/facebook/callback',
//             profileFields: ['id', 'displayName', 'photos', 'email'],
//             // https://developers.facebook.com/apps/3427845474147414/settings/basic/   đường link đăng kí
//         },
//         async function (accessToken, refreshToken, profile, cb) {
//             try {
//                 // console.log(profile);
//                 if (profile) {
//                     const exitsUser = await User.findOne({ email: profile.emails[0].value });
//                     if (!exitsUser) {
//                         const user = await User.create({
//                             fullName: profile.displayName,
//                             email: profile.emails[0].value,
//                             image: profile.photos[0].value,
//                             googleId: profile.id,
//                         });
                        
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//             return cb(null, profile);
//         }
//     )
// );

//  CONNECT DB
connectDB();
// OTHER ROUTE
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/upload', UploadRouter);

// MAIN ROUTE
app.use('/', (req, res) => res.send('API running...'));

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

// RUN APP
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
