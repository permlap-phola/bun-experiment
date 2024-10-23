export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Simple validation
  static validate(dto: CreateUserDto): string | null {
    if (!dto.name || typeof dto.name !== "string") {
      return "Invalid name";
    }
    if (!dto.password || typeof dto.password !== "string") {
      return "Invalid password";
    }
    if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) {
      return "Invalid email";
    }
    return null;
  }
}
