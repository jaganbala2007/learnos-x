from fastapi import APIRouter
from app.services.tinyml.schemas import LearnerFeatureVector, TinyMLPredictionResult
from app.services.tinyml.inference import run_tinyml_inference

router = APIRouter(prefix="/copilot/tinyml", tags=["TinyML Intelligence"])

@router.post("/predict", response_model=TinyMLPredictionResult)
def predict_tinyml_signal(features: LearnerFeatureVector):
    """
    Fast, lightweight CPU-friendly TinyML prediction endpoint for learner state
    and next-action prioritization.
    """
    return run_tinyml_inference(features)
