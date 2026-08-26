from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from app.core.database import Base

class AgentExecution(Base):
    __tablename__ = "agent_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    agent_name = Column(String, nullable=False) # Career, PathPlanner, Tutor, etc.
    action_type = Column(String, nullable=False)
    input_prompt = Column(Text, nullable=True)
    output_summary = Column(Text, nullable=True)
    tools_called = Column(JSON, default=list)
    execution_time_ms = Column(Integer, default=120)
    created_at = Column(DateTime, default=datetime.utcnow)
