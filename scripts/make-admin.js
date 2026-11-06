import argon2 from "argon2";
import { prisma } from "@codeclash/db";

const email = process.argv[2] || "admin@codeclash.dev";
const password = process.argv[3] || "Admin123!";
const username = process.argv[4] || "admin";

async function main() {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({
    where: { emailNormalized: normalizedEmail },
  });

  if (existing) {
    const passwordHash = await argon2.hash(password);
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: {
        role: "ADMIN",
        passwordHash, // Reset password to ensure known credentials
      },
    });
    console.log(`\n==============================================`);
    console.log(`✅ Existing user promoted to ADMIN:`);
    console.log(`   Email:    ${updated.emailNormalized}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${updated.username}`);
    console.log(`   Role:     ${updated.role}`);
    console.log(`==============================================\n`);
  } else {
    const passwordHash = await argon2.hash(password);
    const created = await prisma.user.create({
      data: {
        username,
        emailNormalized: normalizedEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`\n==============================================`);
    console.log(`✅ Admin account created successfully:`);
    console.log(`   Email:    ${created.emailNormalized}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${created.username}`);
    console.log(`   Role:     ${created.role}`);
    console.log(`==============================================\n`);
  }
}

main()
  .catch((err) => {
    console.error("Failed to set up admin user:", err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
