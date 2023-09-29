import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userName: { type: String, required: true },
        userImage: String,
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const MovieSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
            required: true,
        },
        titleImage: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: [
            {
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        language: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        video: {
            type: String,
        },
        rate: {
            type: Number,
            required: true,
            default: 0,
        },
        numberOfReview: {
            type: Number,
            required: true,
            default: 0,
        },
        review: [ReviewSchema],
        casts: [{ name: { type: String, required: true }, image: { type: String } }],
    },
    { timestamps: true }
);

const MovieModal = mongoose.model('Movie', MovieSchema);

export default MovieModal;
