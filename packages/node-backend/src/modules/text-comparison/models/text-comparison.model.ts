import { model, Schema, Document } from 'mongoose';

interface IEmbeddingScore {
    embeddingType: string;
    score: number;
}

export interface IComparison extends Document {
    firstText: string;
    secondText: string;
    scores: IEmbeddingScore[];
    createdAt: Date;
}

const comparisonSchema = new Schema<IComparison>({
    firstText: { type: String, required: true },
    secondText: { type: String, required: true },
    scores: [
        {
            embeddingType: {
                type: String,
                required: true
            },
            score: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

export const ComparisonModel = model<IComparison>('text_comparison', comparisonSchema);
