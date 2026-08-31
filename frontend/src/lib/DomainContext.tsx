"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface DomainTelemetry {
  name: string;
  category: string;
  iconName: string;
  defaultRole: string;
  roles: string[];
  readinessScore: number;
  marketDemandTrend: string;
  targetSalary: string;
  keySkills: { id: string; name: string; mastery: number; category: string }[];
  telemetryMetrics: { label: string; value: string; percentage: number; status: "high" | "medium" | "low" }[];
}

export const DOMAINS: Record<string, DomainTelemetry> = {
  vlsi: {
    name: "VLSI & Semiconductor",
    category: "Hardware / Microelectronics",
    iconName: "Cpu",
    defaultRole: "RTL Verification Engineer",
    roles: [
      "RTL Verification Engineer",
      "RTL Design Engineer",
      "Physical Design Engineer (STA/ASIC)",
      "DFT Engineer",
      "Analog / Mixed-Signal IC Engineer",
      "SoC Architecture Specialist"
    ],
    readinessScore: 72,
    marketDemandTrend: "+18% YoY",
    targetSalary: "$135k - $195k",
    keySkills: [
      { id: "digital_logic", name: "Digital Logic & FSM", mastery: 91, category: "Fundamentals" },
      { id: "verilog_syntax", name: "Verilog & RTL Coding", mastery: 78, category: "Design" },
      { id: "sysverilog_syntax", name: "SystemVerilog OOP", mastery: 64, category: "Verification" },
      { id: "sysverilog_interfaces", name: "SV Interfaces & Modports", mastery: 58, category: "Verification" },
      { id: "uvm_basics", name: "UVM Architecture & Scoreboards", mastery: 47, category: "Verification" },
      { id: "fpga_prototyping", name: "FPGA Prototyping (Vivado)", mastery: 72, category: "Implementation" },
      { id: "sta_timing", name: "Static Timing Analysis (STA)", mastery: 41, category: "Silicon Flow" },
      { id: "physical_design", name: "ASIC Synthesis & P&R", mastery: 34, category: "Silicon Flow" }
    ],
    telemetryMetrics: [
      { label: "RTL Readiness", value: "78%", percentage: 78, status: "high" },
      { label: "SystemVerilog OOP", value: "64%", percentage: 64, status: "medium" },
      { label: "UVM Coverage", value: "47%", percentage: 47, status: "medium" },
      { label: "FPGA Vivado Flow", value: "72%", percentage: 72, status: "high" },
      { label: "Static Timing Analysis", value: "41%", percentage: 41, status: "low" },
      { label: "ASIC P&R Flow", value: "34%", percentage: 34, status: "low" }
    ]
  },
  embedded: {
    name: "Embedded Systems & Firmware",
    category: "Systems / Hardware-Software",
    iconName: "Binary",
    defaultRole: "Embedded Firmware Engineer",
    roles: [
      "Embedded Firmware Engineer",
      "RTOS Systems Developer",
      "Linux Device Driver Architect",
      "Microcontroller Firmware Dev"
    ],
    readinessScore: 68,
    marketDemandTrend: "+14% YoY",
    targetSalary: "$120k - $175k",
    keySkills: [
      { id: "c_lang", name: "Embedded C (ISO/IEC 9899)", mastery: 85, category: "Core" },
      { id: "arm_cortex", name: "ARM Cortex-M Architecture", mastery: 72, category: "Hardware" },
      { id: "freertos", name: "FreeRTOS Scheduler & Mutexes", mastery: 61, category: "OS" },
      { id: "embedded_linux", name: "Embedded Linux Kernel Drivers", mastery: 42, category: "OS" }
    ],
    telemetryMetrics: [
      { label: "Embedded C", value: "85%", percentage: 85, status: "high" },
      { label: "ARM Cortex", value: "72%", percentage: 72, status: "high" },
      { label: "FreeRTOS", value: "61%", percentage: 61, status: "medium" },
      { label: "Linux Drivers", value: "42%", percentage: 42, status: "low" }
    ]
  },
  aiml: {
    name: "AI / Machine Learning",
    category: "Software & Data Intelligence",
    iconName: "Brain",
    defaultRole: "AI / ML Systems Engineer",
    roles: [
      "AI / ML Systems Engineer",
      "LLM & RAG Application Engineer",
      "Computer Vision Specialist",
      "MLOps & Model Optimization Eng"
    ],
    readinessScore: 81,
    marketDemandTrend: "+34% YoY",
    targetSalary: "$145k - $210k",
    keySkills: [
      { id: "python_core", name: "Python & PyTorch 2.0", mastery: 92, category: "Core" },
      { id: "transformers_llm", name: "Transformers & Fine-Tuning", mastery: 84, category: "AI Models" },
      { id: "rag_vector", name: "RAG & Vector Embeddings", mastery: 79, category: "Architectures" },
      { id: "triton_cuda", name: "Triton & CUDA Kernels", mastery: 48, category: "Acceleration" }
    ],
    telemetryMetrics: [
      { label: "PyTorch 2.0", value: "92%", percentage: 92, status: "high" },
      { label: "Transformers", value: "84%", percentage: 84, status: "high" },
      { label: "RAG / Vector DB", value: "79%", percentage: 79, status: "high" },
      { label: "CUDA / Acceleration", value: "48%", percentage: 48, status: "medium" }
    ]
  },
  software: {
    name: "Software Engineering & Cloud",
    category: "Full Stack & Backend Platforms",
    iconName: "Code",
    defaultRole: "Senior Backend / Cloud Engineer",
    roles: [
      "Senior Backend Engineer",
      "Full Stack Systems Developer",
      "Distributed Systems Architect",
      "Cloud Infrastructure Lead"
    ],
    readinessScore: 76,
    marketDemandTrend: "+16% YoY",
    targetSalary: "$130k - $185k",
    keySkills: [
      { id: "ts_next", name: "TypeScript & Next.js 14", mastery: 88, category: "Frontend" },
      { id: "go_python_api", name: "Go & FastAPI Backends", mastery: 82, category: "Backend" },
      { id: "postgres_redis", name: "PostgreSQL & Redis Caching", mastery: 74, category: "Data" },
      { id: "k8s_docker", name: "Kubernetes & Docker Containers", mastery: 65, category: "Cloud" }
    ],
    telemetryMetrics: [
      { label: "TypeScript / Next.js", value: "88%", percentage: 88, status: "high" },
      { label: "FastAPI / Go API", value: "82%", percentage: 82, status: "high" },
      { label: "PostgreSQL / DB", value: "74%", percentage: 74, status: "high" },
      { label: "Kubernetes / K8s", value: "65%", percentage: 65, status: "medium" }
    ]
  },
  fpga: {
    name: "FPGA & RTL Acceleration",
    category: "Hardware Acceleration",
    iconName: "Zap",
    defaultRole: "FPGA Accelerator Architect",
    roles: [
      "FPGA Accelerator Architect",
      "High-Frequency Trading FPGA Dev",
      "PCIe Acceleration Specialist"
    ],
    readinessScore: 70,
    marketDemandTrend: "+22% YoY",
    targetSalary: "$140k - $200k",
    keySkills: [
      { id: "vivado_hls", name: "Xilinx Vivado HLS", mastery: 74, category: "Tools" },
      { id: "axi4_stream", name: "AXI4-Stream & Memory Interfaces", mastery: 68, category: "Protocols" },
      { id: "pcie_dma", name: "PCIe Gen4 XDMA Drivers", mastery: 55, category: "Interfaces" }
    ],
    telemetryMetrics: [
      { label: "Vivado HLS", value: "74%", percentage: 74, status: "high" },
      { label: "AXI4 Interconnect", value: "68%", percentage: 68, status: "medium" },
      { label: "PCIe XDMA", value: "55%", percentage: 55, status: "medium" }
    ]
  }
};

interface DomainContextType {
  activeDomainKey: string;
  activeDomain: DomainTelemetry;
  setActiveDomainKey: (key: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const DomainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDomainKey, setActiveDomainKey] = useState<string>("vlsi");
  const [selectedRole, setSelectedRole] = useState<string>(DOMAINS.vlsi.defaultRole);

  useEffect(() => {
    if (DOMAINS[activeDomainKey]) {
      setSelectedRole(DOMAINS[activeDomainKey].defaultRole);
    }
  }, [activeDomainKey]);

  const activeDomain = DOMAINS[activeDomainKey] || DOMAINS.vlsi;

  return (
    <DomainContext.Provider
      value={{
        activeDomainKey,
        activeDomain,
        setActiveDomainKey,
        selectedRole,
        setSelectedRole
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};

export function useDomain() {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error("useDomain must be used within a DomainProvider");
  }
  return context;
}
