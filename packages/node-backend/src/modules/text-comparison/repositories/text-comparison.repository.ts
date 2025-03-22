import { ComparisonModel, EmbeddingType, IComparison } from "../models/text-comparison.model";

export class TextCompareRepository {
    async saveComparison(
        text1: string,
        text2: string,
        embeddingType: EmbeddingType,
        score: number
    ): Promise<IComparison> {
        return ComparisonModel.create({ text1, text2, embeddingType, score });
    }
}