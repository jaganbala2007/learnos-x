"""
LEARNOS X - Master Seed Dataset
"""

CAREERS = [
    {
        "id": "rtl_verification_engineer",
        "title": "RTL Verification Engineer",
        "industry": "Semiconductors & Hardware",
        "description": "Engineers who design and build robust testbenches in SystemVerilog/UVM to verify complex digital IC designs.",
        "avg_salary_range": "$125,000 - $185,000",
        "market_demand_index": 0.93
    },
    {
        "id": "rtl_design_engineer",
        "title": "RTL Design Engineer",
        "industry": "Semiconductors & Hardware",
        "description": "Architects modern silicon ICs using Verilog and VHDL for GPUs, CPUs, and specialized AI accelerators.",
        "avg_salary_range": "$130,000 - $190,000",
        "market_demand_index": 0.91
    },
    {
        "id": "software_engineer",
        "title": "Software Engineer",
        "industry": "Technology",
        "description": "Develops distributed scalable backend services, REST APIs, and microservices.",
        "avg_salary_range": "$115,000 - $175,000",
        "market_demand_index": 0.88
    },
    {
        "id": "data_scientist",
        "title": "Data Scientist",
        "industry": "Analytics & AI",
        "description": "Analyzes complex dataset signals, builds statistical predictive models, and delivers actionable business insights.",
        "avg_salary_range": "$120,000 - $170,000",
        "market_demand_index": 0.86
    },
    {
        "id": "ml_engineer",
        "title": "Machine Learning Engineer",
        "industry": "Artificial Intelligence",
        "description": "Trains and deploys deep neural networks, LLMs, and high-performance inference pipelines.",
        "avg_salary_range": "$135,000 - $200,000",
        "market_demand_index": 0.95
    },
    {
        "id": "embedded_engineer",
        "title": "Embedded Systems Engineer",
        "industry": "Hardware & Firmware",
        "description": "Writes real-time C/C++ micro-controller firmware, RTOS drivers, and IoT hardware integration.",
        "avg_salary_range": "$110,000 - $160,000",
        "market_demand_index": 0.84
    }
]

SKILLS = [
    # Electronics & Hardware Base
    {"id": "boolean_algebra", "name": "Boolean Algebra", "category": "Digital Fundamentals", "difficulty_level": "Beginner", "market_demand_score": 0.70},
    {"id": "combinational_logic", "name": "Combinational Logic", "category": "Digital Fundamentals", "difficulty_level": "Beginner", "market_demand_score": 0.75},
    {"id": "sequential_logic", "name": "Sequential Logic", "category": "Digital Fundamentals", "difficulty_level": "Beginner", "market_demand_score": 0.80},
    {"id": "fsm_design", "name": "Finite State Machines (FSM)", "category": "Digital Fundamentals", "difficulty_level": "Intermediate", "market_demand_score": 0.85},
    {"id": "digital_logic", "name": "Digital Logic", "category": "Digital Fundamentals", "difficulty_level": "Beginner", "market_demand_score": 0.88},
    
    # RTL & Verilog
    {"id": "verilog_syntax", "name": "Verilog Syntax & Data Types", "category": "RTL Design", "difficulty_level": "Beginner", "market_demand_score": 0.85},
    {"id": "verilog_rtl", "name": "Verilog RTL Design", "category": "RTL Design", "difficulty_level": "Intermediate", "market_demand_score": 0.89},
    {"id": "c_programming", "name": "C Programming & Memory", "category": "Programming", "difficulty_level": "Beginner", "market_demand_score": 0.80},
    
    # SystemVerilog Core & Advanced
    {"id": "sysverilog_syntax", "name": "SystemVerilog Syntax & OOP", "category": "RTL Verification", "difficulty_level": "Intermediate", "market_demand_score": 0.91},
    {"id": "sysverilog_interfaces", "name": "SystemVerilog Interfaces & Virtual Interfaces", "category": "RTL Verification", "difficulty_level": "Intermediate", "market_demand_score": 0.94},
    {"id": "sysverilog_randomization", "name": "Constrained Randomization", "category": "RTL Verification", "difficulty_level": "Advanced", "market_demand_score": 0.92},
    {"id": "sysverilog_assertions", "name": "SystemVerilog Assertions (SVA)", "category": "RTL Verification", "difficulty_level": "Advanced", "market_demand_score": 0.89},
    {"id": "functional_coverage", "name": "Functional Coverage & Covergroups", "category": "RTL Verification", "difficulty_level": "Advanced", "market_demand_score": 0.88},
    
    # UVM Framework
    {"id": "uvm_basics", "name": "UVM Architecture & Components", "category": "UVM Verification", "difficulty_level": "Advanced", "market_demand_score": 0.95},
    {"id": "uvm_sequences", "name": "UVM Sequences & Transactions", "category": "UVM Verification", "difficulty_level": "Advanced", "market_demand_score": 0.93},
    {"id": "uvm_scoreboard", "name": "UVM Scoreboard & TLM Ports", "category": "UVM Verification", "difficulty_level": "Advanced", "market_demand_score": 0.91},
    {"id": "uvm_testbench_project", "name": "Complete UVM Testbench Architecture", "category": "UVM Verification", "difficulty_level": "Expert", "market_demand_score": 0.96},
    
    # Programming & Software
    {"id": "python_basics", "name": "Python Programming", "category": "Software", "difficulty_level": "Beginner", "market_demand_score": 0.85},
    {"id": "data_structures", "name": "Data Structures & Algorithms", "category": "Software", "difficulty_level": "Intermediate", "market_demand_score": 0.89},
    {"id": "git_version_control", "name": "Git Version Control", "category": "Software", "difficulty_level": "Beginner", "market_demand_score": 0.85}
]

