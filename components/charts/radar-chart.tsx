'use client';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { RULES } from '@/data/rules';
import { DomainScore } from '@/types/pli';
export function PliRadarChart({scores}:{scores:DomainScore[]}){const data=RULES.map(rule=>({rule:rule.shortTitle,value:scores.find(s=>s.ruleId===rule.id)?.adjusted??0}));return <div className="h-80 w-full"><ResponsiveContainer><RadarChart data={data} outerRadius="70%"><PolarGrid stroke="#DEE5E2" /><PolarAngleAxis dataKey="rule" tick={{fill:'#667885',fontSize:12}} /><Radar dataKey="value" stroke="#195A63" fill="#195A63" fillOpacity={0.28} /></RadarChart></ResponsiveContainer></div>;}
