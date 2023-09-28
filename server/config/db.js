import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Database');
        return connect;
    } catch (error) {
        console.log(`Error : ${error.message}`);
    }
};
