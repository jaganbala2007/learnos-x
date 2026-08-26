import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["project"] == "LEARNOS X"

def test_learner_digital_twin_endpoint():
    response = client.get("/api/twin?user_id=1")
    assert response.status_code == 200
    data = response.json()
    assert "career_readiness_score" in data
    assert "dna" in data
    assert len(data["knowledge_states"]) > 0

def test_skill_graph_endpoint():
    response = client.get("/api/skills/graph?user_id=1")
    assert response.status_code == 200
    data = response.json()
    assert len(data["nodes"]) > 0
    assert len(data["edges"]) > 0

def test_skill_gap_vector_endpoint():
    response = client.get("/api/gaps?user_id=1&target_role=rtl_verification_engineer")
    assert response.status_code == 200
    data = response.json()
    assert "career_readiness_score" in data
    assert len(data["gaps"]) > 0

def test_future_path_simulator():
    response = client.get("/api/path/simulate?user_id=1")
    assert response.status_code == 200
    data = response.json()
    assert len(data["paths"]) == 3
    assert data["recommended_path_id"] == "path_balanced_track"

def test_closed_loop_misconception_diagnosis():
    response = client.post("/api/assessment/answer", json={
        "user_id": 1,
        "question_id": "q_sv_interface_01",
        "selected_option_index": 0, # Incorrect option
        "response_time_seconds": 12.0
    })
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is False
    assert data["diagnosed_misconception"] is not None
    assert data["roadmap_adapted"] is True

def test_wow_demo_closed_loop_sequence():
    response = client.post("/api/demo/run-closed-loop")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert len(data["demo_sequence"]) == 6
