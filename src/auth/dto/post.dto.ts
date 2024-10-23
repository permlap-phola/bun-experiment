export class SignInDto {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  // Simple validation
  static validate(dto: SignInDto): string | null {
    if (!dto.password || typeof dto.password !== "string") {
      return "Invalid password";
    }
    if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) {
      return "Invalid email";
    }
    return null;
  }
}
