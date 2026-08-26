from sqlalchemy import Column, Integer, String, Text, Float, JSON, DateTime
from datetime import datetime
from app.core.database import Base

class Evidence(Base):
    __tablename__ = "evidences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    skill_id = Column(String, index=True, nullable=False)
    evidence_type = Column(String, nullable=False) # quiz, project, interview, practical
    title = Column(String, nullable=False)
    score = Column(Float, nullable=False) # 0-100%
    evidence_link = Column(String, nullable=True)
    verified_at = Column(DateTime, default=datetime.utcnow)

class SkillPassport(Base):
    __tablename__ = "skill_passports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    skill_id = Column(String, nullable=False)
    skill_name = Column(String, nullable=False)
    mastery_percentage = Column(Float, nullable=False)
    verified_confidence = Column(Float, nullable=False)
    evidence_summary = Column(JSON, default=list) # ["Quiz: 87%", "Project: 91%"]
    status = Column(String, default="Verified") # Verified, Developing, Missing
    last_verified = Column(DateTime, default=datetime.utcnow)

class Portfolio(Base):
    __tablename__ = "portfolios"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    title = Column(String, default="Autonomous Career Skill Portfolio")
    about_text = Column(Text, nullable=True)
    demonstrated_skills = Column(JSON, default=list)
    projects_showcase = Column(JSON, default=list)
    verified_evidence_count = Column(Integer, default=0)
    career_readiness_score = Column(Float, default=42.0)
    updated_at = Column(DateTime, default=datetime.utcnow)

class InterviewSession(Base):
    __tablename__ = "interview_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    mode = Column(String, default="technical") # technical, behavioral, project
    target_role = Column(String, default="RTL Verification Engineer")
    transcript = Column(JSON, default=list) # [{"role": "interviewer", "text": "..."}, ...]
    feedback_score = Column(Float, default=0.0)
    knowledge_gaps = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
