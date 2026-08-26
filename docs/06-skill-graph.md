# LEARNOS X: Universal Skill Graph

## Graph Specification
- **Engine**: NetworkX DiGraph in Python backend.
- **Node Types**: Skill, Concept, Role, Resource, Project.
- **Edge Types**: `prerequisite_of`, `related_to`, `part_of`, `required_for`, `demonstrated_by`.
- **Topological Sorting**: Prevents recommending advanced concepts without foundation prerequisite mastery.
