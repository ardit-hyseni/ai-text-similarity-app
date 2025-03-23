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

    // New method to fetch comparison history
    async getComparisonHistory(): Promise<IComparison[]> {
        return ComparisonModel.find().sort({ timestamp: -1 }); // Sort by latest first
    }
}