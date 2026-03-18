import Link from 'next/link';
import { RULES } from '@/data/rules';
import { ProfileForm } from '@/components/profile-form';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-pli-border px-3 py-1 text-xs font-medium text-pli-teal">
            The Happiness Blueprint
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Measure your <span className="text-pli-teal">Peaceful Life Index</span> through the 10 Golden Rules.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pli-slate">
            The Peaceful Life Index translates the philosophy of <strong className="text-pli-ink">The Happiness Blueprint: The 10 Golden Rules</strong> into a practical self-assessment.
            It helps you reflect on peace, balance, everyday behaviour, relationships, health, financial stability, humility, calmness, and adaptability,
            then shows your strengths, growth areas, and practical next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/assessment" className="rounded-full bg-pli-teal px-6 py-3 font-medium text-white">
              Start assessment
            </Link>
            <Link href="/results" className="rounded-full border border-pli-border px-6 py-3 font-medium">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {RULES.map(rule => (
              <div key={rule.id} className="rounded-2xl border border-pli-border bg-pli-bg p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Rule {rule.index}</p>
                <h3 className="mt-2 font-medium">{rule.title}</h3>
                <p className="mt-2 text-sm text-pli-slate">{rule.whyItMatters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProfileForm />
    </div>
  );
}
