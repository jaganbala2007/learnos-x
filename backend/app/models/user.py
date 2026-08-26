from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    profile = relationship("LearnerProfile", back_populates="user", uselist=False)
    twin = relationship("LearnerDigitalTwin", back_populates="user", uselist=False)

class LearnerProfile(Base):
    __tablename__ = "learner_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    full_name = Column(String, nullable=False)
    current_role = Column(String, default="Student")
    education = Column(String, default="3rd-year ECE")
    experience_years = Column(Float, default=0.0)
    available_hours_per_week = Column(Integer, default=8)
    preferred_learning_format = Column(String, default="Project-based")
    target_career = Column(String, default="RTL Verification Engineer")
    target_company = Column(String, default="NVIDIA")
    interests = Column(JSON, default=list)
    raw_onboarding_text = Column(Text, nullable=True)
    
    user = relationship("User", back_populates="profile")
