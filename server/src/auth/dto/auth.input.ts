import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../../generated/prisma';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => Role, { nullable: true })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

@InputType()
export class SigninInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
