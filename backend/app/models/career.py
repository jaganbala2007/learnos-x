from sqlalchemy import Column, Integer, String, Text, Float, JSON
from app.core.database import Base

class Career(Base):
    __tablename__ = "careers"
    
    id = Column(String, primary_key=True, index=True) # e.g. "rtl_verification_engineer"
    title = Column(String, nullable=False, index=True)
    industry = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    avg_salary_range = Column(String, default="$110k - $165k")
    market_demand_index = Column(Float, default=0.89)

class CareerRequirement(Base):
    __tablename__ = "career_requirements"
    
    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(String, nullable=False, index=True)
    skill_id = Column(String, nullable=False, index=True)
    required_proficiency = Column(Float, default=80.0) # 0-100%
    is_core_prerequisite = Column(Integer, default=1)

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(String, primary_key=True, index=True) # e.g. "nvidia"
    name = Column(String, nullable=False)
    interview_focus = Column(Text, nullable=True)
    skill_fingerprint = Column(JSON, default=dict) # e.g. {"systemverilog": 90, "uvm": 85}

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    location = Column(String, default="Remote / USA")
    required_skills = Column(JSON, default=list)
    market_relevance_score = Column(Float, default=0.9)
    data_source = Column(String, default="Curated Market Dataset (2026)")
