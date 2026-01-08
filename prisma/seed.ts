import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/* =======================
   Fix __dirname for ESM
======================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =======================
   Prisma MariaDB Adapter
======================= */
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

/* =======================
   Helpers
======================= */
const DATA_DIR = path.resolve(__dirname, "seedData");

/**
 * Map file name (without .json) to Prisma model
 * ❗ BẮT BUỘC map thủ công để tránh lỗi runtime
 */
const modelMap: Record<string, any> = {
  products: prisma.products,
  users: prisma.users,
  expenses: prisma.expenses,
  sales: prisma.sales,
  purchases: prisma.purchases,
  expenseSummary: prisma.expenseSummary,
  salesSummary: prisma.salesSummary,
  purchaseSummary: prisma.purchaseSummary,
  expenseByCategory: prisma.expenseByCategory,
};

async function deleteAllData(order: string[]) {
  for (const key of order) {
    const model = modelMap[key];
    if (!model) {
      console.warn(`⚠️ Model not found for ${key}, skip delete`);
      continue;
    }

    await model.deleteMany({});
    console.log(`🧹 Cleared ${key}`);
  }
}

async function main() {
  console.log("📂 Seed data directory:", DATA_DIR);

  const orderedFileNames = [
    "products.json",
    "users.json",
    "expenses.json",
    "sales.json",
    "purchases.json",
    "expenseSummary.json",
    "salesSummary.json",
    "purchaseSummary.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(
    orderedFileNames.map((f) => path.basename(f, ".json"))
  );

  for (const fileName of orderedFileNames) {
    const key = path.basename(fileName, ".json");
    const model = modelMap[key];

    if (!model) {
      console.warn(`⚠️ No Prisma model for ${fileName}, skip`);
      continue;
    }

    const filePath = path.join(DATA_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!Array.isArray(jsonData)) {
      console.warn(`⚠️ ${fileName} is not an array, skip`);
      continue;
    }

    await model.createMany({
      data: jsonData,
    });

    console.log(`✅ Seeded ${fileName} (${jsonData.length} records)`);
  }
}

main()
  .catch((err) => {
    console.error("❌ Seed failed");
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
