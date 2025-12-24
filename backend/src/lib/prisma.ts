import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
    url: Bun.env.TURSO_DATABASE_URL!,
    authToken: Bun.env.TURSO_AUTH_TOKEN!
})
export const prisma = new PrismaClient({ adapter })