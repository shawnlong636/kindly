import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
// This prevents creating a new client instance each time during development.
let prisma: PrismaClient;

declare global {
	// This prevents TypeScript from complaining about the global `prisma` variable.

	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
	prisma = new PrismaClient();

	if (process.env.NODE_ENV !== 'production') {
		// During development, store the Prisma client instance in the global scope.
		// This helps to avoid creating multiple PrismaClient instances during hot reloads.
		global.prisma = prisma;
	}
} else {
	// Reuse the existing client during hot reloads in development.
	prisma = global.prisma;
}

export { prisma };
