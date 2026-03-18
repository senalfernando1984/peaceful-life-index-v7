# Peaceful Life Index — Version 6.1 final patched browser edition

This is a patched browser-based PLI edition designed for easy Vercel deployment.

## What this patch fixes
- fixes a real TypeScript syntax error in `lib/storage.ts`
- uses a fresh browser storage version key
- improves legacy data cleanup
- updates header, footer, and metadata text
- keeps the Version 6 assessment structure, dashboard, and interventions

## What it includes
- 10 domains based on the 10 Golden Rules
- 10 questions per domain
- browser-saved profile and assessment history
- clear-data reset button
- radar profile, progress chart, and interaction grid
- practical SBCC growth actions

## Important
This is still a browser-storage edition.
It does not include true email-auth sign-in or a backend database.

## Deployment
- upload to a new GitHub repo
- import into Vercel
- no environment variables required


## Version 6.2 patch

- fixes the Next.js 15 dynamic route `params` typing in `app/rules/[ruleId]/page.tsx`


## Version 6.3 patch

- fixes a React hook-order bug in the results dashboard that caused a client-side crash after completing the assessment


## Version 6.4 patch

- scrolls to the top automatically when moving to the next rule
- highlights missed questions and explains why Next does not proceed
- uses clearer numbering: absolute question number plus rule item number


## Version 6.5 patch

- strengthens automatic top scroll on rule change
- adds explicit current-rule completion messaging
- makes unanswered-question highlighting and messaging more forceful
- keeps absolute numbering across all 100 questions


## Version 6.6 patch

- removes Browser Edition wording from visible homepage branding
- removes the Version 6 homepage sentence
- adds clear monthly 30-day assessment instructions before the questionnaire starts
- adds more tailored SBCC guidance by domain and score band
