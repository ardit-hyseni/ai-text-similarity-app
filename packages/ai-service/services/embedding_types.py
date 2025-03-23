from enum import Enum

class EmbeddingType(str, Enum):
    FASTTEXT = "FASTTEXT"
    USE = "USE"  # Changed from OPENAI
    SENTENCE_TRANSFORMERS = "SENTENCE_TRANSFORMERS"