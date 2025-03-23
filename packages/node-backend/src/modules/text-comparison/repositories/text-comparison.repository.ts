import { ComparisonModel, EmbeddingType, IComparison } from "../models/text-comparison.model";

export class TextCompareRepository {
    async saveComparison(
        firstText: string,
        secondText: string,
        embeddingType: EmbeddingType,
        score: number
    ): Promise<IComparison> {
        return ComparisonModel.create({ firstText, secondText, embeddingType, score });
    }
}