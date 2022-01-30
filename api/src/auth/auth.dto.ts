import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field()
  email: string;
  
  @Field()
  password: string;
};

@ObjectType()
export class AuthResult {
  @Field()
  access_token: string
};

@InputType()
export class RefreshTokenInput {
  @Field()
  access_token: string;
};