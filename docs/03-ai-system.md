# LEARNOS X: AI & Machine Learning Architecture

## Dual Architecture Strategy
- **Primary**: Structured LLM reasoning via Pydantic output schemas.
- **Deterministic Rule Engine**: High-speed, 100% reliable fallback engines executing gap scoring, path optimization, misconception mapping, and memory scheduling without external network dependence.

## Models & Metrics
- **Skill Gap Vector Priority**:
  $$\text{Priority}(s) = (\text{TargetMastery} - \text{CurrentMastery}) \times \text{MarketDemand} \times \text{PrerequisiteWeight}$$
- **Future Trajectory Score**:
  $$\text{Score} = 0.30 \cdot \text{Readiness} + 0.20 \cdot \text{Coverage} + 0.15 \cdot \text{Retention} + 0.15 \cdot \text{LearnerFit} + 0.10 \cdot \text{MarketAlign} - 0.10 \cdot \text{WorkloadRisk}$$
- **Verified Skill Confidence**:
  $$\text{Confidence} = 0.25 \cdot \text{Quiz} + 0.35 \cdot \text{Project} + 0.25 \cdot \text{Interview} + 0.15 \cdot \text{Practical}$$
