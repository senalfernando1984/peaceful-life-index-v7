'use client';
import { useEffect, useState } from 'react';
import { getAssessments } from '@/lib/storage';
import { TrendChart } from '@/components/charts/trend-chart';
import { formatDate } from '@/lib/utils';
export default function ProgressPage(){const [data,setData]=useState<Array<{label:string;pli:number}>>([]);useEffect(()=>{const results=[...getAssessments()].reverse();setData(results.map(item=>({label:formatDate(item.createdAt),pli:item.pli})));},[]);return <div className="card p-6"><p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Progress over time</p><h1 className="mt-2 text-3xl font-semibold">Assessment trend</h1><p className="mt-3 text-sm text-pli-slate">This version stores assessments in this browser, so repeated visits on the same browser will build your trend line.</p><div className="mt-6"><TrendChart data={data} /></div></div>;}
