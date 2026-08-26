from sqlalchemy import Column, Integer, String, Text, Float, JSON
from app.core.database import Base

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(String, primary_key=True, index=True) # e.g. "sysverilog_interfaces"
    name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False)        # e.g. "RTL Verification", "Data Science"
    description = Column(Text, nullable=True)
    difficulty_level = Column(String, default="Intermediate")
    market_demand_score = Column(Float, default=0.85)

class SkillRelation(Base):
    __tablename__ = "skill_relations"
    
    id = Column(Integer, primary_key=True, index=True)
    source_skill_id = Column(String, nullable=False, index=True)
    target_skill_id = Column(String, nullable=False, index=True)
    relation_type = Column(String, nullable=False) # prerequisite_of, related_to, part_of, required_for, demonstrated_by
    weight = Column(Float, default=1.0)
