from sqlalchemy import Column, Integer, String, Text, Float, JSON, DateTime
from datetime import datetime
from app.core.database import Base

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(String, primary_key=True, index=True) # e.g. "q_sv_interface_01"
    skill_id = Column(String, nullable=False, index=True)
    question_text = Column(Text, nullable=False)
    options = Column(JSON, nullable=False) # list of option strings
    correct_option_index = Column(Integer, nullable=False)
    explanation = Column(Text, nullable=False)
    misconception_mappings = Column(JSON, default=dict) # {option_idx: "misconception_name"}
    difficulty = Column(Float, default=0.5)

class Attempt(Base):
    __tablename__ = "attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    question_id = Column(String, index=True, nullable=False)
    selected_option_index = Column(Integer, nullable=False)
    is_correct = Column(Integer, nullable=False)
    response_time_seconds = Column(Float, default=15.0)
    diagnosed_misconception = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Misconception(Base):
    __tablename__ = "misconceptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    skill_id = Column(String, nullable=False)
    misconception_title = Column(String, nullable=False)
    diagnosis_text = Column(Text, nullable=False)
    counter_example = Column(Text, nullable=False)
    remediation_task_id = Column(String, nullable=True)
    resolved = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class MemorySchedule(Base):
    __tablename__ = "memory_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    skill_id = Column(String, nullable=False)
    topic_title = Column(String, nullable=False)
    repetition_stage = Column(Integer, default=1)
    next_review_date = Column(DateTime, default=datetime.utcnow)
    retention_estimate = Column(Float, default=0.75)
