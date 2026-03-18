
import { INTERACTION_MATRIX, RULE_ORDER } from '@/data/matrix';
import { RULES } from '@/data/rules';
import { AssessmentResult, DomainScore, QuestionnaireItem, RuleId, ScoreBand } from '@/types/pli';
export const RESPONSE_LABELS=['Never','Rarely','Sometimes','Often','Almost always'];
const LAMBDA=0.2;
const reverseScore=(v:number)=>4-v;
const mean=(a:number[])=>a.reduce((s,v)=>s+v,0)/a.length;
const sd=(a:number[])=>{const m=mean(a); return Math.sqrt(mean(a.map(v=>(v-m)**2)));};
export function scoreBand(score:number):ScoreBand{if(score<2)return'very-low';if(score<3.5)return'low';if(score<5)return'emerging';if(score<6.5)return'moderate';if(score<7.5)return'good';if(score<8.5)return'strong';return'flourishing';}
export function scoreBandLabel(b:ScoreBand){return({'very-low':'Very Low',low:'Low',emerging:'Emerging',moderate:'Moderate',good:'Good',strong:'Strong',flourishing:'Flourishing'} as const)[b];}
export function isAssessmentComplete(items:QuestionnaireItem[], answers:Record<string,number>){return items.every(i=>answers[i.id]!==undefined);}
export function computeAssessment(items:QuestionnaireItem[], answers:Record<string,number>):AssessmentResult{
 const rawByRule={} as Record<RuleId,number>;
 const answeredByRule={} as Record<RuleId,number>;
 RULE_ORDER.forEach(ruleId=>{
   const ruleItems=items.filter(i=>i.ruleId===ruleId);
   answeredByRule[ruleId]=ruleItems.filter(i=>answers[i.id]!==undefined).length;
   const total=ruleItems.reduce((s,i)=>{
     const answer=answers[i.id];
     if(answer===undefined) return s;
     return s+(i.reverseCoded?reverseScore(answer):answer);
   },0);
   rawByRule[ruleId]=answeredByRule[ruleId]===0?0:Number(((10*total)/(4*answeredByRule[ruleId])).toFixed(2));
 });
 const domainScores:DomainScore[]=RULE_ORDER.map((ruleId,row)=>{const interaction=Number(RULE_ORDER.reduce((s,_,col)=>s+INTERACTION_MATRIX[row][col]*rawByRule[RULE_ORDER[col]],0).toFixed(2));const adjusted=Number(((1-LAMBDA)*rawByRule[ruleId]+LAMBDA*interaction).toFixed(2));return{ruleId,raw:rawByRule[ruleId],interaction,adjusted,band:scoreBand(adjusted),answeredCount:answeredByRule[ruleId]};});
 const pliBase=Number(domainScores.reduce((s,score)=>s+(RULES.find(r=>r.id===score.ruleId)!.weight*score.adjusted),0).toFixed(2));
 const spread=Number(sd(domainScores.map(d=>d.adjusted)).toFixed(2));
 const balanceFactor=Number(Math.max(0.85,1-0.03*spread).toFixed(3));
 const pli=Number((pliBase*balanceFactor).toFixed(2));
 return {id:crypto.randomUUID(),createdAt:new Date().toISOString(),pliBase,balanceFactor,pli,pli100:Number((pli*10).toFixed(1)),profileSpread:spread,domainScores};
}
