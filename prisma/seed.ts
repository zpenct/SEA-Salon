import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "thomas.n@compfest.id",
      full_name: "Thomas N",
      phone_number: "08123456789",
      role: "ADMIN",
      password,
    },
  });

  const mainBranch = await prisma.branch.upsert({
    where: { name: "SEA Salon Indah" },
    update: {},
    create: {
      location: "Jln. Samaria No.12,  Kota Palu, Sulawesi tengah",
      open_time: "09:00",
      close_time: "21:00",
      name: "SEA Salon Indah",
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
