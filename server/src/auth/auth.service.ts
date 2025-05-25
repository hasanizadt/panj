import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupInput, SigninInput } from './dto/auth.input';
import { AuthPayload } from './dto/auth.output';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(input: SignupInput): Promise<AuthPayload> {
    const userExists = await this.userService.findByEmail(input.email);
    if (userExists) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(input.password, 10);
    const user = await this.userService.createUser(input.email, hashed, input.role || Role.USER);
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { accessToken, email: user.email, role: user.role };
  }

  async signin(input: SigninInput): Promise<AuthPayload> {
    const user = await this.userService.findByEmail(input.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { accessToken, email: user.email, role: user.role };
  }

  // ساختار اولیه بازیابی رمز عبور
  async forgotPassword(email: string): Promise<void> {
    // اینجا باید توکن تولید و ایمیل ارسال شود (در این نسخه فقط لاگ می‌شود)
    const user = await this.userService.findByEmail(email);
    if (!user) return;
    const token = this.jwtService.sign({ sub: user.id, email: user.email }, { expiresIn: '15m' });
    // TODO: ارسال ایمیل واقعی
    console.log(`Reset password token for ${email}: ${token}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(token);
      const hashed = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(payload.email, hashed);
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
