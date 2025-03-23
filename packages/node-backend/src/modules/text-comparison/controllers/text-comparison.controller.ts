import express, { Express, Request, Response } from "express";
import { TextCompareService } from '../services/text-comparison.service';

export class TextCompareController {
    private service: TextCompareService;

    constructor() {
        this.service = new TextCompareService();
    }

    async postCompare(req: Request, res: Response) {
        try {
            const { firstText, secondText } = req.body;

            if (!firstText || !secondText) {
                return res.status(400).json({ error: 'Both text fields are required' });
            }

            const score = await this.service.compareTexts(firstText, secondText);
            res.json({ similarity: score });

        } catch (error) {
            console.error('Comparison error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}