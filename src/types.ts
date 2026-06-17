/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DomainAgentOutput {
  agent: "domain_agent";
  summary: string;
  metrics: Record<string, any>;
  issues: string[];
  causes: string[];
  recommendations: string[];
}

export interface PatternAgentOutput {
  agent: "pattern_agent";
  patterns: string[];
  bottlenecks: string[];
  severity_map: Array<{ focus: string; level: "low" | "medium" | "high" | "critical" }>;
}

export interface ComparisonAgentOutput {
  agent: "comparison_agent";
  differences: string[];
  winner: string;
  reasoning: string;
}

export interface SimulationAgentOutput {
  agent: "simulation_agent";
  scenario: string;
  predicted_outcomes: string[];
  risks: string[];
  confidence: string;
}

export interface OrchestratorOutput {
  final_insights: string[];
  critical_problems: string[];
  recommendations: string[];
  system_score: {
    efficiency: string;
    stability: string;
    accessibility: string;
  };
}

export interface MasterResponse {
  status: "success" | "error";
  country: string;
  sector: string;
  agents: {
    domain_analyst: DomainAgentOutput;
    pattern_engine: PatternAgentOutput;
    comparison_engine: ComparisonAgentOutput;
    simulation_engine: SimulationAgentOutput;
  };
  orchestrator: OrchestratorOutput;
}

export type Sector = "Education" | "Healthcare" | "Infrastructure" | "Economy";
export type Country = string;
