import type { Prisma, User } from "@prisma/client";
import type { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(request: Prisma.UserCreateArgs): Promise<User> {
    try {
      return await this.userRepository.create(request);
    } catch (error: any) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async getUser(request: { userId: string; user: User }): Promise<User | null> {
    try {
      const getUser = await this.userRepository.findUnique({
        where: { id: request.userId },
      });

      if (getUser?.id !== request.user.id) {
        throw new Error("Bad Request");
      }
      return getUser;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
