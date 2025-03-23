from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import numpy as np
import uvicorn

# Initialize the FastAPI application
app = FastAPI()

# Define the input data model using Pydantic
class TextPair(BaseModel):
    firstText: str
    secondText: str

# Load the pre-trained sentence-transformers model at startup
print("Loading the model...")
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define the POST endpoint to compute similarity
@app.post("/compute-embeddings")
def compute_similarity(text_pair: TextPair):
    # Encode the two texts into embeddings
    embedding1 = model.encode(text_pair.firstText)
    embedding2 = model.encode(text_pair.secondText)
    
    # Compute cosine similarity between the embeddings
    cosine_similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
    
    # Return the response in the specified format
    return {
        "firstText": text_pair.firstText,
        "secondText": text_pair.secondText,
        "firstEmbedding": embedding1.tolist(),  # Convert to list for cleaner JSON output
        "secondEmbedding": embedding2.tolist(),
        "score": float(cosine_similarity)  # Convert to float for cleaner JSON output
    }


@app.get("/")
async def root():
    return {"message": "Text Similarity API"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )