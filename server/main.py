from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from api.queen_detect import router as queen_router

app = FastAPI(title="Queen Bee Detection API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the API router
app.include_router(queen_router, prefix="/api/queen")

@app.get("/")
async def root():
    return {"message": "Queen Bee Detection API is running"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204) 
