from app.services.tinyml.schemas import LearnerFeatureVector
from app.services.tinyml.inference import run_tinyml_inference

def test_tinyml_prediction_improving_state():
    features = LearnerFeatureVector(
        skill_mastery_avg=75.0,
        retention_rate=88.0,
        learning_velocity_wpm=135.0,
        recent_quiz_score=80.0,
        misconception_count=0,
        practice_gap_days=1.0,
        evidence_count=3,
        target_readiness=72.0
    )
    result = run_tinyml_inference(features)
    assert result.learner_state == "IMPROVING"
    assert result.confidence >= 0.80
    assert not result.fallback_active

def test_tinyml_prediction_blocked_state():
    features = LearnerFeatureVector(
        skill_mastery_avg=45.0,
        retention_rate=60.0,
        learning_velocity_wpm=90.0,
        recent_quiz_score=40.0,
        misconception_count=3,
        practice_gap_days=4.0,
        evidence_count=1,
        target_readiness=50.0
    )
    result = run_tinyml_inference(features)
    assert result.learner_state == "BLOCKED"
    assert result.top_risk_factor is not None

def test_tinyml_fallback_resilience():
    # Test fallback resilience when confidence is artificially low or invalid data
    features = LearnerFeatureVector(
        skill_mastery_avg=10.0,
        retention_rate=50.0,
        learning_velocity_wpm=40.0,
        recent_quiz_score=30.0,
        misconception_count=4,
        practice_gap_days=10.0,
        evidence_count=0,
        target_readiness=20.0
    )
    result = run_tinyml_inference(features)
    assert result.learner_state in ["BLOCKED", "AT_RISK", "STABLE"]
