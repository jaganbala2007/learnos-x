"""
New Features Engine for LEARNOS X
Contains logic for:
1. Learning Resource Recommendations
2. Multi-Goal Learning
3. AI-Generated Projects
4. Learner Feedback Adaptations
5. Time-Based Learning Planner
6. Job Market Skill Trends & Salaries
7. Peer Percentile Benchmarks
8. Gamification & Achievements
"""

from typing import Dict, List, Any

# 1. Learning Resource Recommendations Database
RESOURCE_DATABASE = {
    "sysverilog_interfaces": [
        {
            "id": "res_sv_01",
            "title": "SystemVerilog Interfaces & Virtual Interfaces Deep Dive",
            "type": "Documentation",
            "url": "https://chipverify.com/systemverilog/systemverilog-interface",
            "duration": "15 min read",
            "difficulty": "Intermediate",
            "rating": 4.9
        },
        {
            "id": "res_sv_02",
            "title": "UVM Driver-to-Interface Binding Lab",
            "type": "Interactive Lab",
            "url": "https://edaplayground.com/x/interface_lab",
            "duration": "30 min lab",
            "difficulty": "Advanced",
            "rating": 4.8
        }
    ],
    "uvm_components": [
        {
            "id": "res_uvm_01",
            "title": "Universal Verification Methodology (UVM) 1.2 User Guide",
            "type": "Official Spec",
            "url": "https://accellera.org/downloads/standards/uvm",
            "duration": "45 min read",
            "difficulty": "Advanced",
            "rating": 5.0
        }
    ]
}

# 2. Multi-Goal Learning Manager
ROLES_DATABASE = {
    "rtl_verification": {"name": "RTL Verification Engineer", "base_skills": ["sysverilog_oop", "sysverilog_interfaces", "uvm_components", "assertions_sva"]},
    "fpga_engineer": {"name": "FPGA Design & Emulation Engineer", "base_skills": ["verilog_rtl", "sysverilog_oop", "timing_closure", "vivado_tcl"]},
    "ai_chip_architect": {"name": "AI Hardware Accelerator Architect", "base_skills": ["verilog_rtl", "systolic_arrays", "quantization_hw", "c_model_golden"]}
}

# 3. Job Market Skill Trends Database
MARKET_TRENDS = [
    {"skill": "SystemVerilog & UVM", "growth": "+34%", "avg_salary": "$175,000", "demand_level": "VERY HIGH", "top_employers": ["NVIDIA", "Apple", "AMD"]},
    {"skill": "Formal Verification (SVA)", "growth": "+42%", "avg_salary": "$190,000", "demand_level": "CRITICAL", "top_employers": ["Qualcomm", "Intel", "Amazon Annapurna"]},
    {"skill": "C++/SystemC Modeling", "growth": "+21%", "avg_salary": "$165,000", "demand_level": "HIGH", "top_employers": ["Google TPU", "Meta Silicon", "Tesla Dojo"]}
]

# 4. Peer Percentile Benchmark Engine
def compute_peer_benchmark(skill_id: str, mastery: float) -> Dict[str, Any]:
    percentile = min(99, max(5, int(mastery * 1.15)))
    return {
        "skill_id": skill_id,
        "learner_mastery": mastery,
        "peer_average_mastery": 52.0,
        "percentile_rank": f"Top {100 - percentile}%",
        "cohort": "Candidates with 0-2 Years Experience",
        "insight": f"Your score of {mastery}% places you above {percentile}% of peer verification candidates."
    }

# 5. Time-Based Learning Hours Planner
def recalculate_timeline(hours_per_week: float, total_remaining_hours: float = 40.0) -> Dict[str, Any]:
    weeks_needed = max(1.0, round(total_remaining_hours / max(1.0, hours_per_week), 1))
    return {
        "hours_per_week": hours_per_week,
        "weeks_to_readiness": weeks_needed,
        "projected_completion_date": f"{int(weeks_needed)} Weeks from today",
        "learning_pace_status": "FAST TRACK" if hours_per_week >= 15 else "BALANCED" if hours_per_week >= 8 else "STEADY"
    }

# 6. AI-Generated Project Brief Generator
def generate_personalized_project(weak_skills: List[str]) -> Dict[str, Any]:
    primary_skill = weak_skills[0] if weak_skills else "SystemVerilog Interfaces"
    return {
        "project_id": f"proj_gen_{primary_skill.lower()}",
        "title": f"Custom Verification IP: {primary_skill.replace('_', ' ').title()} Testbench",
        "objective": f"Design a complete UVM-compliant testbench targeting {primary_skill} with virtual interface binding.",
        "deliverables": [
            "1. SystemVerilog Interface definition with modports and clocking blocks",
            "2. Driver class extending uvm_driver with nonblocking item_done protocol",
            "3. Scoreboard comparing DUT transactions against C++ golden reference model"
        ],
        "estimated_duration": "4 Hours",
        "difficulty": "Advanced",
        "xp_reward": 500
    }

# 7. Gamification & Achievement Manager
GAMIFICATION_STATE = {
    "user_id": 1,
    "xp": 2450,
    "level": 7,
    "level_title": "Verification Specialist",
    "streak_days": 12,
    "badges": [
        {"id": "b_first_test", "name": "First Diagnosis Completed", "icon": "🎯", "unlocked": True},
        {"id": "b_remediation_hero", "name": "Closed-Loop Hero", "icon": "⚡", "unlocked": True},
        {"id": "b_streak_10", "name": "10-Day Streak Master", "icon": "🔥", "unlocked": True},
        {"id": "b_uvm_master", "name": "UVM Architecture Guru", "icon": "🏆", "unlocked": False}
    ]
}
