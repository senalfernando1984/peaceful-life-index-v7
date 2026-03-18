'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { RULES } from '@/data/rules';
import { PliRadarChart } from '@/components/charts/radar-chart';
import { TrendChart } from '@/components/charts/trend-chart';
import { InteractionGrid } from '@/components/charts/interaction-grid';
import { ClearDataButton } from '@/components/clear-data-button';
import { getAssessments, getLatestAssessment, purgeLegacyPliStorage } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import { scoreBandLabel } from '@/lib/scoring';
import { AssessmentResult } from '@/types/pli';
import { INTERVENTIONS } from '@/data/interventions';

function overallBandLabel(score: number) {
  if (score < 2) return 'Very Low';
  if (score < 3.5) return 'Low';
  if (score < 5) return 'Emerging';
  if (score < 6.5) return 'Moderate';
  if (score < 7.5) return 'Good';
  if (score < 8.5) return 'Strong';
  return 'Flourishing';
}

export function ResultsDashboard() {
  const [latest, setLatest] = useState<AssessmentResult | null>(null);
  const [all, setAll] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    purgeLegacyPliStorage();
    setLatest(getLatestAssessment());
    setAll(getAssessments());
  }, []);

  const domainScores = latest?.domainScores ?? [];
  const sorted = [...domainScores].sort((a, b) => b.adjusted - a.adjusted);
  const strong = sorted.slice(0, 3);
  const weak = [...domainScores].sort((a, b) => a.adjusted - b.adjusted).slice(0, 3);

  const trend = [...all]
    .reverse()
    .map(item => ({ label: formatDate(item.createdAt), pli: item.pli }));

  const growth = useMemo(
    () =>
      weak.map(score => {
        const rule = RULES.find(item => item.id === score.ruleId);
        if (!rule) return null;

        let scoreBand: 'very-low' | 'low' | 'moderate' | 'maintenance';
        if (score.adjusted < 2) scoreBand = 'very-low';
        else if (score.adjusted < 5) scoreBand = 'low';
        else if (score.adjusted < 7.5) scoreBand = 'moderate';
        else scoreBand = 'maintenance';

        return {
          rule,
          score,
          interventions: INTERVENTIONS.filter(
            item => item.ruleId === score.ruleId && item.scoreBand === scoreBand
          ).slice(0, 1),
        };
      }).filter(Boolean),
    [weak]
  ) as Array<{
    rule: (typeof RULES)[number];
    score: NonNullable<AssessmentResult['domainScores']>[number];
    interventions: typeof INTERVENTIONS;
  }>;

  if (!latest || !Array.isArray(latest.domainScores)) {
    return (
      <div className="card p-10 text-center">
        <h2 className="text-2xl font-semibold">No valid assessment saved yet</h2>
        <p className="mt-3 text-sm text-pli-slate">
          Complete your first assessment or clear old browser data if this device holds an older incompatible version.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/assessment" className="inline-flex rounded-full bg-pli-teal px-5 py-3 text-sm font-medium text-white">
            Start assessment
          </Link>
          <ClearDataButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Overall Peaceful Life Index</p>
          <div className="mt-4 flex items-end gap-4">
            <p className="text-5xl font-semibold text-pli-teal">{latest.pli.toFixed(2)}</p>
            <div className="pb-1 text-sm text-pli-slate">
              <p>out of 10</p>
              <p>{latest.pli100.toFixed(1)} / 100</p>
              <p className="mt-1 font-medium text-pli-ink">{overallBandLabel(latest.pli)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-pli-bg p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Base</p>
              <p className="mt-2 text-2xl font-semibold">{latest.pliBase.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl bg-pli-bg p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Balance factor</p>
              <p className="mt-2 text-2xl font-semibold">{latest.balanceFactor.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl bg-pli-bg p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Spread</p>
              <p className="mt-2 text-2xl font-semibold">{latest.profileSpread.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-pli-slate">Latest saved: {formatDate(latest.createdAt)}</p>
            <ClearDataButton />
          </div>
        </div>

        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Radar profile</p>
          <PliRadarChart scores={latest.domainScores} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {latest.domainScores.map(score => {
          const rule = RULES.find(item => item.id === score.ruleId);
          if (!rule) return null;

          return (
            <Link key={score.ruleId} href={`/rules/${rule.slug}`} className="card block p-5 hover:-translate-y-0.5">
              <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Rule {rule.index}</p>
              <h3 className="mt-2 font-semibold">{rule.shortTitle}</h3>
              <p className="mt-4 text-3xl font-semibold text-pli-teal">{score.adjusted.toFixed(1)}</p>
              <p className="mt-2 text-xs text-pli-slate">{scoreBandLabel(score.band)}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-semibold">Strengths</h2>
          <ul className="mt-4 space-y-3 text-sm text-pli-slate">
            {strong.map(score => {
              const rule = RULES.find(item => item.id === score.ruleId);
              if (!rule) return null;

              return (
                <li key={score.ruleId}>
                  <strong className="text-pli-ink">{rule.title}</strong> · {score.adjusted.toFixed(1)}/10 ·{' '}
                  {scoreBandLabel(score.band)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold">Growth areas</h2>
          <div className="mt-4 space-y-4">
            {growth.map(({ rule, score, interventions }) => (
              <div key={rule.id} className="rounded-2xl bg-pli-bg p-4 text-sm text-pli-slate">
                <p>
                  <strong className="text-pli-ink">{rule.title}</strong> · {score.adjusted.toFixed(1)}/10 ·{' '}
                  {scoreBandLabel(score.band)}
                </p>
                {interventions.length ? interventions.map(item => (
                  <div key={item.id} className="mt-3 space-y-2">
                    <p>
                      <strong className="text-pli-ink">Tailored SBCC action:</strong> {item.title}
                    </p>
                    <p>
                      <strong className="text-pli-ink">What to do:</strong> {item.whatToDo}
                    </p>
                    <p>
                      <strong className="text-pli-ink">Quick action:</strong> {item.quickAction}
                    </p>
                    <p>
                      <strong className="text-pli-ink">Why it may help:</strong> {item.whyItHelps}
                    </p>
                    <p>
                      <strong className="text-pli-ink">Weekly practice:</strong> {item.weeklyPractice}
                    </p>
                    <p>
                      <strong className="text-pli-ink">Longer habit:</strong> {item.longerHabit}
                    </p>
                  </div>
                )) : (
                  <p className="mt-3">No intervention card mapped yet for this score band.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Interaction grid</p>
        <div className="mt-4">
          <InteractionGrid />
        </div>
      </div>

      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">PLI trend over time</p>
        <TrendChart data={trend} />
      </div>

      <div className="card p-6 text-sm text-pli-slate">
        <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Evidence note</p>
        <p className="mt-3">
          Version 6.3 is structured to be evidence-ready, but it is still <strong className="text-pli-ink">not yet a fully peer-reviewed validated instrument</strong>.
          A separate literature-mapped research version is needed to attach verified citations and validation notes to every item, subdomain, and intervention.
        </p>
      </div>
    </div>
  );
}
