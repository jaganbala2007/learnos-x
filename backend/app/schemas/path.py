from pydantic import BaseModel
from typing import List, Optional

class CandidatePathSimulation(BaseModel):
    id: str
    track_name: str # e.g. "Fast Track", "Balanced Track", "Deep Specialist Track"
    description: str
    estimated_weeks: int
    weekly_hours: int
    projected_career_readiness: float
    projected_retention: float
    skill_coverage: float
    workload_risk: float
    overall_score: float
    selection_reasoning: List[str]

class PathSimulationResponse(BaseModel):
    learner_id: int
    recommended_path_id: str
    paths: List[CandidatePathSimulation]

class TaskSchema(BaseModel):
    id: int
    title: str
    task_type: str # resource, practice, assessment, project, review
    skill_id: str
    resource_url: Optional[str] = None
    estimated_minutes: int
    is_completed: bool

class MilestoneSchema(BaseModel):
    id: int
    week_number: int
    title: str
    target_skill_id: str
    status: str
    tasks: List[TaskSchema]
