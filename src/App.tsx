/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  ChevronRight, 
  MapPin, 
  Layers, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  Cpu,
  Globe,
  Database,
  ArrowRight,
  Search,
  Binary,
  BarChart3
} from 'lucide-react';
import { AgentCard } from './components/AgentCard';
import { MasterResponse, Country, Sector } from './types';

const mockDataStore: any = {
  pakistan: {
    education: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Current operational layers show critical capacity under pressure. Metrics indicate a widening urban-rural distribution gap.\n* **Primary Vulnerability:** Structural allocation bottlenecks are directly delaying resource stabilization initiatives.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline infrastructural delivery frameworks.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Cross-sector regression analysis displays a significant multi-year correlation between budgetary spending drops and public accessibility constraints.\n* **Predictive Insight:** If the current trajectory continues over the next 24 months, structural performance markers risk dropping by an additional 4.2%.\n* **System Core Optimization:** Consolidate resource management layers to reduce systemic deployment overhead.",
      metrics: { efficiency: "45%", stability: "Low", accessibility: "Uneven" },
      problems: ["Infrastructural delivery bottlenecks in rural territories.", "Regulatory stabilization lag impacting baseline distribution."],
      recommendations: ["Deploy localized decentralized caches for resource isolation.", "Initiate Phase 1 automated synchronization nodes immediately."]
    },
    infrastructure: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Grid transmission efficiency holds at 81% baseline operational capacity.\n* **Primary Vulnerability:** Circular debt accumulations stalling urgent distribution updates.\n* **Strategic Directive:** Modernize physical node relays immediately.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Energy allocation strains increasing log friction lines across production loops.",
      metrics: { efficiency: "52%", stability: "Strained", accessibility: "Moderate" },
      problems: ["Power grid distribution leakage", "Climate-vulnerable transit lines"],
      recommendations: ["Restructure grid transmission nodes", "Prioritize resilient trade corridor corridors"]
    },
    economy: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Macro economic markers identifying a 2.4% GDP growth pace under structural adjustments.\n* **Primary Vulnerability:** Heavy structural reliance on external balancing credit packages.\n* **Strategic Directive:** Accelerate domestic processing sectors.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Reserve buffers displaying structural volatility trends.",
      metrics: { efficiency: "38%", stability: "Unstable", accessibility: "Low" },
      problems: ["High external debt-to-GDP load (71%)", "Basal food basket price inflation"],
      recommendations: ["Enforce central currency adjustments", "Introduce target consumer safety nets"]
    }
  },
  india: {
    education: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING: INDIA (EDUCATION FOCUS)\n* **Core Baseline Status:** Current operational layers for Education infrastructure across India show critical capacity under pressure.\n* **Primary Vulnerability:** Structural allocation bottlenecks within the Education department are directly delaying resource stabilization initiatives.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline target delivery frameworks for India's regional requirements.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING: INDIA\n* **Identified Trend:** Cross-sector regression analysis displays a significant multi-year correlation between budgetary spending drops and Education accessibility constraints in India.\n* **Predictive Insight:** If the current trajectory continues over the next 24 months, Education structural performance markers risk dropping by an additional 4.2%.\n* **System Core Optimization:** Consolidate regional management layers to reduce systemic deployment overhead across India.",
      metrics: { efficiency: "74%", stability: "Stable", accessibility: "Expanding" },
      problems: ["Tier-3 regional quality imbalances", "Graduate skill alignment friction"],
      recommendations: ["Accelerate regional NEP integration", "Expand digital APAAR credential nodes"]
    },
    healthcare: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING: INDIA (HEALTHCARE)\n* **Core Baseline Metrics:** 55% Universal Health Insurance Coverage, 2.2% GDP Public Health Expenditure.\n* **Primary Vulnerability:** High out-of-pocket medical expenditure in rural belts, extreme specialist concentration in top cities.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline delivery frameworks for India's specific regional constraints.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING: INDIA\n* **Identified Trend:** Massive scale rollout of Digital Health Records linking local healthcare village nodes.\n* **Predictive Insight:** Cross-sector predictive modeling reveals that failing to address these unique Healthcare bottlenecks within the next 18 months will check broader regional growth efficiency indices by an estimated 3.8%.\n* **System Core Optimization:** Consolidate data feedback loops to bypass logistical friction zones.",
      metrics: { efficiency: "68%", stability: "Moderate", accessibility: "Uneven" },
      problems: ["High rural out-of-pocket overheads", "Urban medical personnel clusters"],
      recommendations: ["Deploy rural digital health records", "Incentivize local village health clinics"]
    },
    infrastructure: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING: INDIA (INFRASTRUCTURE FOCUS)\n* **Core Baseline Status:** Current operational layers for Infrastructure across India show critical capacity under pressure.\n* **Primary Vulnerability:** Structural allocation bottlenecks within the Infrastructure department are directly delaying resource stabilization initiatives.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline target delivery frameworks for India's regional requirements.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING: INDIA\n* **Identified Trend:** Cross-sector regression analysis displays a significant multi-year correlation between budgetary spending drops and Infrastructure accessibility constraints in India.\n* **Predictive Insight:** If the current trajectory continues over the next 24 months, Infrastructure structural performance markers risk dropping by an additional 4.2%.\n* **System Core Optimization:** Consolidate regional management layers to reduce systemic deployment overhead across India.",
      metrics: { efficiency: "82%", stability: "High", accessibility: "Optimal" },
      problems: ["State-level land capture friction", "Industrial carbon footprint load"],
      recommendations: ["Streamline corridor deployment permits", "Spur sustainable asset construction funding"]
    }
  },
  nepal: {
    education: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Current operational layers show critical capacity under pressure. Metrics indicate a widening urban-rural distribution gap.\n* **Primary Vulnerability:** Structural allocation bottlenecks are directly delaying resource stabilization initiatives.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline infrastructural delivery frameworks.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Cross-sector regression analysis displays a significant multi-year correlation between budgetary spending drops and public accessibility constraints.\n* **Predictive Insight:** If the current trajectory continues over the next 24 months, structural performance markers risk dropping by an additional 4.2%.\n* **System Core Optimization:** Consolidate resource management layers to reduce systemic deployment overhead.",
      metrics: { efficiency: "55%", stability: "Strained", accessibility: "Restricted" },
      problems: ["High mountain community dropout rates", "Geographic logistics barriers"],
      recommendations: ["Deploy remote broadcast education panels", "Subsidize transport for remote students"]
    },
    infrastructure: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Current operational layers show critical capacity under pressure. Metrics indicate a widening urban-rural distribution gap.\n* **Primary Vulnerability:** Structural allocation bottlenecks are directly delaying resource stabilization initiatives.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline infrastructural delivery frameworks.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Cross-sector regression analysis displays a significant multi-year correlation between budgetary spending drops and public accessibility constraints.\n* **Predictive Insight:** If the current trajectory continues over the next 24 months, structural performance markers risk dropping by an additional 4.2%.\n* **System Core Optimization:** Consolidate resource management layers to reduce systemic deployment overhead.",
      metrics: { efficiency: "48%", stability: "Vulnerable", accessibility: "Restricted" },
      problems: ["Hydropower distribution connection lag", "Landslide-prone highway blockages"],
      recommendations: ["Fortify cross-border power connections", "Implement automated landslide warning grids"]
    },
    economy: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING\n* **Core Baseline Status:** Growth baseline operating smoothly at a 3.8% GDP baseline.\n* **Primary Vulnerability:** Heavy remittance sensitivity, accounting for nearly 24% of domestic GDP margins.\n* **Strategic Directive:** Diversify active domestic assets instantly.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING\n* **Identified Trend:** Macroeconomic dependencies remain the primary friction point.\n* **Predictive Insight:** Shifts in foreign workforce policies pose a systematic drop risk down the line.",
      metrics: { efficiency: "59%", stability: "Volatile", accessibility: "Moderate" },
      problems: ["High remittance sensitivity (24% GDP)", "Narrow domestic production frameworks"],
      recommendations: ["Incentivize direct eco-tourism assets", "Diversify small agricultural bases"]
    }
  },
  sri_lanka: {
    economy: {
      analyst: "### 📊 STRATEGIC REGIONAL BRIEFING: SRI LANKA (ECONOMY)\n* **Core Baseline Metrics:** 8.6% Private Consumption Growth, 25.2% Credit Expansion, -0.5% Headline Inflation.\n* **Primary Vulnerability:** Rebuilding safe baseline foreign reserves under international oversight protocols, low tax collection.\n* **Strategic Directive:** Implement rapid localized node tracking to streamline delivery frameworks for Sri Lanka's specific regional constraints.",
      patterns: "### 🧩 MACRO TREND & PREDICTIVE MODELING: SRI LANKA\n* **Identified Trend:** Strong macroeconomic consumption rebound driven by negative inflation and lower bank lending rates.\n* **Predictive Insight:** Cross-sector predictive modeling reveals that failing to address these unique Economy bottlenecks within the next 18 months will check broader regional growth efficiency indices by an estimated 3.8%.\n* **System Core Optimization:** Consolidate data feedback loops to bypass logistical friction zones.",
      metrics: { efficiency: "69%", stability: "Improving", accessibility: "Moderate" },
      problems: ["Low tax collection baseline channels.", "Reserve vulnerabilities under strict macro targets."],
      recommendations: ["Strengthen electronic collection systems.", "Optimize trade logistics corridors."]
    }
  }
};

