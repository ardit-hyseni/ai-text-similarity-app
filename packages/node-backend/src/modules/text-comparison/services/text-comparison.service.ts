import axios from 'axios';
import { TextCompareRepository } from '../repositories/text-comparison.repository';
import { IComparison } from '../models/text-comparison.model';

export class TextCompareService {
    private repo: TextCompareRepository;

    constructor() {
        this.repo = new TextCompareRepository();
    }

    async compareTexts(
        firstText: string,
        secondText: string,
    ): Promise<number> {
        // Send embedding type to Python API
        const response: IComparison = await axios.post('http://python-backend/compute-embeddings', {
            firstText,
            secondText
        });

        const aiServiceResponse = response;

        // Save with embedding type
        await this.repo.saveComparison(firstText, secondText, embeddingType, score);

        return score;
    }
}
