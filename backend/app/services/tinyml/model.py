from .schemas import LearnerFeatureVector, TinyMLPredictionResult

class TinyMLLearnerClassifier:
    """
    Lightweight, fast CPU-friendly feature classification model for learner state
    and next-action prioritization. Executes in <2ms.
    """

    def predict(self, features: LearnerFeatureVector) -> TinyMLPredictionResult:
        # Weighted Priority Calculation
        mastery_w = features.skill_mastery_avg * 0.35
        readiness_w = features.target_readiness * 0.30
        quiz_w = features.recent_quiz_score * 0.20
        gap_penalty = min(features.practice_gap_days * 3.0, 25.0)
        misconception_penalty = features.misconception_count * 10.0

        raw_score = (mastery_w + readiness_w + quiz_w) - (gap_penalty + misconception_penalty)
        priority_score = max(5.0, min(98.0, raw_score))

        # Learner State Decision Rules
        if features.target_readiness >= 85.0 and features.misconception_count == 0:
            state = "JOB_READY"
            action = "Submit Verified Portfolio to Recruiters"
            top_risk = None
        elif features.misconception_count >= 3 or features.recent_quiz_score < 50.0:
            state = "BLOCKED"
            action = "Resolve Prerequisite Misconceptions in Socratic Tutor"
            top_risk = "Multiple Unresolved Misconceptions"
        elif features.practice_gap_days > 5.0 or features.misconception_count >= 2:
            state = "AT_RISK"
            action = "Resume Practice Lab to Prevent Skill Decay"
            top_risk = "Inactivity & Retention Decay Risk"
        elif features.learning_velocity_wpm >= 120.0 and features.skill_mastery_avg >= 60.0:
            state = "IMPROVING"
            action = "Master UVM Architecture & Scoreboards"
            top_risk = None
        else:
            state = "STABLE"
            action = "Continue Current Skill Module Roadmap"
            top_risk = None

        # Model Confidence Score Estimation
        confidence = 0.94 if features.practice_gap_days <= 3.0 else 0.82

        return TinyMLPredictionResult(
            learner_state=state,
            priority_score=round(priority_score, 1),
            confidence=confidence,
            recommended_action=action,
            top_risk_factor=top_risk,
            fallback_active=False
        )
