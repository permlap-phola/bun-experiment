export class GetUserDto {
  readonly userId: string;

  constructor({ userId }: { userId: string }) {
    this.userId = userId;
  }

  // Simple validation
  static validate(dto: GetUserDto): string | null {
    if (!dto.userId || typeof dto.userId !== "string") {
      return "Invalid userId";
    }
    return null;
  }
}
