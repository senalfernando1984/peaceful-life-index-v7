
'use client';

import { useRouter } from 'next/navigation';
import { clearAllPliData } from '@/lib/storage';

export function ClearDataButton({ label = 'Clear saved data' }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const confirmed = window.confirm(
          'This will remove your saved name, email, and assessment results from this browser. Continue?'
        );
        if (!confirmed) return;
        clearAllPliData();
        router.push('/');
        router.refresh();
      }}
      className="rounded-full border border-pli-border px-4 py-2 text-sm font-medium text-pli-ink hover:bg-pli-bg"
    >
      {label}
    </button>
  );
}
