from sqlalchemy.orm import Session
from app.core.database import Base, engine, SessionLocal
from app.models import (
    User, LearnerProfile, LearnerDigitalTwin, KnowledgeState, LearningDNA,
    Skill, SkillRelation, Career, CareerRequirement, Job, Question, Resource
)
from app.seed.seed_data import CAREERS, SKILLS, SKILL_RELATIONS, CAREER_REQUIREMENTS, QUESTIONS, RESOURCES, JOBS

def seed_database():
    """Initializes tables and populates realistic seed data."""
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(Career).first():
            print("Database already seeded.")
            return
            
        print("Seeding database with LEARNOS X domain data...")
        
        # 1. Careers
        for c in CAREERS:
            db.add(Career(**c))
            
        # 2. Skills
        for s in SKILLS:
            db.add(Skill(**s))
            
        # 3. Skill Relations
        for sr in SKILL_RELATIONS:
            db.add(SkillRelation(**sr))
            
        # 4. Career Requirements
        for cr in CAREER_REQUIREMENTS:
            db.add(CareerRequirement(**cr))
            
        # 5. Questions
        for q in QUESTIONS:
            db.add(Question(**q))
            
        # 6. Resources
        for r in RESOURCES:
            db.add(Resource(**r))
            
        # 7. Jobs
        for j in JOBS:
            db.add(Job(**j))
            
        db.commit()
        
        # 8. Create Default Hackathon Demo Learner: "Alex"
        print("Creating default demo learner 'Alex'...")
        demo_user = User(
            id=1,
            username="alex_ece",
            email="alex@ece.edu",
            hashed_password="demo_password_hash"
        )
        db.add(demo_user)
        db.commit()
        
        demo_profile = LearnerProfile(
            user_id=demo_user.id,
            full_name="Alex Vance",
            current_role="Student",
            education="3rd-year ECE",
            experience_years=0.5,
            available_hours_per_week=8,
            preferred_learning_format="Project-based",
            target_career="RTL Verification Engineer",
            target_company="NVIDIA",
            interests=["RTL Design", "SystemVerilog", "UVM", "FPGA"],
            raw_onboarding_text="I am a third-year ECE student. I know digital electronics and C. I want to become an RTL Verification Engineer. I can study 8 hours per week. I prefer projects over long videos."
        )
        db.add(demo_profile)
        
        demo_twin = LearnerDigitalTwin(
            user_id=demo_user.id,
            career_readiness_score=42.0,
            skill_coverage_score=51.0,
            verified_skills_count=3,
            overall_retention_score=61.0,
            uncertainty_index=0.20
        )
        db.add(demo_twin)
        db.commit()
        
        demo_dna = LearningDNA(
            twin_id=demo_twin.id,
            learning_velocity=81.0,
            retention_score=74.0,
            practical_learning=92.0,
            conceptual_learning=67.0,
            problem_solving=86.0,
            preferred_format="Project > Practice > Video > Text",
            optimal_session_minutes=30,
            difficulty_tolerance="Medium-High"
        )
        db.add(demo_dna)
        
        # Initial Knowledge States for Alex
        alex_skills = [
            ("digital_logic", "Digital Logic", 88.0, 0.90, 85.0, 90.0, 4),
            ("c_programming", "C Programming & Memory", 78.0, 0.85, 75.0, 80.0, 3),
            ("verilog_syntax", "Verilog Syntax & Data Types", 52.0, 0.65, 50.0, 55.0, 2),
            ("sysverilog_syntax", "SystemVerilog Syntax & OOP", 21.0, 0.35, 20.0, 22.0, 1),
            ("sysverilog_interfaces", "SystemVerilog Interfaces & Virtual Interfaces", 24.0, 0.30, 20.0, 28.0, 1),
            ("uvm_basics", "UVM Architecture & Components", 5.0, 0.10, 5.0, 5.0, 0)
        ]
        
        for skill_id, skill_name, mastery, conf, concept, prac, ev_cnt in alex_skills:
            ks = KnowledgeState(
                twin_id=demo_twin.id,
                skill_id=skill_id,
                skill_name=skill_name,
                mastery_score=mastery,
                confidence=conf,
                conceptual_score=concept,
                practical_score=prac,
                evidence_count=ev_cnt
            )
            db.add(ks)
            
        db.commit()
        print("Database successfully seeded with Alex demo profile!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
