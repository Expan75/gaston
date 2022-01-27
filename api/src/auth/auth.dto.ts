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
  token: string
};