# Generate prerequisite edges
SKILL_RELATIONS = [
    # Digital Logic chain
    {"source_skill_id": "boolean_algebra", "target_skill_id": "combinational_logic", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "combinational_logic", "target_skill_id": "sequential_logic", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sequential_logic", "target_skill_id": "fsm_design", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "fsm_design", "target_skill_id": "verilog_syntax", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "digital_logic", "target_skill_id": "verilog_syntax", "relation_type": "prerequisite_of", "weight": 1.0},
    
    # Verilog -> SystemVerilog chain
    {"source_skill_id": "verilog_syntax", "target_skill_id": "verilog_rtl", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "verilog_rtl", "target_skill_id": "sysverilog_syntax", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sysverilog_syntax", "target_skill_id": "sysverilog_interfaces", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sysverilog_interfaces", "target_skill_id": "sysverilog_randomization", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sysverilog_interfaces", "target_skill_id": "sysverilog_assertions", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sysverilog_randomization", "target_skill_id": "functional_coverage", "relation_type": "prerequisite_of", "weight": 1.0},
    
    # SystemVerilog -> UVM chain
    {"source_skill_id": "sysverilog_interfaces", "target_skill_id": "uvm_basics", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "sysverilog_randomization", "target_skill_id": "uvm_basics", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "uvm_basics", "target_skill_id": "uvm_sequences", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "uvm_sequences", "target_skill_id": "uvm_scoreboard", "relation_type": "prerequisite_of", "weight": 1.0},
    {"source_skill_id": "uvm_scoreboard", "target_skill_id": "uvm_testbench_project", "relation_type": "prerequisite_of", "weight": 1.0},
    
    # Requirements for RTL Verification Engineer
    {"source_skill_id": "sysverilog_interfaces", "target_skill_id": "rtl_verification_engineer", "relation_type": "required_for", "weight": 1.0},
    {"source_skill_id": "sysverilog_assertions", "target_skill_id": "rtl_verification_engineer", "relation_type": "required_for", "weight": 1.0},
    {"source_skill_id": "uvm_basics", "target_skill_id": "rtl_verification_engineer", "relation_type": "required_for", "weight": 1.0},
    {"source_skill_id": "uvm_testbench_project", "target_skill_id": "rtl_verification_engineer", "relation_type": "required_for", "weight": 1.0}
]

CAREER_REQUIREMENTS = [
    {"career_id": "rtl_verification_engineer", "skill_id": "digital_logic", "required_proficiency": 80.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "verilog_rtl", "required_proficiency": 80.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "sysverilog_syntax", "required_proficiency": 85.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "sysverilog_interfaces", "required_proficiency": 85.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "sysverilog_randomization", "required_proficiency": 80.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "sysverilog_assertions", "required_proficiency": 75.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "uvm_basics", "required_proficiency": 85.0, "is_core_prerequisite": 1},
    {"career_id": "rtl_verification_engineer", "skill_id": "uvm_scoreboard", "required_proficiency": 80.0, "is_core_prerequisite": 1}
]

QUESTIONS = [
    {
        "id": "q_sv_interface_01",
        "skill_id": "sysverilog_interfaces",
        "question_text": "In SystemVerilog, when signals in an interface are assigned using a nonblocking assignment (<=) within a clocking block, when do the signal updates take effect?",
        "options": [
            "0. Immediately during the active region",
            "1. At the NBA (Non-Blocking Assignment) region of the scheduled time step",
            "2. In the observed region after assertions evaluate",
            "3. At the end of the simulation run"
        ],
        "correct_option_index": 1,
        "explanation": "Nonblocking assignments (<=) schedule values to be updated in the NBA region of the current time slot, preventing race conditions between driver and monitor.",
        "misconception_mappings": {
            "0": "Procedural vs Event Scheduling Confusion: Mistaking nonblocking assignments for immediate procedural execution."
        },
        "difficulty": 0.65
    },
    {
        "id": "q_sv_interface_02",
        "skill_id": "sysverilog_interfaces",
        "question_text": "What is the primary benefit of passing a virtual interface to a UVM driver component instead of a concrete interface instantiation?",
        "options": [
            "0. Virtual interfaces allow dynamic OOP components to reference physical hardware signals without static binding.",
            "1. Virtual interfaces bypass synthesis constraints.",
            "2. Virtual interfaces speed up logic gate compilation.",
            "3. Virtual interfaces eliminate the need for clock signals."
        ],
        "correct_option_index": 0,
        "explanation": "Classes in SystemVerilog are dynamic, whereas interfaces are static hardware elements. Virtual interface pointers bridge dynamic class-based UVM testbenches to static DUT signals.",
        "misconception_mappings": {
            "1": "Static vs Dynamic Scope Misconception: Confusing dynamic class handles with static hardware synthesis constructs."
        },
        "difficulty": 0.70
    }
]

RESOURCES = [
    {
        "id": "res_sv_interfaces_01",
        "title": "SystemVerilog Interfaces & Virtual Interface Hands-On Lab",
        "source_name": "EDA Playground / LEARNOS Lab",
        "url": "https://edaplayground.com/x/learnos_sv_interface_lab",
        "topic": "SystemVerilog Interfaces",
        "skill_id": "sysverilog_interfaces",
        "format": "Project",
        "difficulty": "Intermediate",
        "quality_score": 0.94
    },
    {
        "id": "res_uvm_basics_01",
        "title": "UVM Architecture Architecture & Testbench Build Guide",
        "source_name": "Accellera Systems Initiative",
        "url": "https://accellera.org/downloads/standards/uvm",
        "topic": "UVM Architecture",
        "skill_id": "uvm_basics",
        "format": "Interactive",
        "difficulty": "Advanced",
        "quality_score": 0.96
    }
]

JOBS = [
    {
        "title": "RTL Verification Engineer (UVM / SystemVerilog)",
        "company_name": "NVIDIA",
        "location": "Santa Clara, CA / Remote",
        "required_skills": ["sysverilog_interfaces", "uvm_basics", "sysverilog_assertions"],
        "market_relevance_score": 0.96
    },
    {
        "title": "Senior SOC Verification Specialist",
        "company_name": "Qualcomm",
        "location": "San Diego, CA",
        "required_skills": ["sysverilog_interfaces", "uvm_scoreboard", "fsm_design"],
        "market_relevance_score": 0.92
    }
]
