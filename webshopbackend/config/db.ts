import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
};

mongoose.set('debug', true);

export default db;