import bcrypt from 'bcryptjs';

import asyncHandle from 'express-async-handler';
import User from '../models/UserModal.js';
import { generateToken } from '../middleware/Auth.js';

//////////// PUBLIC
// REGISTER
export const register = asyncHandle(async (req, res, next) => {
    const { fullName, email, password, image } = req.body;

    try {
        //kiểm tra  email đã tồn tại
        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400);
            throw new Error('User already existed ! ');
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //tạo user trong DB
        const user = await User.create({ fullName, email, password: hashPassword, image });

        //nếu tạo thành công gửi user data và token lên client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// LOGIN
export const login = asyncHandle(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // kiểm tra  nếu user tồn tại and password đúng
        const user = await User.findOne({ email });
        // const correct = await bcrypt.compare(password, user.password);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password!');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// LOGIN WITH GOOGLE
export const loginGoogleSuccess = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(404);
            throw new Error('User not found!');
        }
        const user = await User.findOne({ googleId: id });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET ALL USER
export const getAllUser = asyncHandle(async (req, res, next) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

////////////PRIVATE : USER
// UPDATE :PUT api/users
export const updateProfile = asyncHandle(async (req, res, next) => {
    const { fullName, email, image } = req.body;

    try {
        //tìm user trong DB
        const user = await User.findById(req.user._id);
        // nếu tồn tại sẽ update và lưu xuống DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.image = image || user.image;
            user.email = email || user.email;

            const updateUser = await user.save();
            // gửi data update và token lên client
            res.status(200).json({
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE : DELETE api/users
export const deleteProfile = asyncHandle(async (req, res, next) => {
    try {
        //tìm user trong DB
        const user = await User.findById(req.user._id);
        if (user) {
            //nếu user là admin thì ném ra lỗi
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            // nếu không thì delete
            await User.findByIdAndDelete(req.user._id);
            res.status(200).json('Deleted!');
        }
        //nếu không có user
        res.status(404);
        throw new Error('User not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// CHANGE PASSWORD: PUT api/users/password
export const changePassword = asyncHandle(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    //tìm user trong DB
    const user = await User.findById(req.user._id);
    const correctOldPassword = await bcrypt.compare(oldPassword, user.password);

    try {
        //nếu tồn tại user và password cũ chính xác
        if (user && correctOldPassword) {
            //hash password mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed' });
        } else {
            res.status(401);
            throw new Error('Invalid old password');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET LIKED MOVIE: GET api/users/favorite
export const getLikedMovies = asyncHandle(async (req, res, next) => {
    try {
        // tìm user trong DB
        const user = await User.findById(req.user._id).populate('likedMovies');
        // nếu tồn tại user sẽ gửi liekMovie về client
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // res.status(200).json(user);
        res.status(200).json(user.likedMovies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ADD MOVIE TO LIKE MOVIE : POST api/users/favorite
export const addMovieToLike = asyncHandle(async (req, res, next) => {
    const { movieId } = req.body;
    try {
        // tìm user trong DB
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // kiểm tra xem movie đã được like chưa
        const isMovieLiked = user.likedMovies.includes(movieId);
        if (isMovieLiked) {
            res.status(400);
            throw new Error('Movie already liked!');
        }

        // nếu chưa like thì thêm vào likedMovies và lưu vào DB
        user.likedMovies.push(movieId);
        await user.save();
        res.status(200).json(user.likedMovies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE ALL LIKE MOVIE :DELETE api/users/favorite
export const deleteMovieLiked = asyncHandle(async (req, res, next) => {
    try {
        // tìm user trong DB
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        // nếu tồn tại xóa hết movie liked và lưu vào DB
        user.likedMovies = [];
        await user.save();
        res.status(200).json('All liked movie deleted!');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

///////////// PRIVATE ADMIN
// DELETE USER : DELETE api/users/delete/:id
export const deleteUser = asyncHandle(async (req, res, next) => {
    try {
        //tìm user trong DB
        const user = await User.findById(req.params.id);
        if (user) {
            //nếu user là admin thì ném ra lỗi
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            // nếu không thì delete
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User deleted!');
        }
        //nếu không có user
        res.status(404);
        throw new Error('User not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

