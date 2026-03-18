'use client';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
export function TrendChart({data}:{data:Array<{label:string;pli:number}>}){return <div className="h-72 w-full"><ResponsiveContainer><LineChart data={data}><CartesianGrid stroke="#E7ECE9" strokeDasharray="4 4" /><XAxis dataKey="label" tick={{fill:'#667885',fontSize:12}} /><YAxis domain={[0,10]} tick={{fill:'#667885',fontSize:12}} /><Tooltip /><Line dataKey="pli" type="monotone" stroke="#195A63" strokeWidth={3} dot={{r:4}} /></LineChart></ResponsiveContainer></div>;}
