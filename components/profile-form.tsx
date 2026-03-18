
'use client';

import { useEffect, useState } from 'react';
import { getProfile, saveProfile } from '@/lib/storage';
import { ClearDataButton } from '@/components/clear-data-button';

export function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, []);

  return (
    <div className="card p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-pli-gold">Profile on this device</p>
      <h2 className="mt-2 text-2xl font-semibold">Save your name and email before assessing</h2>
      <p className="mt-2 text-sm text-pli-slate">
        This Version 6 browser edition stores your profile and assessment history in this browser only.
        Use your email here so your reports are clearly tied to you on this device. A true verified
        email sign-in system requires a backend auth service and can be added in the next app version.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          className="input-base"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="input-base"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => {
            saveProfile({ name, email });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="rounded-full bg-pli-teal px-5 py-2 text-sm font-medium text-white"
        >
          Save profile
        </button>
        <ClearDataButton />
      </div>

      {saved ? <p className="mt-3 text-sm text-pli-teal">Profile saved on this device.</p> : null}
    </div>
  );
}
