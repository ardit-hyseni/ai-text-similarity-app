import axios from 'axios';
import { TextCompareRepository } from '../repositories/text-comparison.repository';
import { IComparison } from '../models/text-comparison.model';

export type CalculationResponse = {
    firstText: string,
    secondText: string,
    scores: [
        {
            embeddingType: string,
            score: number
        }
    ],
    createdAt: string
}

export class TextCompareService {
    private repo: TextCompareRepository;

    constructor() {
        this.repo = new TextCompareRepository();
    }

    async compareTexts(
        text1: string,
        text2: string,
    ): Promise<number> {
        // Send embedding type to Python API
        const response: IComparison = await axios.post('http://python-backend/compute-embeddings', {
            text1,
            text2
        });

        const aiServiceResponse = response.data;

        // Save with embedding type
        await this.repo.saveComparison(text1, text2, embeddingType, score);

        return score;
    }
}
