from fastapi import FastAPI, HTTPException
from datetime import datetime
from pydantic import BaseModel
from services.calculation_service import CalculationService
from services.embedding_types import EmbeddingType
import uvicorn

app = FastAPI()

class CompareRequest(BaseModel):
    firstText: str
    secondText: str

@app.post("/compute-embeddings")
async def compute_embeddings(request: CompareRequest):
    try:
        scores = CalculationService.calculate_similarity(request.firstText, request.secondText)
        return {
            "firstText": request.firstText,
            "secondText": request.secondText,
            "scores": scores,
            "createdAt": datetime.utcnow()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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