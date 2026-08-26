from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.twin import LearnerDigitalTwin, KnowledgeState
from app.services.skill_graph import SkillGraphService

router = APIRouter(prefix="/skills", tags=["Universal Skill Graph"])

@router.get("/graph")
def get_visual_skill_graph(user_id: int = 1, db: Session = Depends(get_db)):
    """Exports interactive visual Universal Skill Graph JSON for frontend SVG/Canvas rendering."""
    twin = db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
    knowledge_map = {}
    if twin:
        states = db.query(KnowledgeState).filter(KnowledgeState.twin_id == twin.id).all()
        knowledge_map = {ks.skill_id: ks.mastery_score for ks in states}

    graph_service = SkillGraphService(db)
    return graph_service.export_graph_json(knowledge_map)
