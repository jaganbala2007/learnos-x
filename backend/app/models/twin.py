from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class LearnerDigitalTwin(Base):
    __tablename__ = "learner_digital_twins"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    career_readiness_score = Column(Float, default=42.0)  # 0 to 100%
    skill_coverage_score = Column(Float, default=51.0)
    verified_skills_count = Column(Integer, default=3)
    overall_retention_score = Column(Float, default=61.0)
    uncertainty_index = Column(Float, default=0.25)
    last_updated = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="twin")
    knowledge_states = relationship("KnowledgeState", back_populates="twin")
    dna = relationship("LearningDNA", back_populates="twin", uselist=False)

class KnowledgeState(Base):
    __tablename__ = "knowledge_states"
    
    id = Column(Integer, primary_key=True, index=True)
    twin_id = Column(Integer, ForeignKey("learner_digital_twins.id"), nullable=False)
    skill_id = Column(String, index=True, nullable=False)
    skill_name = Column(String, nullable=False)
    mastery_score = Column(Float, default=0.0)  # 0-100
    confidence = Column(Float, default=0.5)     # 0-1.0
    conceptual_score = Column(Float, default=0.0)
    practical_score = Column(Float, default=0.0)
    evidence_count = Column(Integer, default=0)
    last_assessed = Column(DateTime, default=datetime.utcnow)
    
    twin = relationship("LearnerDigitalTwin", back_populates="knowledge_states")

class LearningDNA(Base):
    __tablename__ = "learning_dna"
    
    id = Column(Integer, primary_key=True, index=True)
    twin_id = Column(Integer, ForeignKey("learner_digital_twins.id"), nullable=False)
    learning_velocity = Column(Float, default=81.0)       # % score
    retention_score = Column(Float, default=74.0)          # % score
    practical_learning = Column(Float, default=92.0)     # % score
    conceptual_learning = Column(Float, default=67.0)    # % score
    problem_solving = Column(Float, default=86.0)         # % score
    preferred_format = Column(String, default="Project > Practice > Video > Text")
    optimal_session_minutes = Column(Integer, default=30)
    difficulty_tolerance = Column(String, default="Medium-High")
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    twin = relationship("LearnerDigitalTwin", back_populates="dna")
