import { PrismaClient, ConsentType, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'ChangeThisStrongly123!';
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'PLI Admin',
      email,
      passwordHash,
      role: UserRole.ADMIN,
      emailVerified: new Date()
    }
  });

  const consentTypes = [
    ConsentType.DATA_STORAGE,
    ConsentType.SBCC_FEEDBACK,
    ConsentType.RESEARCH_USE,
    ConsentType.EXPERT_REVIEW,
    ConsentType.REMINDER_EMAILS
  ];

  for (const consentType of consentTypes) {
    try {
      await prisma.consentRecord.create({
        data: {
          userId: admin.id,
          consentType,
          granted: true,
          textVersion: 'v1'
        }
      });
    } catch {}
  }

  await prisma.reminderPreference.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      emailRemindersEnabled: true,
      inAppRemindersEnabled: true,
      monthlyReminderDay: 30
    }
  });

  console.log('Seed complete. Admin email:', email);
}

main().finally(async () => {
  await prisma.$disconnect();
});
