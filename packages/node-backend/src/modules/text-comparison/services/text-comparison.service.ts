import axios from 'axios';
import { TextCompareRepository } from '../repositories/text-comparison.repository';
import { IComparison } from '../models/text-comparison.model';

export class TextCompareService {
    private repo: TextCompareRepository;

    constructor() {
        this.repo = new TextCompareRepository();
    }

    // New method to get comparison history
    async getComparisonHistory(): Promise<IComparison[]> {
        return this.repo.getComparisonHistory();
    }

    async compareTexts(
        text1: string,
        text2: string,
    ): Promise<IComparison> {
        try {
            // Send embedding type to Python API
            const response: IComparison = await axios.post(`${process.env.PYTHON_SERVICE_LOCALHOST_URL}/compute-embeddings`, {
                firstText: text1,
                secondText: text2
            });

            const { firstText, secondText, embeddingModel, score, timestamp } = response;
            // Save with embedding type
            await this.repo.saveComparison(firstText, secondText, embeddingModel, score, timestamp);

            return response;
        } catch (error) {
            console.error("Error comparing texts:", error);
            throw error;
        }
    }

}
