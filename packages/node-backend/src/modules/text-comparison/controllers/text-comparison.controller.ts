import { Request, Response } from "express";
import { TextCompareService } from '../services/text-comparison.service';

export class TextCompareController {
    private service: TextCompareService;

    constructor() {
        this.service = new TextCompareService();
    }

    // New method to handle GET request for comparison history
    async getComparisonHistory(req: Request, res: Response) {
        try {
            const history = await this.service.getComparisonHistory();
            res.json(history);
        } catch (error) {
            console.error('Error fetching comparison history:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async postCompare(req: Request, res: Response) {
        try {
            const { firstText, secondText } = req.body;

            if (!firstText || !secondText) {
                return res.status(400).json({ error: 'Both text fields are required' });
            }

            const response = await this.service.compareTexts(firstText, secondText);
            res.json(response);

        } catch (error) {
            console.error('Comparison error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteComparisonHistory(req: Request, res: Response) {
        try {
            await this.service.deleteComparisonHistory();
            res.json({ message: 'Comparison history deleted successfully' });
        } catch (error) {
            console.error('Error deleting comparison history:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}