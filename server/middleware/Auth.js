import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/UserModal.js';
import asyncHandler from 'express-async-handler';

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

export const protect = asyncHandler(async (req, res, next) => {
    //1 nhận được token và kiểm tra xem nó có tồn tại không
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('You are not logged in ! Please login to get access');
    }
    //2 xác thực token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3 kiểm tra nếu người dùng vẫn tồn tại : ( TH: user login vào 1 tài khoản đã bị xóa )
    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
        res.status(401);
        throw new Error('The user belonging to this token dose no longer exist ');
    }

    // qua hết được kiểm tra  => cấp quyền truy cập vào route
    req.user = currentUser;
    next();
});

export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        return next()
    }else {
        res.status(401)
        throw new Error('You are not admin! ')
    }
}

/// protect route

// export const protect = async (req, res, next) => {
//     //1 nhận được token và kiểm tra xem nó có tồn tại không
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         res.status(401);
//         throw new Error('You are not logged in ! Please login to get access');
//     }
//     //2 xác thực validate token
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     //3 kiểm tra nếu người dùng vẫn tồn tại : ( TH: user login vào 1 tài khoản đã bị xóa )
//     const currentUser = await User.findById(decoded.id);
//     if (!currentUser) {
//         res.status(401);
//         throw new Error('The user belonging to this token dose no longer exist ');
//     }

//     //4 kiểm tra nếu người dùng thay đổi mật khẩu sau khi token được cấp
//     if (currentUser.changePasswordAfter(decoded.iat)) {
//         res.status(401);
//         throw new Error('User recently changed password. Please login again! ');
//     }
//     //5 qua kết được kiểm tra  => cấp quyền truy cập vào route
//     req.user = currentUser;
//     next();
// };

// export const restrictTo = (...roles) => {
//     return (req, res, next) => {
//         //roles ['admin'] role='user'

//         if (!roles.includes(req.user.role)) {
//             res.status(403);
//             throw new Error('You do not have permision to perform this action ');
//         }

//         next()
//     };
// };
