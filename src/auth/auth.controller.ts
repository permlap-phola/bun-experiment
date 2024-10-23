import { UserRepository } from "./../user/user.repository";
import { AuthService } from "./auth.service";
import type { PrismaService } from "../prisma/prisma.service";
import { formDataToJson } from "../utils/formDataToJson";
import { SignInDto } from "./dto";

export class AuthController {
  authService: AuthService;
  userRepository: UserRepository;
  constructor(private prisma: PrismaService) {
    this.userRepository = new UserRepository(this.prisma);
    this.authService = new AuthService(this.userRepository);
  }

  async signIn(req: Request) {
    const data = await req.formData();
    const body = await formDataToJson(data);
    const dto = new SignInDto({
      email: body.email,
      password: body.password,
    });

    try {
      const validationError = SignInDto.validate(dto);

      if (validationError) {
        return new Response(
          JSON.stringify({ error: validationError, status: 400 }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const user = await this.authService.login(dto);

      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}
