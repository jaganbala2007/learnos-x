import logging
from .schemas import LearnerFeatureVector, TinyMLPredictionResult
from .model import TinyMLLearnerClassifier

logger = logging.getLogger("tinyml")
_classifier = TinyMLLearnerClassifier()

def run_tinyml_inference(features: LearnerFeatureVector) -> TinyMLPredictionResult:
    """
    Run fast TinyML inference with fail-safe fallback guarantees.
    """
    try:
        result = _classifier.predict(features)
        
        # Low confidence fallback check
        if result.confidence < 0.60:
            result.fallback_active = True
            result.recommended_action += " (Fallback Score)"
            
        return result
    except Exception as e:
        logger.warning(f"TinyML inference failed, engaging graceful fallback: {e}")
        return TinyMLPredictionResult(
            learner_state="STABLE",
            priority_score=70.0,
            confidence=0.50,
            recommended_action="Continue Current Skill Module Roadmap",
            top_risk_factor=None,
            fallback_active=True
        )
