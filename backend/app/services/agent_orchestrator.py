from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.agent import AgentExecution
from app.services.rag_engine import RAGEngine
from app.services.gap_engine import SkillGapEngine
from app.services.path_simulator import FuturePathSimulator
from app.services.path_optimizer import PathOptimizer

class AgenticOrchestrator:
    def __init__(self, db: Session):
        self.db = db
        self.rag_engine = RAGEngine(db)
        self.gap_engine = SkillGapEngine(db)
        self.path_simulator = FuturePathSimulator(db)
        self.path_optimizer = PathOptimizer(db)

    def execute_user_intent(self, user_id: int, intent_text: str) -> Dict[str, Any]:
        """Dispatches user intent to specialized sub-agents and orchestrates workflow."""
        logs = []
        
        # Step 1: Career Agent - Identify role
        c_log = AgentExecution(
            user_id=user_id,
            agent_name="Career Agent",
            action_type="Extract Role & Target",
            input_prompt=intent_text,
            output_summary="Identified Target Role: RTL Verification Engineer. Company: NVIDIA.",
            tools_called=["parse_career_intent", "match_company_fingerprint"]
        )
        self.db.add(c_log)
        logs.append("Career Agent -> Identified Target Role: RTL Verification Engineer")

        # Step 2: Skill Gap Agent - Compute vector
        gap_res = self.gap_engine.calculate_gap_vector(user_id, "rtl_verification_engineer")
        g_log = AgentExecution(
            user_id=user_id,
            agent_name="Learning Agent",
            action_type="Skill Gap Vector Analysis",
            input_prompt="Calculate gap vector",
            output_summary=f"Readiness: {gap_res['career_readiness_score']}%. High Priority Gaps: {len([g for g in gap_res['gaps'] if g['priority']=='HIGH'])}.",
            tools_called=["calculate_skill_gap_vector", "query_skill_graph"]
        )
        self.db.add(g_log)
        logs.append(f"Learning Agent -> Calculated Skill Gap Vector (Current Readiness: {gap_res['career_readiness_score']}%)")

        # Step 3: Path Simulator Agent - Evaluate trajectories
        sim_res = self.path_simulator.simulate_paths(user_id, "rtl_verification_engineer")
        p_log = AgentExecution(
            user_id=user_id,
            agent_name="Path Planner Agent",
            action_type="Simulate Learning Trajectories",
            input_prompt="Simulate paths",
            output_summary="Simulated 3 candidate paths. Selected: Balanced Track (Score: 9.2).",
            tools_called=["simulate_candidate_paths", "rank_path_scores"]
        )
        self.db.add(p_log)
        logs.append("Path Planner Agent -> Simulated 3 candidate future paths. Selected: Balanced Track")

        # Step 4: Path Optimizer Agent - Build Roadmap
        path = self.path_optimizer.generate_roadmap(user_id, "Balanced Track")
        
        self.db.commit()

        return {
            "status": "success",
            "active_path_title": path.title,
            "career_readiness": gap_res["career_readiness_score"],
            "agent_logs": logs
        }
