# Version 7 starter package — setup steps

## 1. Create services
You need:
- GitHub account
- Neon database
- Vercel account
- optional Resend account for email

## 2. Database
In Neon:
- create a new Postgres database
- copy the connection string

## 3. Local project setup
- unzip this project
- open terminal in the project folder
- create `.env` from `.env.example`
- paste your Neon connection string into `DATABASE_URL`

## 4. Install
Run:
npm install

## 5. Push Prisma schema
Run:
npm run db:push

## 6. Seed first admin
Set in `.env`:
- ADMIN_BOOTSTRAP_EMAIL
- ADMIN_BOOTSTRAP_PASSWORD

Then run:
npm run db:seed

## 7. Start local dev
Run:
npm run dev

Open:
http://localhost:3000

## 8. Upload to GitHub
- create a new private repo
- upload all project files

## 9. Deploy to Vercel
- import the GitHub repo into Vercel
- add env variables:
  - DATABASE_URL
  - AUTH_SECRET
  - AUTH_URL
  - RESEND_API_KEY
  - RESEND_FROM_EMAIL
  - CRON_SECRET
  - ADMIN_BOOTSTRAP_EMAIL
  - ADMIN_BOOTSTRAP_PASSWORD

## 10. Redeploy
After env variables are added, redeploy the project.

## 11. Build in phases
Recommended order:
1. finish auth forms
2. finish consent form storage
3. finish assessment session flow
4. finish results page
5. finish admin exports
6. finish monthly reminders
