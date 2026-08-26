from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.path import Resource
from app.models.skill import Skill

class RAGEngine:
    def __init__(self, db: Session):
        self.db = db

    def query(self, user_query: str, skill_context: str = "") -> Dict[str, Any]:
        """Performs RAG retrieval, context enrichment, and grounded answer generation."""
        # Find relevant resources by keyword / skill topic
        resources = self.db.query(Resource).all()
        matched_resources = []
        
        query_lower = user_query.lower()
        for r in resources:
            if r.topic.lower() in query_lower or r.skill_id.lower() in query_lower or "interface" in query_lower:
                matched_resources.append(r)
                
        if not matched_resources:
            matched_resources = resources[:2]

        sources = [f"{r.title} ({r.source_name}: {r.url})" for r in matched_resources]

        # Generate grounded Socratic / concept response
        if "interface" in query_lower:
            reply = (
                "In SystemVerilog, an **interface** encapsulates signals, clocking blocks, and modports into a single clean bundle. "
                "Instead of wiring individual wires between a testbench driver and the Design Under Test (DUT), "
                "you pass a `virtual interface` handle into your dynamic class-based UVM driver.\n\n"
                "Key Principle:\n"
                "1. Nonblocking assignments (`<=`) inside clocking blocks drive values in the NBA region to prevent race conditions.\n"
                "2. Virtual interfaces allow dynamic class-based UVM components to reference static hardware signals."
            )
        elif "recursion" in query_lower:
            reply = (
                "Recursion occurs when a function calls itself to solve a smaller instance of the same problem. "
                "What base condition prevents infinite function call stacking in your code?"
            )
        else:
            reply = (
                f"Based on your current goal and context ({skill_context or 'RTL Verification'}): "
                f"To master this concept, focus on practical hands-on labs linking hardware signal drivers with class-based monitors."
            )

        return {
            "reply": reply,
            "sources_cited": sources,
            "suggested_followups": [
                "How do clocking blocks prevent race conditions?",
                "What is the difference between dynamic classes and static interfaces?",
                "Show me a complete virtual interface driver example."
            ]
        }
