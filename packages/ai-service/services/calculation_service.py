import numpy as np
from datetime import datetime
from typing import Dict, List
# import fasttext
from sentence_transformers import SentenceTransformer
import tensorflow_hub as hub
from .embedding_types import EmbeddingType

# Load models once during startup
fasttext_model = fasttext.load_model('cc.en.300.bin')
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
use_model = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

class CalculationService:
    @staticmethod
    def get_use_embedding(text: str) -> np.ndarray:
        return np.array(use_model([text])[0])

    @staticmethod
    def get_fasttext_embedding(text: str) -> np.ndarray:
        return np.array(fasttext_model.get_sentence_vector(text))

    @staticmethod
    def get_sentence_transformers_embedding(text: str) -> np.ndarray:
        return sentence_model.encode(text)

    @classmethod
    def calculate_similarity(cls, text1: str, text2: str) -> List[Dict]:
        results = []
        
        # # FastText similarity
        # emb1 = cls.get_fasttext_embedding(text1)
        # emb2 = cls.get_fasttext_embedding(text2)
        # results.append({
        #     "embeddingType": EmbeddingType.FASTTEXT,
        #     "score": float(cosine_similarity(emb1, emb2))
        # })

        # USE similarity
        emb1 = cls.get_use_embedding(text1)
        emb2 = cls.get_use_embedding(text2)
        results.append({
            "embeddingType": EmbeddingType.USE,
            "score": float(cosine_similarity(emb1, emb2))
        })

        # Sentence Transformers similarity
        emb1 = cls.get_sentence_transformers_embedding(text1)
        emb2 = cls.get_sentence_transformers_embedding(text2)
        results.append({
            "embeddingType": EmbeddingType.SENTENCE_TRANSFORMERS,
            "score": float(cosine_similarity(emb1, emb2))
        })

        return results