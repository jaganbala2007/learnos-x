import networkx as nx
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.skill import Skill, SkillRelation

class SkillGraphService:
    def __init__(self, db: Session):
        self.db = db
        self.graph = nx.DiGraph()
        self._build_graph()

    def _build_graph(self):
        """Constructs in-memory NetworkX directed graph from DB relations."""
        skills = self.db.query(Skill).all()
        for s in skills:
            self.graph.add_node(s.id, name=s.name, category=s.category, difficulty=s.difficulty_level)
            
        relations = self.db.query(SkillRelation).all()
        for r in relations:
            self.graph.add_edge(r.source_skill_id, r.target_skill_id, type=r.relation_type, weight=r.weight)

    def get_prerequisites(self, skill_id: str) -> List[str]:
        """Returns direct prerequisite skill IDs for a target skill."""
        if not self.graph.has_node(skill_id):
            return []
        preds = []
        for pred in self.graph.predecessors(skill_id):
            edge_data = self.graph.get_edge_data(pred, skill_id)
            if edge_data and edge_data.get("type") == "prerequisite_of":
                preds.append(pred)
        return preds

    def get_all_ancestor_prerequisites(self, skill_id: str) -> List[str]:
        """Recursively fetches all upstream prerequisite skills in topological order."""
        if not self.graph.has_node(skill_id):
            return []
        ancestors = nx.ancestors(self.graph, skill_id)
        # Sort in topological order so foundational prerequisites come first
        subgraph = self.graph.subgraph(ancestors)
        try:
            return list(nx.topological_sort(subgraph))
        except nx.NetworkXUnfeasible:
            return list(ancestors)

    def export_graph_json(self, learner_knowledge: Dict[str, float]) -> Dict[str, Any]:
        """Exports graph nodes and edges with learner mastery status for UI visualization."""
        nodes = []
        for node_id, data in self.graph.nodes(data=True):
            mastery = learner_knowledge.get(node_id, 0.0)
            if mastery >= 80.0:
                status = "Mastered"
            elif mastery >= 40.0:
                status = "Developing"
            elif mastery > 0.0:
                status = "Weak"
            else:
                status = "Missing"
                
            nodes.append({
                "id": node_id,
                "label": data.get("name", node_id),
                "category": data.get("category", "General"),
                "mastery": mastery,
                "status": status
            })
            
        edges = []
        for source, target, data in self.graph.edges(data=True):
            edges.append({
                "source": source,
                "target": target,
                "type": data.get("type", "related_to")
            })
            
        return {"nodes": nodes, "edges": edges}
