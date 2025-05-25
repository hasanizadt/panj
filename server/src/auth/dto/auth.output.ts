import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../../generated/prisma';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}
