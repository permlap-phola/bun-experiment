import type { User } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import { formDataToJson } from "../utils/formDataToJson";
import { CreateUserDto, GetUserDto } from "./dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

export class UserController {
  userService: UserService;
  userRepository: UserRepository;

  constructor(private prisma: PrismaService) {
    this.userRepository = new UserRepository(this.prisma);

    this.userService = new UserService(this.userRepository);
  }

  async getUser(req: Request, user: User) {
    const url = new URL(req.url);
    const userId = url.pathname.split("/")[2];
    const dto = new GetUserDto({
      userId,
    });
    try {
      const validationError = GetUserDto.validate(dto);

      if (validationError) {
        return new Response(
          JSON.stringify({ error: validationError, status: 400 }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const getUser = await this.userService.getUser({ userId, user });
      if (!getUser) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(getUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async create(req: Request) {
    const data = await req.formData();
    const body = await formDataToJson(data);
    const dto = new CreateUserDto({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    const validationError = CreateUserDto.validate(dto);

    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError, status: 400 }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    try {
      const user = await this.userService.create({
        data: {
          ...dto,
        },
      });
      return new Response(JSON.stringify(user), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}
