import { PrimeClient } from "@/lib/generated/prisma/client";


const globalForPrisma = globalThis as unknown as {
    prisma: PrimeClient
}

const prisma = globalForPrisma.prisma || new PrimeClient();
if (process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}

export default prisma;