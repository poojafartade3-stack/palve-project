from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.mongo import client, db
from app.routers import user

app = FastAPI(title="LMS Backend")

# 🔥 CORS CONFIG (THIS FIXES OPTIONS 405)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],   # allows OPTIONS, POST, GET, etc.
    allow_headers=["*"],
)

app.include_router(user.router)

@app.on_event("startup")
async def startup_db():
    await client.admin.command("ping")
    print("MongoDB Atlas connected")

@app.on_event("shutdown")
async def shutdown_db():
    client.close()

@app.get("/")
async def home():
    return {"message": "FastAPI + MongoDB Atlas running"}
