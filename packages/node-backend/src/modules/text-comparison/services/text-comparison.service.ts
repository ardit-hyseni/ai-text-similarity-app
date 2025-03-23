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
            console.log('asdqwdwqd')
            console.log('asdqwdwqd')
            console.log('asdqwdwqd')
            console.log('asdqwdwqd')
            console.log('asdqwdwqd')
            // Send embedding type to Python API
            const { data }: { data: IComparison } = await axios.post(`${process.env.PYTHON_SERVICE_LOCALHOST_URL}/compute-embeddings`, {
                firstText: text1,
                secondText: text2
            });
            console.log(data);
            /*
            {
                "firstText": "The weather is lovely today.",
                "secondText": "It's so sunny outside",
                "score": 0.665,
                "timestamp": "2025-03-23T18:41:16.731078"
            }
*/
            const { firstText, secondText, embeddingModel, score, timestamp } = data;
            // Save with embedding type
            await this.repo.saveComparison(firstText, secondText, embeddingModel, score, timestamp);

            return data;
        } catch (error) {
            console.error("Error comparing texts:", error);
            throw error;
        }
    }

    async deleteComparisonHistory(): Promise<void> {
        await this.repo.deleteComparisonHistory();
    }

}
