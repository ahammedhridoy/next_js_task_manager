import { PrismaClient } from "@prisma/client";

let prisma;

if (typeof global.prisma === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma as PrismaClient; // Type assertion
  }
} else {
  prisma = global.prisma as PrismaClient; // Type assertion
}

export default prisma;
