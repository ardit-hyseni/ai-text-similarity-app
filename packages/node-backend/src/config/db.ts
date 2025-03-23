import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions;

// Connect to MongoDB
export const connectDB = async (): Promise<void> => {
    try {
        console.log(`Mongo DB uri from env: ${process.env.NODE_MONGO_URI}`);
        console.log(`python service ${process.env.PYTHON_SERVICE_LOCALHOST_URL}`)
        await mongoose.connect(process.env.NODE_MONGO_URI!, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Close the MongoDB connection when the Node process is terminated
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
}); 