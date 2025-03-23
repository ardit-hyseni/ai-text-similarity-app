import { model, Schema, Document } from 'mongoose';

export interface IComparison extends Document {
    firstText: string;
    secondText: string;
    embeddingModel: string;
    score: number;
    timestamp: Date;
}

const comparisonSchema = new Schema<IComparison>({
    firstText: { type: String, required: true },
    secondText: { type: String, required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const ComparisonModel = model<IComparison>('text_comparison', comparisonSchema);
