import { model, Schema, Document } from 'mongoose';

export enum EmbeddingType {
    FASTTEXT = 'fasttext',
    OPENAI = 'openai',
    SENTENCE_TRANSFORMERS = 'sentence-transformers'
}

interface IEmbeddingScore {
    embeddingType: EmbeddingType;
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
                required: true,
                enum: Object.values(EmbeddingType),
            },
            score: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

export const ComparisonModel = model<IComparison>('text_comparison', comparisonSchema);
