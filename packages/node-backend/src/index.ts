import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { TextCompareController } from './modules/text-comparison/controllers/text-comparison.controller'; // Import the controller
import { connectDB } from './config/db';

// For env File 
dotenv.config();

// Connect to MongoDB
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));


const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

// Instantiate the TextCompareController
const textCompareController = new TextCompareController();

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// Use the postCompare method as the handler for the /compare route
app.post('/compare', (req: Request, res: Response) => {
    textCompareController.postCompare(req, res);
});

// GET endpoint for comparison history
app.get('/comparison-history', (req: Request, res: Response) => textCompareController.getComparisonHistory(req, res));

app.delete('/comparison-history', (req: Request, res: Response) => textCompareController.deleteComparisonHistory(req, res));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});