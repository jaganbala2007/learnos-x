# LEARNOS X: RAG Knowledge Engine

## Pipeline Architecture
1. **Query Parsing**: Extract key topic and skill context.
2. **Vector / Keyword Retrieval**: Match relevant resources, LRM standards, and labs.
3. **Skill Graph Context Enrichment**: Attach upstream prerequisites and downstream competencies.
4. **Prompt Grounding**: Inject context into LLM prompt with strict source citation constraints.
5. **Grounded Output**: Return answer with explicit source citations.
