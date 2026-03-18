
export type RuleId='do-good'|'do-right-thing'|'do-no-harm'|'treat-equally'|'love-yourself-and-all'|'eat-healthy-live-healthy'|'financial-freedom'|'be-humble'|'stay-calm'|'accept-change';
export type ScoreBand='very-low'|'low'|'emerging'|'moderate'|'good'|'strong'|'flourishing';
export interface RuleDefinition{index:number;id:RuleId;slug:string;title:string;shortTitle:string;weight:number;definition:string;whyItMatters:string;subdomains:string[];}
export interface DomainScore{ruleId:RuleId;raw:number;interaction:number;adjusted:number;band:ScoreBand;answeredCount:number;}
export interface AssessmentResult{id:string;createdAt:string;pli:number;pli100:number;pliBase:number;balanceFactor:number;profileSpread:number;domainScores:DomainScore[];}
export interface QuestionnaireItem{id:string;ruleId:RuleId;prompt:string;reverseCoded?:boolean;subdomain:string;scenario?:boolean;evidenceTag?:string;}
export interface InterventionEntry{id:string;ruleId:RuleId;scoreBand:'very-low'|'low'|'moderate'|'maintenance';title:string;whatToDo:string;whyItHelps:string;quickAction:string;weeklyPractice:string;longerHabit:string;mechanism?:string;evidenceStatus?:'placeholder'|'mapped';}
