from sqlalchemy import Column, Integer, String, Text, Float, JSON, DateTime
from datetime import datetime
from app.core.database import Base

class LearningPath(Base):
    __tablename__ = "learning_paths"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    title = Column(String, nullable=False) # e.g. "Fast Track", "Balanced Track"
    track_type = Column(String, default="Balanced Track")
    total_weeks = Column(Integer, default=12)
    weekly_hours = Column(Integer, default=8)
    career_readiness_projected = Column(Float, default=85.0)
    retention_projected = Column(Float, default=78.0)
    workload_risk_score = Column(Float, default=0.15)
    overall_score = Column(Float, default=8.8)
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

class Milestone(Base):
    __tablename__ = "milestones"
    
    id = Column(Integer, primary_key=True, index=True)
    path_id = Column(Integer, index=True, nullable=False)
    week_number = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    target_skill_id = Column(String, nullable=False)
    status = Column(String, default="pending") # pending, active, completed, adapted

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    milestone_id = Column(Integer, index=True, nullable=False)
    title = Column(String, nullable=False)
    task_type = Column(String, nullable=False) # resource, practice, assessment, project, review
    skill_id = Column(String, nullable=False)
    resource_url = Column(String, nullable=True)
    estimated_minutes = Column(Integer, default=30)
    is_completed = Column(Integer, default=0)

class Resource(Base):
    __tablename__ = "resources"
    
    id = Column(String, primary_key=True, index=True) # e.g. "res_sv_interfaces_01"
    title = Column(String, nullable=False)
    source_name = Column(String, nullable=False) # OpenDoc, IEEE, GitHub, Tutorial
    url = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    skill_id = Column(String, nullable=False, index=True)
    format = Column(String, default="Project") # Project, Video, Interactive, Text
    difficulty = Column(String, default="Intermediate")
    quality_score = Column(Float, default=0.92)

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    item_title = Column(String, nullable=False)
    item_type = Column(String, nullable=False)
    reason_text = Column(Text, nullable=False)
    confidence_score = Column(Float, default=0.88)
    expected_impact = Column(String, default="+12% Interface Mastery")
    status = Column(String, default="pending") # pending, accepted, rejected
