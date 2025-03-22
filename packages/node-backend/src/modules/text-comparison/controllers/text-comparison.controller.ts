import express, { Express, Request, Response } from "express";
import { TextCompareService } from '../services/text-comparison.service';

export class TextCompareController {
    private service: TextCompareService;

    constructor() {
        this.service = new TextCompareService();
    }

    async postCompare(req: Request, res: Response) {
        try {
            const { text1, text2 } = req.body;

            if (!text1 || !text2) {
                return res.status(400).json({ error: 'Both text fields are required' });
            }

            const score = await this.service.compareTexts(text1, text2);
            res.json({ similarity: score });

        } catch (error) {
            console.error('Comparison error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}