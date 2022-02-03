import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  refreshToken: string;
}

@ObjectType()
export class RefreshTokenResult {
  @Field()
  accessToken: string;
}

@InputType()
export class LogoutInput {
  @Field()
  message: string;
}

@ObjectType()
export class LogoutResult {
  @Field()
  message: string;
}