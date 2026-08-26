from pydantic import BaseModel
from typing import List, Optional

class SkillSchema(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str] = None
    difficulty_level: str
    market_demand_score: float

class SkillRelationSchema(BaseModel):
    source_skill_id: str
    target_skill_id: str
    relation_type: str
    weight: float

class SkillGraphNode(BaseModel):
    id: str
    label: str
    category: str
    mastery: float
    status: str # Mastered, Developing, Weak, Missing

class SkillGraphEdge(BaseModel):
    source: str
    target: str
    type: str

class SkillGraphExport(BaseModel):
    nodes: List[SkillGraphNode]
    edges: List[SkillGraphEdge]
