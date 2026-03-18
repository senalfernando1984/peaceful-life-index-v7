# Peaceful Life Index Version 7 Starter Package

This is a developer-ready starter scaffold for the authenticated PLI platform.

## What this package is
- a real project scaffold
- Prisma + PostgreSQL schema
- Auth.js credentials auth skeleton
- public routes, user routes, admin routes
- scoring utility and matrix
- consent-ready data model
- reminder-ready cron endpoint
- starter seed for one admin user

## What this package is not
- not a finished production app
- not fully wired forms
- not full assessment UI yet
- not final evidence mapping
- not final CSV/Excel export implementation

## Local setup
1. Copy `.env.example` to `.env`
2. Fill in `DATABASE_URL`
3. Run:
   - `npm install`
   - `npm run db:push`
   - `npm run db:seed`
   - `npm run dev`

## Deploy
- push to GitHub
- import into Vercel
- add environment variables
- redeploy
