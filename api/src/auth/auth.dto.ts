import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;
  
  @Field()
  password: string;
};

@ObjectType()
export class LoginResult {
  @Field()
  access_token: string
};

@InputType()
export class RefreshTokenInput {
  @Field()
  access_token: string;
};

@ObjectType()
export class RefreshTokenResult {
  @Field()
  access_token: string
};
