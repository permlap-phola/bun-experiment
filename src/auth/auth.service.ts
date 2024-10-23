import type { User } from "@prisma/client";
import type { UserRepository } from "../user/user.repository";
import type { SignInDto } from "./dto";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  private secretKey = process.env.JWT_SECRET as string;

  async login(dto: SignInDto): Promise<{ user: User; accessToken: string }> {
    try {
      const user = await this.userRepository.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return {
        user,
        accessToken: this.generateJwtToken({
          email: user.email,
          userId: user.id,
        }),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  generateJwtToken({ userId, email }: { userId: string; email: string }) {
    const payload = { id: userId, email };
    const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
    return token;
  }

  async verifyJwtToken(req: Request): Promise<
    | {
        id: string;
        email: string;
      }
    | any
  > {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded as { id: string; email: string }; // This will be the payload (e.g., { id: userId })
    } catch (error) {
      throw new Error("Unauthorized");
    }
  }
}
