import { ComparisonModel, IComparison } from "../models/text-comparison.model";

export class TextCompareRepository {
    async saveComparison(
        firstText: string,
        secondText: string,
        embeddingModel: string,
        score: number,
        timestamp: Date
    ): Promise<IComparison> {
        return ComparisonModel.create({ firstText, secondText, embeddingModel, score, timestamp });
    }
}