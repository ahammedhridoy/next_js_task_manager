import { PrismaClient } from "@prisma/client";

let prisma: any;
// @ts-ignore
if (typeof global.prisma === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma as PrismaClient;
  }
} else {
  // @ts-ignore
  prisma = global.prisma as PrismaClient;
}

export default prisma;
