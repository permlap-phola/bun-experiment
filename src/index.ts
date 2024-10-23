import { UserRepository } from "./user/user.repository";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { PrismaService } from "./prisma/prisma.service";
import { UserController } from "./user/user.controller";
import type { User } from "@prisma/client";

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    const prisma = new PrismaService();

    if (url.pathname === "/users" && request.method === "POST") {
      const userController = new UserController(prisma);
      return await userController.create(request);
    }
    if (url.pathname.startsWith("/users/") && request.method === "GET") {
      const userId = url.pathname.split("/")[2];
      if (userId) {
        const userRepository = new UserRepository(prisma);
        const authService = new AuthService(userRepository);
        const userController = new UserController(prisma);

        const user = await authService.verifyJwtToken(request);
        if (!user) {
          return new Response("Unauthorized", { status: 401 });
        }
        return await userController.getUser(request, user as User);
      }
    }

    if (url.pathname === "/auth/sign-in" && request.method === "POST") {
      const authController = new AuthController(prisma);
      return await authController.signIn(request);
    }
    return new Response("Not found", { status: 404 });
  },
  error(error) {
    const errorResponse = {
      message: error.message,
      code: error.code,
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});

console.log(`Listening on localhost:${server.port}`);
