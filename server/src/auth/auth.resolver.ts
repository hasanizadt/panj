import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput, SigninInput } from './dto/auth.input';
import { AuthPayload } from './dto/auth.output';
import { ForgotPasswordInput, ResetPasswordInput } from './dto/password.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: SignupInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthPayload)
  async signin(@Args('input') input: SigninInput) {
    return this.authService.signin(input);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    // فقط ساختار اولیه: ارسال ایمیل واقعی پیاده‌سازی نشده
    await this.authService.forgotPassword(input.email);
    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args('input') input: ResetPasswordInput) {
    await this.authService.resetPassword(input.token, input.newPassword);
    return true;
  }
}
