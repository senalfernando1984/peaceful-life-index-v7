import { AssessmentResult } from '@/types/pli';

const STORAGE_VERSION = 'v6_1';
const PROFILE_KEY = `pli-profile-${STORAGE_VERSION}`;
const ASSESSMENTS_KEY = `pli-assessments-${STORAGE_VERSION}`;

export type BrowserProfile = { name: string; email: string };

function isBrowser() {
  return typeof window !== 'undefined';
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isValidAssessment(candidate: unknown): candidate is AssessmentResult {
  if (!candidate || typeof candidate !== 'object') return false;
  const value = candidate as Record<string, unknown>;
  return (
    typeof value.id === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.pli === 'number' &&
    typeof value.pli100 === 'number' &&
    typeof value.pliBase === 'number' &&
    typeof value.balanceFactor === 'number' &&
    Array.isArray(value.domainScores)
  );
}

export function saveProfile(profile: BrowserProfile) {
  if (!isBrowser()) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getProfile(): BrowserProfile | null {
  if (!isBrowser()) return null;
  const parsed = safeParse<BrowserProfile | null>(localStorage.getItem(PROFILE_KEY), null);
  if (!parsed) return null;
  return {
    name: typeof parsed.name === 'string' ? parsed.name : '',
    email: typeof parsed.email === 'string' ? parsed.email : '',
  };
}

export function saveAssessment(result: AssessmentResult) {
  if (!isBrowser()) return;
  const current = getAssessments();
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([result, ...current]));
}

export function getAssessments(): AssessmentResult[] {
  if (!isBrowser()) return [];
  const parsed = safeParse<unknown[]>(localStorage.getItem(ASSESSMENTS_KEY), []);
  return parsed.filter(isValidAssessment);
}

export function getLatestAssessment(): AssessmentResult | null {
  const all = getAssessments();
  return all.length ? all[0] : null;
}

export function clearAllPliData() {
  if (!isBrowser()) return;
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(ASSESSMENTS_KEY);
}

export function purgeLegacyPliStorage() {
  if (!isBrowser()) return;

  const protectedKeys = new Set([PROFILE_KEY, ASSESSMENTS_KEY]);
  const legacyPrefixes = [
    'pli-profile',
    'pli-assessments',
    'pli-result',
    'pli-results',
    'pli-progress',
    'pli-answers',
  ];

  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key) continue;

    const isLegacy = legacyPrefixes.some(prefix => key === prefix || key.startsWith(prefix));
    if (isLegacy && !protectedKeys.has(key)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
}
