import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '../../generated/prisma';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async createUser(email: string, password: string, role: Role = Role.USER) {
    return this.prisma.user.create({
      data: { email, password, role },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updatePassword(email: string, newPassword: string) {
    return this.prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });
  }
}
