from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.memory_engine import MemoryEngine

router = APIRouter(prefix="/memory", tags=["Personalized Memory Engine"])

@router.get("/reviews")
def get_retention_reviews(user_id: int = 1, db: Session = Depends(get_db)):
    """Returns adaptive spaced-repetition retention review schedules."""
    engine = MemoryEngine(db)
    return engine.get_due_reviews(user_id)
