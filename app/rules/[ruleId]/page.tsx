import { RuleDetail } from '@/components/rule-detail';

export default async function RulePage({
  params,
}: {
  params: Promise<{ ruleId: string }>;
}) {
  const { ruleId } = await params;
  return <RuleDetail slug={ruleId} />;
}
