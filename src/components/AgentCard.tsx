/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Activity, Search, BarChart3, Binary, LayoutGrid } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AgentCardProps {
  title: string;
  icon: React.ElementType;
  data: any;
  status: 'idle' | 'processing' | 'complete';
  color?: string;
  delay?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ title, icon: Icon, data, status, color = "teal", delay = 0 }) => {
  const getBadgeColor = () => {
    switch(color) {
      case 'teal': return 'text-teal-700 bg-teal-100';
      case 'amber': return 'text-amber-700 bg-amber-100';
      case 'lavender': return 'text-[#B2A4FF] bg-white border border-[#B2A4FF]/30';
      default: return 'text-secondary bg-panel';
    }
  };

  const getDotColor = () => {
    switch(color) {
      case 'teal': return 'bg-teal-500';
      case 'amber': return 'bg-amber-500';
      case 'lavender': return 'bg-[#B2A4FF]';
      default: return 'bg-secondary';
    }
  };

  // Helper to extract the primary text content from different agent result schemas
  const getMainContent = (data: any) => {
    if (!data) return null;
    
    let parsedData = data;
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        return data; // Not JSON, return as is
      }
    }
    
    // Heuristic for extraction based on common keys
    let content = parsedData.summary || 
                  parsedData.patterns || 
                  parsedData.differences || 
                  parsedData.predicted_outcomes || 
                  parsedData.final_insights ||
                  parsedData.result;

    if (Array.isArray(content)) {
      content = content.join('\n\n');
    }

    if (typeof content === 'string') {
      if (parsedData.how_its_beneficial) {
        content += `\n\n### 💡 How It's Beneficial\n${parsedData.how_its_beneficial}`;
      }
      if (parsedData.government_implementation) {
        content += `\n\n### 🏛️ Government Implementation\n${parsedData.government_implementation}`;
      }
      if (parsedData.citizen_implementation) {
        content += `\n\n### 👥 Citizen Implementation\n${parsedData.citizen_implementation}`;
      }
      return content;
    }

    // Fallback if no specific field found
    return null;
  };

  const mainContent = getMainContent(data);
  
  let parsedData = data;
  if (typeof data === 'string') {
    try { parsedData = JSON.parse(data); } catch (e) {}
  }

  const chartColor = color === 'teal' ? '#0f766e' : color === 'amber' ? '#b45309' : color === 'lavender' ? '#8b5cf6' : '#525252';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-panel rounded-2xl border border-border p-5 flex flex-col min-h-[220px]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getDotColor()}`}></div>
          <span className="text-[11px] font-bold uppercase tracking-wider">Agent: {title}</span>
        </div>
        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${status === 'complete' ? getBadgeColor() : 'bg-white/50 text-secondary'}`}>
          {status === 'complete' ? 'COMPLETE' : status.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 bg-white/50 rounded-xl p-4 font-sans text-xs leading-relaxed overflow-y-auto border border-border/50 max-h-[450px] scrollbar-hide">
        {status === 'complete' && data ? (
          <div className="space-y-4">
             {mainContent && (
                <div className="markdown-body">
                  <ReactMarkdown>{mainContent}</ReactMarkdown>
                </div>
             )}
             
             {parsedData?.chartData && (
                <div className="mt-4 border-t border-border/50 pt-4">
                  {parsedData.chartTitle && (
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-3">{parsedData.chartTitle}</h4>
                  )}
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {title === 'Pattern Engine' ? (
                        <BarChart data={parsedData.chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                          <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} animationDuration={1500} />
                        </BarChart>
                      ) : (
                        <AreaChart data={parsedData.chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                          <defs>
                            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                          <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Area type="monotone" dataKey="metric" stroke={chartColor} fillOpacity={1} fill={`url(#gradient-${color})`} animationDuration={1500} />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
             )}

             {!mainContent && !parsedData?.chartData && (
                <div className="space-y-1 font-mono text-[10px]">
                   {Object.entries(data).map(([key, value]) => {
                     if (key === 'agent' || key === 'chartData' || key === 'chartTitle') return null;
                     return (
                       <div key={key}>
                         <span className="text-secondary font-bold">"{key}":</span> {typeof value === 'object' ? JSON.stringify(value) : `"${value}"`}
                       </div>
                     )
                   })}
                </div>
             )}
          </div>
        ) : status === 'processing' ? (
          <div className="h-full flex flex-col justify-center items-center gap-3 animate-pulse">
             <div className="w-1/2 h-1 bg-secondary/10 rounded-full overflow-hidden">
                <div className={`h-full ${getDotColor()} w-1/3 animate-[slide_1.5s_infinite_linear]`}></div>
             </div>
             <span className="text-[9px] text-secondary uppercase tracking-widest font-bold">Synthesizing...</span>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-secondary/40 italic flex-col gap-2">
            <LayoutGrid className="w-6 h-6 opacity-20" />
            Waiting for initialization...
          </div>
        )}
      </div>
    </motion.div>
  );
};
