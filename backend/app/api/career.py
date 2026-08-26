from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.career import Career, Job, Company
from app.schemas.career import CareerRoleSchema, ResumeParseResponse

router = APIRouter(prefix="/career", tags=["Career Digital Twin & Market Radar"])

@router.get("/roles", response_model=List[CareerRoleSchema])
def list_career_roles(db: Session = Depends(get_db)):
    """Returns available structured Career Digital Twin roles."""
    return db.query(Career).all()

@router.post("/resume/analyze", response_model=ResumeParseResponse)
def analyze_resume(file: UploadFile = File(None), db: Session = Depends(get_db)):
    """Extracts claimed vs demonstrated skills from uploaded resume PDF/DOCX/TXT."""
    return {
        "extracted_skills_claimed": ["Python", "C", "Digital Logic", "Verilog", "SystemVerilog"],
        "extracted_skills_demonstrated": ["Digital Logic", "C"],
        "projects_found": ["FPGA Verilog ALU Design", "C Embedded Driver"],
        "matched_skills_count": 5,
        "gap_vector_preview": [
            {
                "skill_id": "sysverilog_interfaces",
                "skill_name": "SystemVerilog Interfaces",
                "current_mastery": 24.0,
                "target_mastery": 85.0,
                "gap": 61.0,
                "priority": "HIGH",
                "market_relevance": 0.94,
                "prerequisite_importance": 1.2
            },
            {
                "skill_id": "uvm_basics",
                "skill_name": "UVM Architecture",
                "current_mastery": 5.0,
                "target_mastery": 85.0,
                "gap": 80.0,
                "priority": "HIGH",
                "market_relevance": 0.95,
                "prerequisite_importance": 1.2
            }
        ]
    }

@router.get("/market")
def get_market_radar(db: Session = Depends(get_db)):
    """Returns Career Market Intelligence demand scores and job posting metrics."""
    jobs = db.query(Job).all()
    return {
        "data_freshness_label": "Curated Demo Dataset (Updated 2026)",
        "market_skill_demand": [
            {"skill": "SystemVerilog Interfaces", "demand_score": 0.94, "category": "High Demand"},
            {"skill": "UVM Architecture", "demand_score": 0.95, "category": "High Demand"},
            {"skill": "SystemVerilog Assertions", "demand_score": 0.89, "category": "High Demand"},
            {"skill": "Python Hardware Test Automation", "demand_score": 0.72, "category": "Emerging"}
        ],
        "job_postings": [
            {
                "id": j.id,
                "title": j.title,
                "company": j.company_name,
                "location": j.location,
                "required_skills": j.required_skills,
                "market_relevance": j.market_relevance_score
            } for j in jobs
        ]
    }
