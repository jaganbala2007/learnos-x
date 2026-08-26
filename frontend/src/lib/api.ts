const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Fetch to ${endpoint} failed, using local seed fallback data.`, err);
    return getFallbackData(endpoint) as unknown as T;
  }
}

function getFallbackData(endpoint: string): any {
  if (endpoint.includes("/twin")) {
    return {
      career_readiness_score: 42.0,
      skill_coverage_score: 51.0,
      verified_skills_count: 3,
      overall_retention_score: 61.0,
      uncertainty_index: 0.20,
      dna: {
        learning_velocity: 81.0,
        retention_score: 74.0,
        practical_learning: 92.0,
        conceptual_learning: 67.0,
        problem_solving: 86.0,
        preferred_format: "Project > Practice > Video > Text",
        optimal_session_minutes: 30,
        difficulty_tolerance: "Medium-High"
      },
      knowledge_states: [
        { skill_id: "digital_logic", skill_name: "Digital Logic", mastery_score: 88.0 },
        { skill_id: "c_programming", skill_name: "C Programming", mastery_score: 78.0 },
        { skill_id: "verilog_syntax", skill_name: "Verilog Syntax", mastery_score: 52.0 },
        { skill_id: "sysverilog_syntax", skill_name: "SystemVerilog Syntax", mastery_score: 21.0 },
        { skill_id: "sysverilog_interfaces", skill_name: "SystemVerilog Interfaces", mastery_score: 24.0 },
        { skill_id: "uvm_basics", skill_name: "UVM Architecture", mastery_score: 5.0 }
      ]
    };
  }

  if (endpoint.includes("/gaps")) {
    return {
      target_role: "RTL Verification Engineer",
      career_readiness_score: 42.0,
      gaps: [
        { skill_id: "sysverilog_interfaces", skill_name: "SystemVerilog Interfaces", current_mastery: 24.0, target_mastery: 85.0, gap: 61.0, priority: "HIGH" },
        { skill_id: "uvm_basics", skill_name: "UVM Architecture", current_mastery: 5.0, target_mastery: 85.0, gap: 80.0, priority: "HIGH" },
        { skill_id: "sysverilog_randomization", skill_name: "Constrained Randomization", current_mastery: 0.0, target_mastery: 80.0, gap: 80.0, priority: "HIGH" },
        { skill_id: "digital_logic", skill_name: "Digital Logic", current_mastery: 88.0, target_mastery: 80.0, gap: -8.0, priority: "LOW" }
      ]
    };
  }

  if (endpoint.includes("/skills/graph")) {
    return {
      nodes: [
        { id: "digital_logic", label: "Digital Logic", category: "Fundamentals", mastery: 88.0, status: "Mastered" },
        { id: "verilog_syntax", label: "Verilog Syntax", category: "RTL Design", mastery: 52.0, status: "Developing" },
        { id: "sysverilog_syntax", label: "SystemVerilog OOP", category: "Verification", mastery: 21.0, status: "Weak" },
        { id: "sysverilog_interfaces", label: "SystemVerilog Interfaces", category: "Verification", mastery: 24.0, status: "Weak" },
        { id: "uvm_basics", label: "UVM Architecture", category: "UVM", mastery: 5.0, status: "Missing" }
      ],
      edges: [
        { source: "digital_logic", target: "verilog_syntax", type: "prerequisite_of" },
        { source: "verilog_syntax", target: "sysverilog_syntax", type: "prerequisite_of" },
        { source: "sysverilog_syntax", target: "sysverilog_interfaces", type: "prerequisite_of" },
        { source: "sysverilog_interfaces", target: "uvm_basics", type: "prerequisite_of" }
      ]
    };
  }

  return {};
}
