import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const datasourceUrl = process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error(
    "DATABASE_URL is not defined. Please set it in your environment."
  );
}

const isLocalDatabase =
  datasourceUrl.includes("localhost") || datasourceUrl.includes("127.0.0.1");

const pool = new Pool({
  connectionString: datasourceUrl,
  // Render and most managed Postgres providers require SSL, while local
  // development does not.
  ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
