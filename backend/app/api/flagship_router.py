"""
API Router for Flagship Features (JD Mapper, Dual-Agent Critic, What-If Simulator, Goal Profiler)
"""

from fastapi import APIRouter, Body
from typing import Dict, Any
from app.services.flagship_features_engine import (
    parse_job_description_and_build_path,
    simulate_what_if_scenario,
    parse_natural_language_goal
)

router = APIRouter(prefix="/flagship", tags=["Flagship AI Features"])

@router.post("/job/parse-and-map")
def parse_job_description(jd_text: str = Body(..., embed=True)):
    res = parse_job_description_and_build_path(jd_text)
    return res

@router.post("/simulator/what-if")
def run_what_if_simulation(
    query_type: str = Body("skip_skill"),
    skill_to_skip: str = Body("sysverilog_interfaces"),
    hours_per_week: float = Body(10.0),
    new_target_role: str = Body("rtl_verification")
):
    res = simulate_what_if_scenario(query_type, skill_to_skip, hours_per_week, new_target_role)
    return res

@router.post("/goal/parse-natural-language")
def parse_goal_prompt(prompt: str = Body(..., embed=True)):
    res = parse_natural_language_goal(prompt)
    return res