function getSimulationResponse(country: string, sector: string) {
  const cKey = country.toLowerCase().trim().replace(" ", "_");
  const sKey = sector.toLowerCase().trim();
  const metricsMap: any = {
    pakistan: { infrastructure: "81% Energy Grid Transmission Efficiency", education: "Low Primary Access Metrics", economy: "2.4% GDP Growth Rate" },
    nepal: { economy: "3.8% GDP Growth Rate", education: "Uneven Youth Literacy", infrastructure: "Mountainous Terrain Transit Caps" }
  };
  const metric = (metricsMap[cKey] && metricsMap[cKey][sKey]) ? metricsMap[cKey][sKey] : "Baseline Performance Targets";
  return `### 🛠️ TARGETED \${country.toUpperCase()} EXECUTION ROADMAP\n\n* **Phase 1 (Immediate):** Operationalize tracking nodes to address: *\${metric}*.\n* **Phase 2 (Mid-Term):** Deploy specific updates targeted directly at mitigating regional resource bottleneck lines.\n* **Phase 3 (Long-Term):** Scaled integration of structural systems with automated performance benchmarks.`;
}

const COUNTRIES = ["Pakistan", "India", "Nepal", "Sri Lanka", "Bangladesh"];
const SECTORS: Sector[] = ["Education", "Healthcare", "Infrastructure", "Economy"];

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("");
  const [selectedSector, setSelectedSector] = useState<Sector | "">("");
  const [researchMode, setResearchMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'domain' | 'compare' | 'simulation'>('domain');
  const [simScenario, setSimScenario] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MasterResponse | null>(null);

  const [compareCountries, setCompareCountries] = useState<Country[]>([]);
  const [compareSectors, setCompareSectors] = useState<Sector[]>([]);

  useEffect(() => {
    if (selectedCountry && !compareCountries.includes(selectedCountry as Country)) {
      setCompareCountries(prev => [...prev, selectedCountry as Country]);
    }
    if (selectedSector && !compareSectors.includes(selectedSector as Sector)) {
      setCompareSectors(prev => [...prev, selectedSector as Sector]);
    }
  }, [selectedCountry, selectedSector]);

  const runDynamicComparison = async () => {
    setLoading(true);
    setError(null);
    setActiveAgentId('comparison_engine');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockedComparisonValue = {
        agent: "comparison_agent",
        differences: [
           `Variance between ${compareCountries.join(" and ")} across ${compareSectors.join(", ")} is stark.`,
           `Primary divergence in logistics allocation frameworks.`
        ],
        common_bottlenecks: ["Funding drop-offs in Q3", "Inter-provincial regulatory drag"],
        recommendation: "Standardize policy exchange nodes immediately to align resource growth."
      };

      setResult(prev => ({
        ...prev,
        agents: { ...prev?.agents, comparison_engine: mockedComparisonValue }
      } as any));

    } catch (err: any) {
      setError(err.message || "Failed to generate comparison.");
    } finally {
      setLoading(false);
      setActiveAgentId(null);
    }
  };

  const runGroupAnalysis = async (group: 'domain' | 'compare' | 'simulation') => {
    if (group === 'compare') {
       setActiveTab('compare');
       return;
    }

    if (!selectedCountry || !selectedSector) {
      setError("Please select both a country and a sector before running analysis.”");
      return;
    }

    setLoading(true);
    setError(null);
    setResearchMode(true);
    setActiveTab(group);
    
    const groups = {
      domain: ['domain_analyst', 'pattern_engine'],
      compare: ['comparison_engine'],
      simulation: ['simulation_engine']
    };

    const agentIds = groups[group];
    const currentResults: any = { ...result?.agents };

    try {
      const cKey = selectedCountry.toLowerCase().trim().replace(" ", "_");
      const sKey = selectedSector.toLowerCase().trim();
      const domainData = (mockDataStore[cKey] && mockDataStore[cKey][sKey]) ? mockDataStore[cKey][sKey] : mockDataStore['pakistan']['education'];

      for (const id of agentIds) {
        setActiveAgentId(id);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === 'domain_analyst') {
            currentResults[id] = {
                agent: "analyst_agent",
                summary: domainData.analyst,
                metrics: domainData.metrics,
                issues: domainData.problems,
                recommendations: domainData.recommendations,
                chartData: [
                  { name: "2019", metric: Math.floor(Math.random() * 40) + 40 },
                  { name: "2020", metric: Math.floor(Math.random() * 40) + 45 },
                  { name: "2021", metric: Math.floor(Math.random() * 40) + 50 },
                  { name: "2022", metric: Math.floor(Math.random() * 40) + 55 },
                  { name: "2023", metric: Math.floor(Math.random() * 40) + 60 },
                  { name: "2024", metric: Math.floor(Math.random() * 40) + 65 }
                ],
                chartTitle: "Baseline Efficiency Trend (5-Year)"
            };
        } else if (id === 'pattern_engine') {
            currentResults[id] = {
                agent: "pattern_agent",
                patterns: domainData.patterns,
                bottlenecks: domainData.problems,
                severity_map: [{ focus: "Logistics", level: "High" }],
                chartData: [
                  { name: "Node A", value: Math.floor(Math.random() * 100) },
                  { name: "Node B", value: Math.floor(Math.random() * 100) },
                  { name: "Node C", value: Math.floor(Math.random() * 100) },
                  { name: "Node D", value: Math.floor(Math.random() * 100) },
                  { name: "Node E", value: Math.floor(Math.random() * 100) }
                ],
                chartTitle: "Systemic Node Friction Correlation"
            };
        } else if (id === 'simulation_engine') {
            currentResults[id] = {
                agent: "simulation_agent",
                scenario: simScenario || "Default progression (5 years)",
                predicted_outcomes: [getSimulationResponse(selectedCountry, selectedSector)],
                how_its_beneficial: `These implementation phases systematically reduce structural friction within the ${selectedSector} sector, directly alleviating bottlenecks and ensuring that localized investments yield sustainable long-term returns for ${selectedCountry}.`,
                government_implementation: `The government should enact localized policy frameworks, directly funding Phase 1 diagnostic nodes and integrating transparent tracking systems over existing bureaucratic channels.`,
                citizen_implementation: `Normal citizens and local organizations can organize community feedback loops, report regional ${selectedSector} friction, and participate in localized beta tests of the new deployed systems.`,
                risks: ["Logistical friction", "Policy resistance"],
                confidence: "Medium"
            };
        }

        setResult(prev => ({
          ...prev,
          agents: { ...prev?.agents, [id]: currentResults[id] }
        } as any));
      }

      setActiveAgentId('orchestrator');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResult(prev => ({
        ...prev,
        orchestrator: {
           system_score: domainData.metrics,
           bottlenecks_identified: domainData.problems,
           final_insights: domainData.recommendations
        },
        status: 'success',
        country: selectedCountry,
        sector: selectedSector
      } as any));

    } catch (err: any) {
      console.error("Analysis failed", err);
      setError(err.message || "Communication failed.");
    } finally {
      setLoading(false);
      setActiveAgentId(null);
    }
  };

  const startAnalysis = () => runGroupAnalysis('domain');

  const generatePDFReport = () => {
    if (!result) return;
    const doc = new jsPDF();
    let y = 20;
    const margin = 15;
    const cw = selectedCountry || 'Region';
    const cs = selectedSector || 'Sector';

    doc.setFontSize(18);
    doc.text(`Systemic Report: ${cw} - ${cs}`, margin, y);
    y += 10;
    
    if (result.orchestrator) {
      doc.setFontSize(14);
      doc.text("Orchestrator Insights", margin, y);
      y += 8;
      
      doc.setFontSize(11);
      const { system_score } = result.orchestrator;
      if (system_score) {
         doc.text(`Efficiency: ${system_score.efficiency} | Stability: ${system_score.stability} | Accessibility: ${system_score.accessibility}`, margin, y);
         y += 8;
      }
      
      if (result.orchestrator.final_insights) {
          result.orchestrator.final_insights.forEach(insight => {
              const lines = doc.splitTextToSize(`• ${insight}`, 180);
              doc.text(lines, margin, y);
              y += lines.length * 6;
          });
          y += 4;
      }
      
      if (result.orchestrator.critical_problems) {
          doc.setFont(undefined, 'bold');
          doc.text("Critical Problems:", margin, y);
          doc.setFont(undefined, 'normal');
          y += 6;
          result.orchestrator.critical_problems.forEach(p => {
              const lines = doc.splitTextToSize(`• ${p}`, 180);
              doc.text(lines, margin, y);
              y += lines.length * 6;
          });
          y += 4;
      }

      if (result.orchestrator.recommendations) {
          doc.setFont(undefined, 'bold');
          doc.text("Strategic Recommendations:", margin, y);
          doc.setFont(undefined, 'normal');
          y += 6;
          result.orchestrator.recommendations.forEach(r => {
              const lines = doc.splitTextToSize(`• ${r}`, 180);
              doc.text(lines, margin, y);
              y += lines.length * 6;
          });
          y += 10;
      }
    }

    if (result.agents) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text("Agent Diagnostics", margin, y);
      y += 8;

      Object.entries(result.agents).forEach(([agentId, data]) => {
         if (y > 260) {
            doc.addPage();
            y = 20;
         }
         doc.setFontSize(12);
         doc.setFont(undefined, 'bold');
         doc.text(agentId.replace("_", " ").toUpperCase(), margin, y);
         y += 6;

         doc.setFontSize(10);
         doc.setFont(undefined, 'normal');
         if (data) {
           let agentText = "";
           if ((data as any).summary) agentText += (data as any).summary + "\n\n";
           if ((data as any).patterns) agentText += (data as any).patterns.join("\n") + "\n\n";
           if ((data as any).differences) agentText += (data as any).differences.join("\n") + "\n\n";
           if ((data as any).predicted_outcomes) agentText += (data as any).predicted_outcomes.join("\n") + "\n\n";
           
           // Clean Markdown headers from raw text
           agentText = agentText.replace(/###/g, "").replace(/\*\*/g, "");

           const lines = doc.splitTextToSize(agentText.trim(), 180);
           doc.text(lines, margin, y);
           y += lines.length * 5 + 5;
         }
      });
    }
    
    doc.save(`Systemic_Report_${cw}_${cs}.pdf`);
  };

  if (!researchMode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        {/* Subtle animated background grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full border border-secondary/10 pointer-events-none blur-[2px]"
        />
         <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full border border-primary/10 pointer-events-none blur-[1px]"
        />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl w-full relative z-10"
        >
          <div className="mb-14 space-y-5">
             <motion.div
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="inline-flex items-center justify-center p-5 bg-white shadow-xl rounded-2xl mb-4 border border-black/5"
             >
                <Cpu className="w-8 h-8 text-primary" />
             </motion.div>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
               className="text-4xl md:text-5xl tracking-tight text-primary font-semibold"
             >
               South Asian Reality Lab
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
               className="text-secondary/70 tracking-wide text-lg font-light max-w-lg mx-auto"
             >
               A multi-agent intelligence system for analyzing real-time societal structures and frameworks.
             </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="bg-white/40 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl border border-white space-y-8 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="space-y-2 text-left"
                >
                   <label className="text-[10px] uppercase tracking-widest text-secondary font-bold px-2">Select Region</label>
                   <div className="relative group">
                     <select 
                       value={selectedCountry}
                       onChange={(e) => setSelectedCountry(e.target.value)}
                       className="w-full bg-white/70 backdrop-blur-md border border-black/5 rounded-xl py-4 px-5 shadow-sm hover:shadow-md focus:shadow-md focus:border-primary/20 hover:border-primary/20 transition-all outline-none appearance-none cursor-pointer"
                     >
                       <option value="">Choose Country</option>
                       {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                     <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-secondary group-hover:text-primary transition-colors">
                       <ChevronRight className="w-4 h-4 rotate-90" />
                     </div>
                   </div>
                </motion.div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="space-y-2 text-left"
                >
                   <label className="text-[10px] uppercase tracking-widest text-secondary font-bold px-2">Select Vertical</label>
                   <div className="relative group">
                     <select 
                       value={selectedSector}
                       onChange={(e) => setSelectedSector(e.target.value as Sector)}
                       className="w-full bg-white/70 backdrop-blur-md border border-black/5 rounded-xl py-4 px-5 shadow-sm hover:shadow-md focus:shadow-md focus:border-primary/20 hover:border-primary/20 transition-all outline-none appearance-none cursor-pointer"
                     >
                       <option value="">Choose Sector</option>
                       {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                     <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-secondary group-hover:text-primary transition-colors">
                       <ChevronRight className="w-4 h-4 rotate-90" />
                     </div>
                   </div>
                </motion.div>
             </div>

             <motion.button
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.9, duration: 0.6 }}
               whileHover={{ scale: 1.02, backgroundColor: "#1A1A1A", color: "#FFFFFF", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
               whileTap={{ scale: 0.98 }}
               onClick={startAnalysis}
               disabled={!selectedCountry || !selectedSector}
               className="w-full py-5 rounded-xl bg-white text-primary font-medium flex items-center justify-center gap-3 shadow-md border border-black/5 disabled:opacity-50 transition-all mt-6 relative overflow-hidden group"
             >
               <span className="relative z-10 flex items-center gap-3">
                 Initialize Research Matrix
                 <motion.div
                   animate={{ x: selectedCountry && selectedSector ? [0, 4, 0] : 0 }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 >
                   <ArrowRight className="w-5 h-5" />
                 </motion.div>
               </span>
               {selectedCountry && selectedSector && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
                  />
               )}
             </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="mt-14 text-[10px] uppercase tracking-[0.3em] text-secondary/40 font-bold flex items-center justify-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Encrypted Research Channel // ASIA-PROT-SL-4
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col text-primary font-sans">
       {/* Global Header */}
       <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-panel/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-medium tracking-tight">SOUTH ASIAN REALITY LAB</span>
                <span className="text-[10px] text-secondary tracking-[0.1em] uppercase">Multi-Agent Societal Intelligence</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[11px] font-medium text-secondary">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> SYSTEM OPERATIONAL
             </div>
             <div className="text-[11px] font-medium px-3 py-1 bg-panel rounded-full border border-border">
                API V.4.02 — SECURE
             </div>
          </div>
       </header>

       <div className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <aside className="w-[240px] border-r border-border p-6 flex flex-col gap-6 bg-background overflow-y-auto">
             <div className="bg-panel p-5 rounded-2xl border border-border custom-shadow flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Country Context</label>
                   <select 
                     value={selectedCountry}
                     onChange={(e) => setSelectedCountry(e.target.value)}
                     className="w-full bg-white border border-border rounded-xl px-3 py-2.5 text-xs appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500/20"
                   >
                     {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
                <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Sector Domain</label>
                   <select 
                     value={selectedSector}
                     onChange={(e) => setSelectedSector(e.target.value as Sector)}
                     className="w-full bg-white border border-border rounded-xl px-3 py-2.5 text-xs appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500/20"
                   >
                     {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
             </div>

             <div className="flex flex-col gap-3">
                <button 
                  onClick={startAnalysis}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-white rounded-xl text-xs font-medium tracking-wide flex items-center justify-center hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {loading ? 'PROCESSING...' : 'UPDATE RESEARCH'}
                </button>
             </div>

             <div className="mt-auto p-4 border border-dashed border-border rounded-xl">
                <p className="text-[10px] text-secondary leading-relaxed italic">
                  Research Lab Note: Database structure is managed manually by engineering staff. AI agents operate on static JSON datasets.
                </p>
             </div>

             <button 
               onClick={() => setResearchMode(false)}
               className="text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors text-center font-bold"
             >
               ← REINITIALIZE SESSION
             </button>
          </aside>

          {/* Center Panel */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto bg-background relative">
             {/* Subtle animated background grid for technical feel */}
             <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
             </div>
             <div className="relative z-10 space-y-6">
                 {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs flex items-center gap-3"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">{error}</span>
                      <button onClick={() => setError(null)} className="ml-auto opacity-50 hover:opacity-100">✕</button>
                    </motion.div>
                 )}
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex items-center justify-between px-2"
                 >
                    <div className="space-y-1">
                       <h2 className="text-xl tracking-tight font-medium flex items-center gap-2">
                          Research Synthesis 
                          {loading && <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse ml-2"></span>}
                       </h2>
                       <p className="text-[11px] text-secondary">Processing intelligence nodes for {selectedCountry} • {selectedSector}</p>
                    </div>
                 </motion.div>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="flex items-center gap-3 border-b border-border pb-4 px-2"
                 >
                     <button 
                       onClick={() => runGroupAnalysis('domain')}
                       disabled={loading}
                       className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'domain' ? 'bg-primary text-white scale-105 shadow-md' : 'bg-white border-border border text-secondary hover:text-primary shadow-sm hover:scale-105'}`}
                     >
                       Analyze Domain
                     </button>
                     <button 
                       onClick={() => runGroupAnalysis('compare')}
                       disabled={loading}
                       className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'compare' ? 'bg-primary text-white scale-105 shadow-md' : 'bg-white border-border border text-secondary hover:text-primary shadow-sm hover:scale-105'}`}
                     >
                       Compare Data
                     </button>
                     <button 
                       onClick={() => runGroupAnalysis('simulation')}
                       disabled={loading}
                       className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'simulation' ? 'bg-primary text-white scale-105 shadow-md' : 'bg-white border-border border text-secondary hover:text-primary shadow-sm hover:scale-105'}`}
                     >
                       Run Simulation
                     </button>
                 </motion.div>

                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                       {activeTab === 'domain' && (
                         <>
                           <AgentCard 
                             title="Domain Analyst" 
                             icon={Search} 
                             data={result?.agents?.domain_analyst}
                             status={activeAgentId === 'domain_analyst' ? 'processing' : result?.agents?.domain_analyst ? 'complete' : 'idle'}
                             color="teal"
                             delay={0.1}
                           />
                           <AgentCard 
                             title="Pattern Engine" 
                             icon={Binary} 
                             data={result?.agents?.pattern_engine}
                             status={activeAgentId === 'pattern_engine' ? 'processing' : result?.agents?.pattern_engine ? 'complete' : 'idle'}
                             color="amber"
                             delay={0.2}
                           />
                         </>
                       )}
                       {activeTab === 'simulation' && (
                         <div className="lg:col-span-2">
                            <AgentCard 
                              title="Simulation Engine" 
                              icon={Zap} 
                              data={result?.agents?.simulation_engine}
                              status={activeAgentId === 'simulation_engine' ? 'processing' : result?.agents?.simulation_engine ? 'complete' : 'idle'}
                              color="lavender"
                              delay={0.1}
                            />
                         </div>
                       )}
                       {activeTab === 'compare' && (
                         <div className="lg:col-span-2 space-y-4">
                            <motion.div 
                               initial={{ opacity: 0, scale: 0.98 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.1 }}
                               className="bg-white/60 backdrop-blur-md border border-border p-5 rounded-2xl shadow-sm space-y-5"
                            >
                               <div className="space-y-3">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                                     <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span> Compare Countries
                                  </label>
                           <div className="flex flex-wrap gap-2">
                             {COUNTRIES.map(c => (
                               <button 
                                 key={c}
                                 onClick={() => {
                                   if (compareCountries.includes(c)) {
                                     setCompareCountries(prev => prev.filter(x => x !== c));
                                   } else {
                                     setCompareCountries(prev => [...prev, c]);
                                   }
                                 }}
                                 className={`px-3 py-1.5 rounded-full text-xs font-medium border ${compareCountries.includes(c) ? 'bg-primary text-white border-primary' : 'bg-white text-secondary border-border hover:border-primary/50'}`}
                               >
                                 {c}
                               </button>
                             ))}
                             <button 
                               onClick={() => setCompareCountries([...COUNTRIES])}
                               className="px-3 py-1.5 rounded-full text-xs font-medium border bg-panel text-secondary border-border hover:border-primary/50"
                             >
                               Select All
                             </button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Compare Sectors</label>
                           <div className="flex flex-wrap gap-2">
                             {SECTORS.map(s => (
                               <button 
                                 key={s}
                                 onClick={() => {
                                   if (compareSectors.includes(s)) {
                                     setCompareSectors(prev => prev.filter(x => x !== s));
                                   } else {
                                     setCompareSectors(prev => [...prev, s]);
                                   }
                                 }}
                                 className={`px-3 py-1.5 rounded-full text-xs font-medium border ${compareSectors.includes(s) ? 'bg-primary text-white border-primary' : 'bg-white text-secondary border-border hover:border-primary/50'}`}
                               >
                                 {s}
                               </button>
                             ))}
                             <button 
                               onClick={() => setCompareSectors([...SECTORS])}
                               className="px-3 py-1.5 rounded-full text-xs font-medium border bg-panel text-secondary border-border hover:border-primary/50"
                             >
                               Select All
                             </button>
                           </div>
                        </div>
                        <button 
                       onClick={() => runDynamicComparison()}
                       disabled={loading || compareCountries.length === 0 || compareSectors.length === 0}
                       className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-[1.02] shadow-sm transition-transform disabled:opacity-50 relative overflow-hidden group"
                     >
                       <span className="relative z-10 flex items-center justify-center gap-2">
                         {loading ? 'Generating Competitive Analysis...' : 'Generate Competitive Comparison'}
                         {loading && <Zap className="w-3 h-3 animate-pulse" />}
                       </span>
                       {(compareCountries.length > 0 && compareSectors.length > 0 && !loading) && (
                          <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shimmer_2s_infinite]" />
                       )}
                     </button>
                  </motion.div>
                  <AgentCard 
                    title="Comparative Analysis" 
                    icon={BarChart3} 
                    data={result?.agents?.comparison_engine}
                    status={activeAgentId === 'comparison_engine' ? 'processing' : result?.agents?.comparison_engine ? 'complete' : 'idle'}
                    color="secondary"
                    delay={0.1}
                  />
               </div>
             )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-[320px] bg-white border-l border-border flex flex-col overflow-hidden">
             <div className="p-6 border-b border-border bg-panel/20">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Orchestrator Insights</h3>
                <div className="grid grid-cols-3 gap-2">
                   {result?.orchestrator?.system_score ? Object.entries(result.orchestrator.system_score).map(([key, val]) => (
                     <div key={key} className="text-center bg-background py-2 rounded-lg border border-border">
                        <div className="text-[14px] font-medium">{val}</div>
                        <div className="text-[8px] text-secondary font-bold uppercase tracking-tighter">{key}</div>
                     </div>
                   )) : (
                     [1,2,3].map(i => (
                        <div key={i} className={`bg-background py-2 rounded-lg border border-border h-10 ${activeAgentId === 'orchestrator' ? 'animate-pulse bg-primary/5' : ''}`} />
                     ))
                   )}
                </div>
             </div>

             <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                {result?.orchestrator?.final_insights && (
                   <div className="space-y-1">
                      {result.orchestrator.final_insights.map((insight, i) => (
                         <p key={i} className="text-[11px] leading-relaxed text-secondary italic">
                            {insight}
                         </p>
                      ))}
                   </div>
                )}
                <section>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3 flex items-center gap-2">
                     <span className={`w-1.5 h-1.5 rounded-full ${activeAgentId === 'orchestrator' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`}></span> Critical Problems
                   </h4>
                   <ul className="text-xs space-y-3">
                      {result?.orchestrator?.critical_problems?.map((p, i) => (
                        <li key={i} className="pl-3 border-l-2 border-border leading-relaxed text-primary">
                           {p}
                        </li>
                      )) || <div className="space-y-2">
                        {[1,2].map(i => <div key={i} className={`bg-panel/30 h-10 rounded border border-border ${activeAgentId === 'orchestrator' ? 'animate-pulse' : ''}`} />)}
                      </div>}
                   </ul>
                </section>

                <section>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3 flex items-center gap-2">
                     <span className={`w-1.5 h-1.5 rounded-full ${activeAgentId === 'orchestrator' ? 'bg-amber-400 animate-pulse' : 'bg-teal-400'}`}></span> Strategic Recommendations
                   </h4>
                   <div className="space-y-2">
                      {result?.orchestrator?.recommendations?.map((r, i) => (
                        <div key={i} className="bg-background p-3 rounded-xl border border-border text-xs leading-relaxed">
                           {r}
                        </div>
                      )) || <div className="space-y-2">
                        {[1,2].map(i => <div key={i} className={`bg-panel/30 h-14 rounded border border-border ${activeAgentId === 'orchestrator' ? 'animate-pulse' : ''}`} />)}
                      </div>}
                   </div>
                </section>
             </div>

             <div className="p-4 bg-panel text-center border-t border-border mt-auto">
                <button 
                  onClick={generatePDFReport}
                  className="text-[10px] font-bold uppercase tracking-widest hover:text-teal-600 transition-colors">
                  Generate Systemic Report (PDF)
                </button>
             </div>
          </aside>
       </div>
    </div>
  );
}
