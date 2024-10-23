import type { Prisma, User } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Repository = {
  findUnique(request: Prisma.UserFindUniqueArgs): Promise<User | null>;
  findMany(request: Prisma.UserFindManyArgs): Promise<User[]>;
  findFirst(request: Prisma.UserFindFirstArgs): Promise<User | null>;
  create(request: Prisma.UserCreateArgs): Promise<User>;
  update(request: Prisma.UserUpdateArgs): Promise<User>;
  delete(request: Prisma.UserDeleteArgs): Promise<User>;
  count(request: Prisma.UserCountArgs): Promise<number>;
};
export class UserRepository implements Repository {
  constructor(private prisma: PrismaService) {}

  async findUnique(request: Prisma.UserFindUniqueArgs): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findMany(request: Prisma.UserFindManyArgs): Promise<User[]> {
    try {
      return await this.prisma.user.findMany(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirst(request: Prisma.UserFindFirstArgs): Promise<User | null> {
    try {
      return await this.prisma.user.findFirst(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(request: Prisma.UserCreateArgs): Promise<User> {
    try {
      return await this.prisma.user.create(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(request: Prisma.UserUpdateArgs): Promise<User> {
    try {
      return await this.prisma.user.update(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(request: Prisma.UserDeleteArgs): Promise<User> {
    try {
      return await this.prisma.user.delete(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async count(request: Prisma.UserCountArgs): Promise<number> {
    try {
      return await this.prisma.user.count(request);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
