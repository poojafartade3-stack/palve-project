from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.db.mongo import db
from app.schemas.user import UserCreate
from app.core.security import hash_password 
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
async def create_user(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)  # ✅ works now
    user_dict.update({
        "is_active": True,
        "created_at": datetime.utcnow()
    })

    result = await db.users.insert_one(user_dict)

    return {
        "id": str(result.inserted_id),
        "message": "User created successfully"
    }

@router.get("/")
async def list_users():
    users = []
    async for u in db.users.find():
        u["_id"] = str(u["_id"])
        u.pop("password", None)  
        users.append(u)
    return users


@router.post("/login")
async def login_user(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not db_user.get("is_active", True):
        raise HTTPException(status_code=403, detail="User is inactive")

    return {
        "id": str(db_user["_id"]),
        "name": db_user["name"],
        "email": db_user["email"],
        "role": db_user["role"],
    }
