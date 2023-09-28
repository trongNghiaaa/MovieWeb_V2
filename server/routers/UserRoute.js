import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import {
    addMovieToLike,
    changePassword,
    deleteMovieLiked,
    deleteProfile,
    deleteUser,
    getAllUser,
    getLikedMovies,
    login,
    loginGoogleSuccess,
    register,
    updateProfile,
} from '../controllers/UserController.js';
import { admin, protect } from '../middleware/Auth.js';
dotenv.config();

const router = express.Router();

// public
router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUser);

// private : user
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteProfile);
router.put('/password', protect, changePassword);
router.get('/favorite', protect, getLikedMovies);
router.post('/favorite', protect, addMovieToLike);
router.delete('/favorite', protect, deleteMovieLiked);

// private : admin
router.delete('/delete/:id', protect, admin, deleteUser);

// ===============================================================

// auth with google:
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
    '/auth/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        // res.redirect(`${process.env.CLIENT_URL}/user/profile`);
        res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}`);
    }
);

router.get('/login-success/:id', loginGoogleSuccess);

// auth with facebook
// router.get('/auth/facebook', passport.authenticate('facebook', {  session: false }));

// router.get(
//     '/auth/facebook/callback',
//     (req, res, next) => {
//         passport.authenticate('facebook', (err, profile) => {
//             req.user = profile;
//             next();
//         })(req, res, next);
//     },
//     (req, res) => {
//         // res.redirect(`${process.env.CLIENT_URL}/user/profile`);
//         res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}`);
//     }
// );

export default router;
