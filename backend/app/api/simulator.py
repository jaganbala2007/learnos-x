from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.database import get_db
from app.services.path_simulator import FuturePathSimulator
from app.services.path_optimizer import PathOptimizer
from app.schemas.path import PathSimulationResponse

router = APIRouter(prefix="/path", tags=["Future Path Simulator & Optimizer"])

class PathOptimizeRequest(BaseModel):
    user_id: int = 1
    selected_track: str = "Balanced Track"

@router.get("/simulate", response_model=PathSimulationResponse)
def simulate_future_paths(user_id: int = 1, target_role: str = "rtl_verification_engineer", db: Session = Depends(get_db)):
    """FLAGSHIP FEATURE: Simulates and compares multiple candidate future learning paths."""
    simulator = FuturePathSimulator(db)
    return simulator.simulate_paths(user_id, target_role)

@router.post("/optimize")
def optimize_roadmap(req: PathOptimizeRequest, db: Session = Depends(get_db)):
    """Converts skill gap vector and topological prerequisites into an optimized weekly roadmap."""
    optimizer = PathOptimizer(db)
    path = optimizer.generate_roadmap(req.user_id, req.selected_track)
    return {
        "status": "success",
        "message": f"Successfully initialized {path.title}",
        "path_id": path.id,
        "total_weeks": path.total_weeks,
        "weekly_hours": path.weekly_hours
    }
