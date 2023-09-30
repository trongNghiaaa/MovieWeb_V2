import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please add your full name !'],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Please add your email !'],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            // required: [true, 'Please add your password !'],
        },
        image: String,
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedMovies: [
            {
                type: Schema.ObjectId,
                ref: 'Movie',
            },
        ],
        googleId: {
            type: String,
        },
        facebookId: {
            type: String,
        },
    },
    { timestamps: true }
);

UserSchema.method.changePasswordAfter = function (JWTTimestamp) {
    //theo mặc định method này sẽ trả về false :có nghĩa là user chưa thay đổi password sau khi đượpc cấp token
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(this.changePasswordAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // nếu KHÔNG có nghĩa user chưa bao giờ thay đổi pass
    return false;
};

const User = mongoose.model('User', UserSchema);

export default User;
