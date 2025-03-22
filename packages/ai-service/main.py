from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

from fastapi import FastAPI
import uvicorn  # <-- Add this import

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

# Add this block to run with custom port
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",  # Allow external connections
        port=8000,       # Your desired port
        reload=True      # Optional: Enable auto-reload
    )